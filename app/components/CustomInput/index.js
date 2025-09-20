import React from 'react';
import PropTypes from 'prop-types';

const CustomInput = ({
  label,
  name,
  value,
  onChange,
  error,
  classname,
  placeHolder,
  type,
  maxLen,
  minLen,
  disabled,
}) => {
  return (
    <div className="form-div mb-3">
      <div className="flex flex-col mt-4">
        <label
          htmlFor={name}
          className="font-poppins font-medium text-14 leading-6 mb-1"
        >
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeHolder}
          className={`form-input-2 ${classname} ${
            error && 'form-error'
          } placeholder:font-normal placeholder:font-inter px-2 py-[8px] rounded-lg placeholder:leading-4  text-black outline-none`}
          maxLength={maxLen}
          minLength={minLen}
          disabled={disabled}
          autoComplete="off"
        />
        {error && <div className="error-message text-red-500">{error}</div>}
      </div>
    </div>
  );
};

CustomInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  classname: PropTypes.string,
  placeHolder: PropTypes.string,
  maxLen: PropTypes.any,
  minLen: PropTypes.any,
  onBlurValidation: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CustomInput;
