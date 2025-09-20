import { TopBar } from '@/components';
import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { postAuthReq } from '@/utils/apiHandlers';
import { getChangePasswordValidation } from '@/utils/validation';
import { Formik, Form } from 'formik';
// import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LocalContext from '../../../contexts/LocaleContext';
import { useTranslation } from 'react-i18next';
const ChangePassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { LOCALE } = useContext(LocalContext);
  const [isSubmitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const payload = {
        oldPassword: values?.oldPassword,
        newPassword: values?.newPassword,
      };

      const response = await postAuthReq('/users/me/change-password', payload);
      toast.dismiss();
      if (response?.status && response?.data) {
        // toast.success('Password changed successfully!');
        navigate(LOCALE + '/profile');
      } else {
        if (response?.error) {
          if (typeof response?.error === 'object') {
            Object.values(response?.error)
              .filter(
                (msg) => isNaN(msg) && !/unauthorized|error|failed/i.test(msg),
              )
              .forEach((error) => toast?.error(error));
          } else {
            toast.error(response?.error);
          }
        } else {
          toast.error('Password change failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error(error?.message || 'An unexpected error occurred.');
    } finally {
      setTimeout(() => {
        setSubmitting(false);
      }, 2000);
    }
  };
  const handlePasswordChange = (e, setFieldValue, fieldName) => {
    let value = e?.target?.value.replace(/\s/g, '').slice(0, 20);
    setFieldValue(fieldName, value);
  };

  return (
    <div className="px-4">
      <TopBar heading={t('CHANGE_PASSWORD')} />
      <section className="mt-8">
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={getChangePasswordValidation(t)}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, handleBlur, values, errors, touched }) => (
            <Form>
              {['oldPassword', 'newPassword', 'confirmPassword'].map(
                (field) => (
                  <div key={field} className="relative mb-4">
                    <CustomInput
                      label={
                        field === 'oldPassword'
                          ? t('LOGIN_PASSWORD')
                          : field === 'newPassword'
                          ? t('NEW_PASSWORD')
                          : t('CONFIRM_PASSWORD')
                      }
                      placeHolder={
                        field === 'oldPassword'
                          ? t('LOGIN_PASSWORD')
                          : field === 'newPassword'
                          ? t('NEW_PASSWORD')
                          : t('CONFIRM_PASSWORD')
                      }
                      type={showPassword[field] ? 'text' : 'password'}
                      classname="rounded-lg"
                      name={field}
                      value={values[field]}
                      onChange={(e) =>
                        handlePasswordChange(e, setFieldValue, field)
                      }
                      onBlur={handleBlur}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-10 text-gray-500"
                      onClick={() => togglePasswordVisibility(field)}
                    >
                      {showPassword[field] ? (
                        <FaEye size={20} />
                      ) : (
                        <FaEyeSlash size={20} />
                      )}
                    </button>
                    {errors[field] && touched[field] && (
                      <div className="text-red-500 text-sm">
                        {errors[field]}
                      </div>
                    )}
                  </div>
                ),
              )}

              <CustomButton
                label={isSubmitting ? t('SAVING') : t('SAVE_CHANGE')}
                classname="mt-4 h-11"
                type="submit"
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
};

export default ChangePassword;
