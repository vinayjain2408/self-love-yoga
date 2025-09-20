import React, { useContext } from 'react';
import BackButton from '../BackButton';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { reactIcons } from '@/utils/icon';
import LocalContext from '../../contexts/LocaleContext';

const TopBar = ({ heading, heading1, notif, backBtn }) => {
  const navigate = useNavigate();
  const { LOCALE } = useContext(LocalContext);
  return (
    <div className="mb-2   ">
      <nav className="grid grid-cols-6 py-2 pt-4 w-full   md:mx-auto  ">
        {!backBtn ? (
          <div className="col-span-1">
            <BackButton />
          </div>
        ) : (
          <div className="col-span-1"></div>
        )}

        {heading ? (
          <h2 className="font-poppins col-span-4 text-white text-20 leading-[30px] font-semibold text-center">
            {heading}
          </h2>
        ) : heading1 ? (
          <h2 className="font-poppins col-span-4 text-white text-18 leading-[30px] font-semibold text-center">
            {heading1}
          </h2>
        ) : (
          <div className="col-span-4 text-white"></div>
        )}

        {notif ? (
          <div
            onClick={() => navigate(LOCALE + '/notification')}
            className="text-yellow-500 text-[23px] col-span-1 flex items-center justify-end cursor-pointer"
          >
            {reactIcons.notifiy}
          </div>
        ) : (
          <div className="col-span-1"></div>
        )}
      </nav>
    </div>
  );
};
TopBar.propTypes = {
  heading: PropTypes.string,
  heading1: PropTypes.string,
  notif: PropTypes.bool,
  backBtn: PropTypes.bool,
};

export default TopBar;
