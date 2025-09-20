import { reactIcons } from '@/utils/icon';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LocalContext from '../../contexts/LocaleContext';
// import Cookies from 'js-cookie';
const Navbar = () => {
  const navigate = useNavigate();
  const { LOCALE } = useContext(LocalContext);
  return (
    <>
      <nav className="relative bg-[#011030] z-50">
        <div className="py-2 shadow-custom fixed -top-1 left-0 right-0 mx-auto bg-[#011030] z-50">
          <div className="px-4 flex items-center justify-between">
            <div className="h-[40px] ">
              <img
                src={`/images/Home/gamelogo.png`}
                className="h-full w-full"
              />
            </div>
            <div
              onClick={() => navigate(LOCALE + '/notification')}
              className="text-yellow-500 text-[23px]"
            >
              {reactIcons.notifiy}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
