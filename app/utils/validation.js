import * as yup from 'yup';

export const getLoginValidation = (t) => {
  return yup.object().shape({
    identifire: yup
      .string()
      // .matches(/^\d+$/, t('ONLY_NUMBERS_ALLOWED'))
      // .min(6, t('NUMBER_MIN_LENGTH'))
      // .max(20, t('NUMBER_MAX_LENGTH'))
      .required(t('ENTER_PHONE_NUMBER1')),

    password: yup.string().required(t('ENTER_PASSWORD')),
    // .test(
    //   'strong-password',
    //   t('PASSWORD_REQUIREMENTS'),
    //   (value) =>
    //     value &&
    //     value.length >= 8 &&
    //     value.length <= 15 &&
    //     /[A-Z]/.test(value) &&
    //     /[a-z]/.test(value) &&
    //     /\d/.test(value) &&
    //     /[@$!%*?&]/.test(value),
    // ),

    // rememberMe: yup
    //   .boolean()
    //   .oneOf([true], t('ACCEPT_TERMS1'))
    //   .required(t('ACCEPT_TERMS1')),
  });
};

export const getRegisterValidation = (t) => {
  return yup.object().shape({
    username: yup
      .string()
      .required(t('USERNAME_REQUIRED'))
      .min(3, t('USERNAME_MIN_LENGTH'))
      .max(20, t('USERNAME_MAX_LENGTH'))
      .matches(/^[a-z][a-z0-9]*$/, t('USERNAME_PATTERN')),

    password: yup
      .string()
      .required(t('ENTER_PASSWORD'))
      .test(
        'strong-password',
        t('PASSWORD_REQUIREMENTS'),
        (value) =>
          value &&
          value.length >= 8 &&
          value.length <= 15 &&
          /[A-Z]/.test(value) &&
          /[a-z]/.test(value) &&
          /\d/.test(value) &&
          /[@$!%*?&]/.test(value),
      ),

    mobile: yup
      .string()
      .matches(/^\d+$/, t('ONLY_NUMBERS_ALLOWED'))
      .min(6, t('NUMBER_MIN_LENGTH'))
      .max(20, t('NUMBER_MAX_LENGTH'))
      .required(t('MOBILE_REQUIRED')),

    country: yup.string().required(t('COUNTRY_REQUIRED')),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('PASSWORDS_MUST_MATCH'))
      .required(t('CONFIRM_PASSWORD_REQUIRED')),

    mobileVerificationCode: yup
      .string()
      .required(t('OTP_REQUIRED'))
      .matches(/^\d{6}$/, t('VERIFICATION_CODE_INVALID')),

    checkbox: yup
      .boolean()
      .oneOf([true], t('ACCEPT_TERMS'))
      .required(t('ACCEPT_TERMS')),
  });
};

export const getSendOtpValidation = (t) => {
  return yup.object().shape({
    username: yup
      .string()
      .required(t('USERNAME_REQUIRED'))
      .min(3, t('USERNAME_MIN_LENGTH'))
      .max(20, t('USERNAME_MAX_LENGTH'))
      .matches(/^[a-z][a-z0-9]*$/, t('USERNAME_PATTERN')),

    password: yup
      .string()
      .required(t('ENTER_PASSWORD'))
      .min(8, t('PASSWORD_REQUIREMENTS'))
      .max(15, t('PASSWORD_REQUIREMENTS'))
      .matches(/[A-Z]/, t('PASSWORD_REQUIREMENTS'))
      .matches(/[a-z]/, t('PASSWORD_REQUIREMENTS'))
      .matches(/\d/, t('PASSWORD_REQUIREMENTS'))
      .matches(/[@$!%*?&]/, t('PASSWORD_REQUIREMENTS')),

    mobile: yup
      .string()
      .required(t('MOBILE_REQUIRED'))
      .matches(/^91\d{10}$/, t('MOBILE_PATTERN')),
  });
};

export const getForgetValidation = (t) => {
  return yup.object().shape({
    mobile: yup
      .string()
      .matches(/^\d{10}$/, t('NUMBER_MIN_LENGTH'))
      .required(t('ENTER_PHONE_NUMBER1')),

    otp: yup.string().when('showOTPInput', {
      is: true,
      then: (schema) =>
        schema.required(t('OTP_REQUIRED')).matches(/^\d{6}$/, t('INVALID_OTP')),
    }),

    password: yup
      .string()
      .required(t('ENTER_PASSWORD'))
      .test(
        'strong-password',
        t('PASSWORD_REQUIREMENTS'),
        (value) =>
          value &&
          value.length >= 8 &&
          value.length <= 15 &&
          /[A-Z]/.test(value) &&
          /[a-z]/.test(value) &&
          /\d/.test(value) &&
          /[@$!%*?&]/.test(value),
      ),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('PASSWORDS_MUST_MATCH'))
      .required(t('CONFIRM_PASSWORD_REQUIRED')),
  });
};

export const getChangePasswordValidation = (t) => {
  return yup.object().shape({
    oldPassword: yup.string().required(t('CURRENT_PASSWORD_REQUIRED')),

    newPassword: yup
      .string()
      .required(t('ENTER_PASSWORD'))
      .test(
        'strong-password',
        t('PASSWORD_REQUIREMENTS'),
        (value) =>
          value &&
          value.length >= 8 &&
          value.length <= 15 &&
          /[A-Z]/.test(value) &&
          /[a-z]/.test(value) &&
          /\d/.test(value) &&
          /[@$!%*?&]/.test(value),
      ),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], t('PASSWORDS_MUST_MATCH'))
      .required(t('CONFIRM_PASSWORD_REQUIRED')),
  });
};

export const getFeedbackValidation = (t) => {
  return yup.object().shape({
    feedback: yup
      .string()
      .required(t('FEEDBACK_REQUIRED'))
      .min(20, t('FEEDBACK_MIN_LENGTH'))
      .max(500, t('FEEDBACK_MAX_LENGTH')),
  });
};

export const getProfileNameValidation = (t) => {
  return yup.object().shape({
    username: yup
      .string()
      .required(t('USERNAME_REQUIRED'))
      .min(3, t('USERNAME_MIN_LENGTH'))
      .max(20, t('USERNAME_MAX_LENGTH'))
      .matches(/^[a-z][a-z0-9]*$/, t('USERNAME_PATTERN')),
  });
};
