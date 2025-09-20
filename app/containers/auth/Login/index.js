import React, { useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CustomButton from '@/components/CustomButton';
import { countryList } from '@/utils/constant';
import { Link, useNavigate } from 'react-router-dom';
import { Loading, TopBar } from '@/components';
import { postReq, setAuthCookie } from '@/utils/apiHandlers';
import { getLoginValidation } from '@/utils/validation';
// import { reactIcons } from '@/utils/icon';
import { useDispatch } from 'react-redux';
import { increment } from '@/redux/slice/countSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useDemoLogin from '@/hooks/useDemoLogin';
import toast from 'react-hot-toast';
import LocalContext from '../../../contexts/LocaleContext';
import { useTranslation } from 'react-i18next';
import { getUser } from '@/redux/slice/userSlice';
import GoogleOAuth from '@/containers/GoogleOAuth';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { LOCALE } = useContext(LocalContext);
  const savedPhoneNumber = Cookies.get('userPhoneNumber') || '';
  const savedPassword = Cookies.get('userPassword') || '';
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { handleDemoLogin, loading } = useDemoLogin();

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      const payload = {
        identifire: values.dialCode + values.identifire,
        password: values.password,
      };
      toast.dismiss();
      const response = await postReq('/auth/login', payload);
      if (response?.status) {
        setAuthCookie();
        toast.success('Login Successful');
        setTimeout(() => {
          // fetchUserData();
          dispatch(getUser());
        }, 2000);
        dispatch(increment());

        // const cookieOptions = { expires: 1 };
        if (values.rememberMe) {
          Cookies.set('userPhoneNumber', values.identifire);
          Cookies.set('userPassword', values.password);
        }

        Cookies.set('__user__authToken', response?.data.accessToken, {
          expires: 1,
        });

        navigate(LOCALE + '/');
      } else {
        if (response?.error) {
          if (typeof response.error === 'object') {
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
      toast.dismiss();
      toast.error(error?.error || 'Unauthorized');
    } finally {
      setIsLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }

  // const handleGoogle = async () => {
  //   const API = process.env.API_URL;
  //   window.location.href = `${API}/auth/google`;
  // };

  const handlePhoneChange = (e, setFieldValue) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 20);
    setFieldValue('identifire', value);
  };
  const handlePasswordChange = (e, setFieldValue) => {
    let value = e.target.value.replace(/\s/g, '').slice(0, 20);
    setFieldValue('password', value);
  };

  return (
    <>
      <div className="px-[2rem]  ">
        <TopBar />
        <div className="my-8">
          <h1 className="text-24 font-poppins font-bold leading-9">
            {t('WELCOME_TO_IGAMING')}
          </h1>
          <p className="font-poppins text-14 mt-1 font-normal leading-6">
            {t('YOUR_GAMING_JOURNEY_STARTS_HERE')}
          </p>
        </div>

        <Formik
          initialValues={{
            identifire: savedPhoneNumber,
            password: savedPassword,
            dialCode: countryList[0]?.dial_code || '',
            country: countryList[0]?.name || '',
            rememberMe: false,
          }}
          onSubmit={handleSubmit}
          validationSchema={getLoginValidation(t)}
        >
          {({ errors, values, setFieldValue, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="font-poppins text-16 leading-6 font-medium">
                  {t('PHONE_NUMBER')}
                </label>
                <div className="flex w-full rounded-md overflow-hidden mt-2">
                  <div className="flex items-center bg-white w-[20%] py-2 text-black relative">
                    <Field
                      as="select"
                      name="dialCode"
                      autoComplete="username"
                      value={values.dialCode}
                      className="w-full h-full cursor-pointer bg-transparent border-white outline-none"
                      onChange={(e) => {
                        const selectedDialCode = e.target.value;
                        const selectedCountry = countryList.find(
                          (item) => item.dial_code === selectedDialCode,
                        );
                        setFieldValue('dialCode', selectedDialCode);
                        setFieldValue(
                          'country',
                          selectedCountry ? selectedCountry.name : '',
                        );
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
                    type="text"
                    name="identifire"
                    value={values.identifire}
                    onChange={(e) => handlePhoneChange(e, setFieldValue)}
                    placeholder={t('ENTER_YOUR_PHONE_NUMBER')}
                    maxLength="20"
                    className="w-[80%] px-4 py-2 text-gray-700 bg-white outline-none border-white"
                    error={errors.identifire}
                  />
                </div>
                <ErrorMessage
                  name="identifire"
                  component="div"
                  className="text-12 text-red-700"
                />
              </div>

              <div className="mb-4">
                <label className="font-poppins text-16 leading-6 font-medium">
                  {t('PASSWORD')}
                </label>
                <div className="relative mt-2">
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    placeholder={t('ENTER_YOUR_PASSWORD')}
                    className="w-full px-4 py-2 text-gray-700 bg-white rounded-md outline-none border border-gray-300"
                    onChange={(e) => handlePasswordChange(e, setFieldValue)}
                    value={values.password}
                    maxLength="20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? (
                      <FaEye className="text-gray-500" size={20} />
                    ) : (
                      <FaEyeSlash className="text-gray-500" size={20} />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-12 text-red-700"
                />
              </div>
              <div className="flex mt-5 justify-between">
                <div className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    className="bg-transparent w-6 h-6"
                    id="rememberMe"
                    checked={values.rememberMe}
                  />
                  <label
                    htmlFor="rememberMe"
                    className="font-poppins text-14 leading-[21px] font-normal cursor-pointer"
                  >
                    {t('REMEMBER_ME')}
                  </label>
                </div>
                <p className="font-poppins text-14 leading-[21px] font-normal">
                  <Link to={`${LOCALE}/reset-password`}>
                    {t('FORGOT_PASSWORD')}?
                  </Link>
                </p>
              </div>
              <ErrorMessage
                name="rememberMe"
                component="div"
                className="text-12 text-red-700"
              />

              {errors.general && (
                <div className="text-12 text-red-700">{errors.general}</div>
              )}

              <div className="my-7">
                <CustomButton
                  type="submit"
                  label={isLoading ? 'Logging in...' : t('LOG_IN')}
                  classname="text-16 font-poppins leading-4 rounded-full font-semibold h-11"
                  disabled={isLoading}
                />
              </div>
            </Form>
          )}
        </Formik>

        <div>
          <div className="flex justify-between items-center">
            <span className="w-[25%] h-0.5 bg-custom-gradient"></span>
            <p className="font-poppins font-normal text-16 leading-6">
              {t('OR_CONTINUE_WITH')}
            </p>
            <span className="w-[25%] h-0.5 bg-custom-gradient"></span>
          </div>
          {/* <div className="flex items-center gap-2 my-4"> */}
          <div className="my-2">
            {/* <button
              className="text-black bg-white flex rounded-md items-center p-2 w-full justify-center gap-1"
              onClick={handleGoogle}
              type="button"
            >
              {reactIcons.googal}
              <span className="font-poppins font-normal text-12 leading-5">
                Google
              </span>
            </button> */}
            <GoogleOAuth />
            {/* <button className="text-black bg-white flex rounded-md items-center p-2 w-full justify-center gap-1">
              {reactIcons.telegram}
              <span className="font-poppins font-normal text-12 leading-5">
                Telegram
              </span>
            </button> */}
            {/* <TelegramLogin /> */}
            {/* <button className="text-black bg-white flex rounded-md items-center p-2 w-full justify-center gap-1">
              {reactIcons.facebook}
              <span className="font-poppins font-normal text-12 leading-5">
                Facebook
              </span>
            </button> */}
          </div>
          <div className="flex justify-between items-center">
            <h2
              className={`font-poppins font-normal text-14 leading-6 underline cursor-pointer ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={!isLoading ? handleDemoLogin : null}
            >
              {t('TRY_DEMO_ACCOUNT')}
            </h2>
            <h2
              onClick={() => navigate(`${LOCALE}/signup`)}
              className="font-poppins font-normal text-14 leading-6 underline cursor-pointer"
            >
              {t('CREATE_AN_ACCOUNT')}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
