import React from 'react';
import PropTypes from 'prop-types';

const CustomButton = ({
  label,
  onClick,
  disabled,
  classname,
  type,
  isLoading,
  children,
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`bg-custom-gradient w-full text-black font-poppins font-semibold  leading-4 rounded-full   ${classname} ${
      disabled ? 'cursor-not-allowed' : ''
    }

    }`}
    disabled={disabled || isLoading}
  >
    {isLoading ? 'Loading...' : label || children}
  </button>
);

CustomButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  classname: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default CustomButton;
