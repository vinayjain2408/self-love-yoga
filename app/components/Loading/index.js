import React from 'react';

const Loading = () => {
  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 inset-0 flex items-center justify-center  z-50 h-[100vh] w-[100vw] backdrop-blur-[2px]">
      <div className="shapes"></div>
    </div>
  );
};

export default Loading;
