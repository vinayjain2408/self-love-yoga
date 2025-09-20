import { reactIcons } from '@/utils/icon';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ heading, isBack }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center   border-[#CAE0E8] ">
      {isBack && (
        <div
          onClick={() => navigate(-1)}
          className="h-8 w-8 p-2 flex justify-center items-center bg-custom-gradient text-xl text-black rounded-lg font-bold cursor-pointer"
        >
          {reactIcons.backarrow}
        </div>
      )}
      <h1 className="text-2xl flex items-center ">{heading}</h1>
    </div>
  );
};

BackButton.propTypes = {
  heading: PropTypes.string.isRequired,
  isBack: PropTypes.bool,
};

BackButton.defaultProps = {
  isBack: true,
};

export default BackButton;
