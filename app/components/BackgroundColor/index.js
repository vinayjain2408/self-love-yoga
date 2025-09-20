import React from 'react';

const BackgroundColor = () => {
  return (
    <div className="relative w-full inset-0 h-screen bg-[#05012B] -z-50 overflow-hidden">
      <img
        src={`${process.env.IMAGE_KIT}/images/bgcolor.svg`}
        alt="Top Left"
        className="absolute inset-0 top-0 left-0 w-1/2 "
      />
      <img
        src={`${process.env.IMAGE_KIT}/images/bgcolor.svg`}
        alt="Bottom Right"
        className="absolute inset-0 bottom-0 right-0  w-1/2"
      />
    </div>
  );
};

export default BackgroundColor;
