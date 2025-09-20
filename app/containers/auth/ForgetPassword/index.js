import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { countryList } from '@/utils/constant';
import { Link, useNavigate } from 'react-router-dom';
import { TopBar } from '@/components';
import { postAuthReq } from '@/utils/apiHandlers';
import toast from 'react-hot-toast';
import { getForgetValidation } from '@/utils/validation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import LocalContext from '../../../contexts/LocaleContext';
const ForgetPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { LOCALE } = useContext(LocalContext);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addPassword, setAddPassword] = useState(false);
  const [cshowPassword, csetShowPassword] = useState(false);
  const [errorNumber, setErrorNumber] = useState('');
  const [otpError, setOtpError] = useState('');
  const [timer, setTimer] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
  const [buttonText, setButtonText] = useState(t('SEND_OTP'));
  const [buttonText1, setButtonText1] = useState(false);
  useEffect(() => {
    let interval;

    if (isCounting && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setIsCounting(false);
      setButtonText1(true);
      setShowOTPInput(false);
      showOTPInput(false);
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCounting, timer]);

  const formatTime = (seconds) => {
    const minutes = Math?.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes)?.padStart(2, '0')}:${String(secs)?.padStart(
      2,
      '0',
    )}`;
  };
  const togglePasswordVisibility = () => {
    setAddPassword(!addPassword);
  };
  const ctogglePasswordVisibility = () => {
    csetShowPassword(!cshowPassword);
  };
  const formatPhoneNumber = (dialCode, mobile) => {
    const cleanDialCode = dialCode.startsWith('+') ? dialCode : `+${dialCode}`;
    return `${cleanDialCode}${mobile}`;
  };

  // Step 1: Send OTP

  const [phoneInputDisabled, setPhoneInputDisabled] = useState(false);

  const handleSendOTP = async (values, setFieldValue) => {
    if (buttonText === t('CHANGE')) {
      setPhoneInputDisabled(false);
      setShowOTPInput(false);
      setButtonText(t('SEND_OTP'));
      setFieldValue('otp', '');
      setFieldValue('password', '');
      setFieldValue('confirmPassword', '');
      setOtpError('');
      setShowPassword(false);
      return;
    }

    try {
      if (!values.mobile) {
        setErrorNumber(t('ENTER_PHONE_NUMBER1'));
        return;
      }
      //  else if (!/^\d{6,20}$/.test(values.mobile)) {
      //   setErrorNumber(t('MOBILE_NUMBER_LENGTH'));
      //   return;
      // }

      setIsLoading(true);

      const payload = {
        mobile: formatPhoneNumber(values.dialCode, values.mobile),
        type: 'forgot',
        country: values.country.toLowerCase(),
      };

      const response = await postAuthReq('/auth/forgot-password', payload);
      if (response?.status) {
        setShowOTPInput(true);
        toast.success('OTP sent successfully');
        setTimer(120);
        setIsCounting(true);
        setPhoneInputDisabled(true);
        setButtonText(t('CHANGE'));
      } else {
        toast.error(response?.error?.message || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error(error?.message || 'Error sending OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    if (!values?.password || !values?.confirmPassword) {
      toast.error('Please enter your new password');
      return;
    }

    if (!values?.otp) {
      toast.error('Please enter OTP');
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        mobile: formatPhoneNumber(values?.dialCode, values?.mobile),
        code: values?.otp?.toString(),
        newPassword: values?.password,
      };

      const response = await postAuthReq('/auth/reset-password', payload);

      if (response?.status) {
        toast?.success('Password reset successful');
        navigate('/login');
      } else {
        if (response?.error) {
          if (response?.error?.status === 500) {
            toast.error(response?.error?.message);
          } else if (typeof response?.error === 'object') {
            Object?.values(response?.error)
              ?.filter((msg) => isNaN(msg) && !/unauthorized|failed/i.test(msg))
              ?.forEach((error) => {
                toast?.error(error);
              });
          } else {
            toast?.error(response?.error);
          }
        } else {
          toast?.error('Password reset failed. Please try again.');
        }
      }
    } catch (error) {
      toast?.error(error?.message || 'Error resetting password');
    } finally {
      setIsLoading(false);
    }
  };
  const handlePasswordChange = (e, setFieldValue, fieldName) => {
    let value = e?.target?.value.replace(/\s/g, '')?.slice(0, 20);
    setFieldValue(fieldName, value);
  };

  return (
    <div className="px-4">
      <TopBar />
      <div className="my-8">
        <h1 className="text-24 font-poppins font-bold leading-10">
          {t('FORGOT_PASSWORD')}
        </h1>
        <p className="font-poppins text-14 mt-1 font-normal leading-6">
          {t('ENTER_PHONE_NUMBER')}
        </p>
      </div>

      <Formik
        initialValues={{
          dialCode: countryList[0]?.dial_code || '+91',
          country: countryList[0]?.name || 'India',
          mobile: '',
          code: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={getForgetValidation(t)}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="">
              <label className="font-poppins text-14 leading-6 font-medium">
                {t('PHONE_NUMBER')}
              </label>
              <div className="flex w-full rounded-md overflow-hidden mt-1 border border-gray-300">
                <div className="flex items-center bg-white w-[15%]  text-black relative">
                  <Field
                    as="select"
                    name="dialCode"
                    value={values?.dialCode}
                    className="w-full h-full cursor-pointer bg-transparent border-none"
                    onChange={(e) => {
                      const selectedDialCode = e?.target?.value;
                      const selectedCountry = countryList?.find(
                        (item) => item?.dial_code === selectedDialCode,
                      );
                      setFieldValue('dialCode', selectedDialCode);
                      setFieldValue(
                        'country',
                        selectedCountry ? selectedCountry?.name : '',
                      );
                    }}
                  >
                    {countryList.map((item, index) => (
                      <option key={index} value={item?.dial_code}>
                        {item?.dial_code}
                      </option>
                    ))}
                  </Field>
                </div>
                <Field
                  type="text"
                  name="mobile"
                  placeholder={t('ENTER_YOUR_PHONE_NUMBER')}
                  className="flex-1 w-[60%] px-2 py-2 text-gray-700 placeholder-gray-400 appearance-none outline-none bg-white"
                  onChange={(e) => {
                    let inputValue = e?.target?.value;
                    inputValue = inputValue?.replace(/\D/g, '')?.slice(0, 20);
                    setFieldValue('mobile', inputValue);
                    setErrorNumber(
                      inputValue?.length == 0 ? t('ENTER_PHONE_NUMBER1') : '',
                    );
                  }}
                  disabled={phoneInputDisabled}
                />

                <button
                  onClick={() => handleSendOTP(values, setFieldValue)}
                  type="button"
                  className="bg-custom-gradient w-[25%] text-black"
                >
                  {isLoading ? 'Sending...' : buttonText}
                </button>
              </div>
              <div className="text-12 text-red-700">{errorNumber}</div>

              {showOTPInput && (
                <p className="pt-[23px] font-poppins text-12 bg-custom-text bg-clip-text text-transparent appearance-none leading-6 font-normal flex justify-end cursor-pointer">
                  <span className=" p-[2px]">
                    {' '}
                    {t('GET_NEW_CODE')} {formatTime(timer)}
                  </span>
                </p>
              )}
              {buttonText1 ? (
                <p
                  className="pt-[23px] font-poppins text-12 bg-custom-text bg-clip-text text-transparent appearance-none leading-6 font-normal flex justify-end cursor-pointer"
                  onClick={() => handleSendOTP(values)}
                >
                  Resend OTP{' '}
                </p>
              ) : (
                ''
              )}
            </div>

            {showOTPInput && (
              <div className="flex w-full rounded-md overflow-hidden ">
                <Field
                  type="text"
                  name="otp"
                  placeholder={t('ENTER_OTP')}
                  className="flex-1 px-4 py-2 text-gray-700 placeholder-gray-400 border-none outline-none bg-white"
                  maxLength={6}
                  onChange={(e) => {
                    const inputValue = e?.target?.value;

                    if (!/^\d*$/.test(inputValue)) return;

                    setFieldValue('otp', inputValue);

                    if (!/^\d{6}$/.test(inputValue)) {
                      setOtpError(t('OTP_LENGTH'));
                    } else {
                      setOtpError('');
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={() => {
                    if (!values?.otp || !/^\d{6}$/.test(values?.otp)) {
                      setOtpError(t('OTP_LENGTH'));
                      return;
                    }

                    setOtpError('');
                    setShowPassword(true);
                  }}
                  className="bg-[#01A337]  w-[25%] text-white text-14 px-4"
                >
                  {t('VERIFY')}
                </button>

                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-12 text-red-700"
                />
              </div>
            )}
            {otpError && <div className="text-12 text-red-700">{otpError}</div>}
            {showPassword && (
              <>
                <div className="relative">
                  <CustomInput
                    label={t('ENTER_NEW_PASSWORD')}
                    type={addPassword ? 'text' : 'password'}
                    onChange={(e) =>
                      handlePasswordChange(e, setFieldValue, 'password')
                    }
                    placeHolder={t('ENTER_NEW_PASSWORD')}
                    classname="rounded-md text-black pr-10"
                    name="password"
                    value={values.password}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-[2.7rem] text-gray-600"
                    onClick={togglePasswordVisibility}
                  >
                    {addPassword ? (
                      <FaEye size={20} />
                    ) : (
                      <FaEyeSlash size={20} />
                    )}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-12 text-red-700"
                  />
                </div>
                <div className="relative">
                  <CustomInput
                    label={t('CONFIRM_PASSWORD1')}
                    type={cshowPassword ? 'text' : 'password'}
                    onChange={(e) =>
                      handlePasswordChange(e, setFieldValue, 'confirmPassword')
                    }
                    placeHolder={t('ENTER_CONFIRM_PASSWORD')}
                    classname="rounded-md text-black pr-10"
                    name="confirmPassword"
                    value={values?.confirmPassword}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-[2.7rem] text-gray-600"
                    onClick={ctogglePasswordVisibility}
                  >
                    {cshowPassword ? (
                      <FaEye size={20} />
                    ) : (
                      <FaEyeSlash size={20} />
                    )}
                  </button>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-12 text-red-700"
                  />
                </div>
              </>
            )}

            {showPassword && (
              <div className="mt-6">
                <CustomButton
                  type="submit"
                  label={t('RESET_PASSWORD')}
                  classname="h-11"
                  disabled={isLoading}
                />
              </div>
            )}
          </Form>
        )}
      </Formik>

      <div className="justify-items-center my-6">
        <p className="font-poppins font-normal underline leading-6 text-16">
          {t('REMEMBER_PASSWORD')}{' '}
          <Link to={`${LOCALE}/login`} className="text-yellow-300 px-1">
            {t('LOG_IN')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
