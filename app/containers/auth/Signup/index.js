import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { countryList } from '@/utils/constant';
import { Link, useNavigate } from 'react-router-dom';
import { TopBar } from '@/components';
import { postAuthReq, postReq, setAuthCookie } from '@/utils/apiHandlers';
import { getRegisterValidation } from '@/utils/validation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { reactIcons } from '@/utils/icon';
import { increment } from '@/redux/slice/countSlice';
import { useDispatch } from 'react-redux';
import LocalContext from '../../../contexts/LocaleContext';
import { useTranslation } from 'react-i18next';
import { getUser } from '@/redux/slice/userSlice';
const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { LOCALE } = useContext(LocalContext);
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const refferalCodeFromURL = urlParams.get('invitationCode') || '';
  const [isPhoneNumberDisabled, setIsPhoneNumberDisabled] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [cshowPassword, csetShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAcc, setLoadingAcc] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    username: '',
    mobile: '',
    identify: '',
  });
  const [timer, setTimer] = useState(119);
  const [isCounting, setIsCounting] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [buttonText, setButtonText] = useState(t('SEND_OTP'));
  const [buttonText1, setButtonText1] = useState(false);

  const handleTooltip = () => {
    setErrorMsg((prev) => ({
      ...prev,
      username: 'Username must be unique and not used before.',
    }));

    setTimeout(() => {
      setErrorMsg((prev) => ({
        ...prev,
        username: '',
      }));
    }, 2000);
  };

  useEffect(() => {
    let interval;

    if (isCounting && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setIsCounting(false);
      setButtonText1(t('RESEND_OTP'));
      setShowTimer(false);
      setButtonText1(true);
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCounting, timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0',
    )}`;
  };

  const validateFields = (name, value) => {
    let errors = { ...errorMsg };

    if (name === 'username') {
      if (!value) {
        errors.username = t('PLEASE_ENTER_USERNAME');
      } else if (!/^[a-z][a-z0-9]*$/.test(value)) {
        errors.username = t('USERNAME_PATTERN');
      } else if (value.length < 3 || value.length > 20) {
        errors.username = t('USERNAME_MIN_LENGTH');
      } else {
        errors.username = '';
      }
    }

    if (name === 'mobile') {
      const cleanMobile = value.replace(/\D/g, '');
      if (!cleanMobile) {
        errors.mobile = t('MOBILE_REQUIRED');
      }
      // else if (cleanMobile.length < 6 || cleanMobile.length > 20) {
      //   errors.mobile = t('INVALID_PHONE_NUMBER');
      // }
      else {
        errors.mobile = '';
      }
    }

    setErrorMsg(errors);
  };
  const handleChangeNumber = (setFieldValue) => {
    setIsPhoneNumberDisabled(false);
    setButtonText1(true);
    setButtonText('Send OTP');
    setShowOTPInput(false);
    setTimer(119);
    setIsCounting(false);
    setShowTimer(false);

    setFieldValue('mobileVerificationCode', '');
    setFieldValue('password', '');
    setFieldValue('confirmPassword', '');
    setFieldValue('refferalCode', '');
  };
  const handleChangeOtp = (e, setFieldValue) => {
    const { name, value } = e.target;
    let cleanValue = value.replace(/\s/g, '');
    if (name === 'mobile') {
      cleanValue = cleanValue.replace(/\D/g, '').slice(0, 20);
    } else if (name === 'username') {
      cleanValue = cleanValue.toLowerCase().replace(/[^a-z0-9]/g, '');
    }
    setFieldValue(name, cleanValue);
    validateFields(name, cleanValue);
  };
  const handleOtp = async (values) => {
    if (values.username === '') {
      setErrorMsg((prev) => ({
        ...prev,
        username: t('PLEASE_ENTER_USERNAME'),
      }));
    } else if (values.mobile === '') {
      setErrorMsg((prev) => ({ ...prev, mobile: t('ENTER_PHONE_NUMBER1') }));
    } else {
      try {
        setIsLoading(true);
        if (errorMsg.username || errorMsg.mobile) return;
        setButtonText1(false);
        const payload = {
          mobile: `${values.dialCode}${values.mobile.replace(/\D/g, '')}`,
          type: 'register',
          country: values.country.toLowerCase(),
        };
        toast.dismiss();

        const response = await postAuthReq('/auth/send-code', payload);
        if (response?.status) {
          setShowOTPInput(true);
          toast.success('OTP sent successfully');
          setTimer(119);
          setIsCounting(true);
          setShowTimer(true);
          setButtonText(t('CHANGE'));
          setIsPhoneNumberDisabled(true);
        } else {
          toast.error(
            response?.error?.message || 'Login failed. Please try again.',
          );
        }
      } catch (error) {
        toast.error(error?.message || 'Error sending OTP');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const ctogglePasswordVisibility = () => {
    csetShowPassword(!cshowPassword);
  };
  const handleSubmit = async (values) => {
    try {
      setLoadingAcc(true);
      const cleanMobile = values.mobile.replace(/\D/g, '');
      const payload = {
        username: values.username,
        password: values.password,
        mobile: `${values.dialCode}${cleanMobile}`,
        refferalCode: values.refferalCode || '',
        mobileVerificationCode: values.mobileVerificationCode?.toString() || '',
        country: values.country,
        dialCode: values.dialCode,
      };
      toast.dismiss();
      const response = await postReq('/auth/register', payload);
      if (response?.status && response?.data?.type === 'user') {
        setAuthCookie();
        Cookies.set('__user__authToken', response?.data.accessToken, {
          expires: 1,
        });
        toast.success('Registration Successful');
        localStorage.setItem('betting_agreed', 'false');
        dispatch(increment());
        setTimeout(() => {
          // fetchUserData();
          dispatch(getUser());
        }, 2000);
        navigate(LOCALE + '/');
      } else {
        if (response?.error) {
          if (response?.error?.statusCode === 422) {
            toast.error(response?.error?.message);
          } else if (typeof response.error === 'object') {
            Object.values(response.error)
              .filter(
                (msg) => isNaN(msg) && !/unauthorized|error|failed/i.test(msg),
              )
              .forEach((error) => {
                toast.error(error);
              });
          } else {
            toast.error(response.error);
          }
        } else {
          toast.error('Login failed. Please try again.');
        }
      }
    } catch (error) {
      toast.error(error?.message || 'Registration failed.');
    } finally {
      setLoadingAcc(false);
    }
  };

  const defaultCountry = countryList[0] || { dial_code: '', name: '' };

  const handlePasswordChange = (e, field, setFieldValue) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/\s/g, '').slice(0, 20);
    setFieldValue(field, inputValue);
  };
  return (
    <div className="px-[2rem] ">
      <TopBar />
      <div className="mt-[20px]">
        <h1 className="text-24 font-poppins font-bold leading-9">
          {t('CREATE_AN_ACCOUNT')}
        </h1>
        <p className="font-poppins text-14 font-normal leading-6">
          {t('JOIN_IGAMING_TODAY')}
        </p>
      </div>

      <Formik
        initialValues={{
          username: '',
          mobile: '',
          mobileVerificationCode: '',
          confirmPassword: '',
          password: '',
          refferalCode: refferalCodeFromURL,
          dialCode: defaultCountry.dial_code,
          country: defaultCountry.name,
          checkbox: false,
        }}
        onSubmit={handleSubmit}
        validationSchema={getRegisterValidation(t)}
      >
        {({ handleChange, values, setFieldValue, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="mb-2 mt-[20px]">
              <div className="relative">
                <CustomInput
                  label={t('USERNAME')}
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={(e) => handleChangeOtp(e, setFieldValue)}
                  placeHolder={t('ENTER_YOUR_USERNAME')}
                  classname="label:mb-2 placeholder:text-14 rounded-md text-black"
                  maxLen={20}
                />
                {/* <Tooltip
                  title="User name must be unique name"
                  arrow
                  placement="bottom"
                  classes={{
                    tooltip:
                      'bg-gray-900 text-red-700 text-sm p-2 rounded-md shadow-lg',
                  }}
                >
                  <button
                    type="button"
                    className="absolute right-2 top-[2.4rem]"
                  >
                    {reactIcons.exclamationMark}
                  </button>
                </Tooltip> */}

                <button
                  type="button"
                  className="absolute right-0 p-4 top-[1.4rem]"
                  onClick={handleTooltip}
                >
                  {reactIcons.exclamationMark}
                </button>
              </div>
              {errorMsg.username && (
                <div className="text-12 text-red-700">{errorMsg.username}</div>
              )}
              {errorMsg.identify && (
                <div className="text-12 text-red-700">{errorMsg.identify}</div>
              )}
            </div>

            <div className="mb-2">
              <label className="font-poppins text-14 leading-6 font-medium">
                {t('PHONE_NUMBER')}
              </label>
              <div className="flex w-full rounded-md overflow-hidden mt-1 border border-gray-300">
                <div className="flex items-center bg-white w-[20%]  text-black relative">
                  <Field
                    as="select"
                    name="dialCode"
                    value={values.dialCode}
                    className="w-full h-full text-14 cursor-pointer bg-transparent border-white outline-none"
                    onChange={(e) => {
                      const selectedDialCode = e.target.value;
                      const selectedCountry = countryList.find(
                        (item) => item.dial_code === selectedDialCode,
                      );
                      if (selectedCountry) {
                        setFieldValue('dialCode', selectedCountry.dial_code);
                        setFieldValue('country', selectedCountry.name);
                      }
                    }}
                  >
                    {countryList.map((item, index) => (
                      <option key={index} value={item.dial_code}>
                        {item.dial_code}
                      </option>
                    ))}
                  </Field>
                </div>
                <Field
                  type="tel"
                  name="mobile"
                  placeholder={t('ENTER_YOUR_PHONE_NUMBER')}
                  disabled={isPhoneNumberDisabled}
                  onChange={(e) => handleChangeOtp(e, setFieldValue)}
                  value={values.mobile}
                  className="w-[65%] px-1 py-[6px] placeholder:text-14 text-gray-700 placeholder-gray-400 outline-none border-white bg-white"
                />
                <button
                  type="button"
                  className="bg-custom-gradient w-[20%] font-bold text-black text-12 text-center  shadow-2xl font-abeezee leading-4 whitespace-nowrap"
                  disabled={isLoading}
                  onClick={
                    isPhoneNumberDisabled
                      ? () => handleChangeNumber(setFieldValue)
                      : () => handleOtp(values)
                  }
                >
                  {isLoading ? t('SENDING') : buttonText}
                </button>
              </div>

              {errorMsg.mobile && (
                <div className="text-12 text-red-700">{errorMsg.mobile}</div>
              )}
              {showTimer && (
                <div className="flex justify-end">
                  {t('GET_NEW_CODE_IN')} {formatTime(timer)}
                </div>
              )}
              {buttonText1 && (
                <div
                  className="flex justify-end"
                  onClick={() => handleOtp(values)}
                >
                  {t('RESEND_OTP')} ?
                </div>
              )}
              {showOTPInput && (
                <>
                  <div className="mt-3">
                    <Field
                      type="text"
                      placeholder={t('ENTER_YOUR_OTP')}
                      label={t('MOBILE_VERIFICATION_CODE')}
                      name="mobileVerificationCode"
                      maxLength="6"
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFieldValue('mobileVerificationCode', value);
                      }}
                      value={values.mobileVerificationCode}
                      className="rounded-md placeholder:text-14 text-black w-full border border-gray-300 px-4 py-1"
                    />
                    {/* value={values.mobileVerificationCode}
                    className="rounded-md placeholder:text-14 text-black w-full
                    border border-gray-300 px-4 py-1" /> */}
                    <ErrorMessage
                      name="mobileVerificationCode"
                      component="div"
                      className="text-12 text-red-700"
                    />
                  </div>
                </>
              )}
            </div>

            <div>
              <div className="relative">
                <CustomInput
                  label={t('PASSWORD')}
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) =>
                    handlePasswordChange(e, 'password', setFieldValue)
                  }
                  placeHolder={t('ENTER_YOUR_PASSWORD')}
                  classname="rounded-md placeholder:text-14 text-black pr-10 bg-white"
                  name="password"
                  value={values.password}
                  disabled={!values.mobileVerificationCode}
                  maxLen={20}
                />
                <button
                  type="button"
                  className="absolute right-2 top-[2.2rem] text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-12 text-red-700"
              />

              <div className="relative">
                <CustomInput
                  label={t('CONFIRM_PASSWORD1')}
                  type={cshowPassword ? 'text' : 'password'}
                  onChange={(e) =>
                    handlePasswordChange(e, 'confirmPassword', setFieldValue)
                  }
                  placeHolder={t('ENTER_CONFIRM_PASSWORD')}
                  classname="rounded-md placeholder:text-14 text-black pr-10 bg-white"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  disabled={!values.mobileVerificationCode}
                  maxLen={20}
                />

                <button
                  type="button"
                  className="absolute right-2 top-[2.2rem] text-gray-600"
                  onClick={ctogglePasswordVisibility}
                >
                  {cshowPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-12 text-red-700"
              />

              <CustomInput
                label={t('REFERRAL_CODE_OPTIONAL')}
                type="text"
                name="refferalCode"
                value={values.refferalCode}
                onChange={handleChange}
                placeHolder={t('ENTER_YOUR_REFERRAL_CODE')}
                classname="rounded-md placeholder:text-14 text-black bg-white"
                disabled={!values.mobileVerificationCode}
              />
            </div>

            <div className="flex items-center gap-3 mt-2">
              <Field
                type="checkbox"
                name="checkbox"
                className="w-6 h-6  bg-white"
                disabled={!values.mobileVerificationCode}
              />
              <p className="font-poppins leading-5 text-10">
                {t('I_AGREE_TO_THE')}
                <span className="font-medium text-yellow-300 px-1">
                  {t('TERMS_OF_SERVICE')}
                </span>
                {t('AND')}
                <span className="font-medium text-yellow-400 px-1">
                  {t('PRIVACY_POLICY')}
                </span>
              </p>
            </div>
            <ErrorMessage
              name="checkbox"
              component="div"
              className="text-12 text-red-700 mt-1"
            />

            <div className="my-4">
              <CustomButton
                type="submit"
                label={loadingAcc ? t('CREATING_ACCOUNT') : t('CREATE_ACCOUNT')}
                classname="text-16 font-poppins leading-4 rounded-full font-semibold py-3"
                disabled={loadingAcc || !values.mobileVerificationCode}
              />
            </div>
          </Form>
        )}
      </Formik>

      <div className="justify-items-center my-2 mb-[50px]">
        <p className="font-poppins font-normal leading-6 text-16">
          {t('ALREADY_HAVE_ACCOUNT')}
          <Link to={`${LOCALE}/login`} className="text-yellow-300 px-1">
            {t('LOG_IN')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
