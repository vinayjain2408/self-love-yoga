import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getUser } from '@/redux/slice/userSlice';
const MainLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getUser());
  }, [location.pathname, dispatch]);
  return (
    <div className="w-full !bg-primary-1200 md:mx-auto relative  2xl:min-h-screen">
      {/* Top Left Background Image */}
      <img
        src={`${process.env.IMAGE_KIT}/images/bgcolor.svg`}
        alt="Top Left"
        // className="absolute top-[558px] right-[-160px] w-[20vw] z-0"
        className="absolute w-[20vw] z-0 top-0 left-0"
      />

      {/* Bottom Right Background Image */}
      <img
        src={`${process.env.IMAGE_KIT}/images/bgcolor.svg`}
        alt="Bottom Right"
        // className="absolute left-[-123px] top-[-144px] w-[20vw] z-0"
        className="absolute w-[20vw] z-0 bottom-0 right-0"
      />

      {/* Main Content Wrapper */}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
