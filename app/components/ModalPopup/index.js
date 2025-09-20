import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { postAuthReq } from '@/utils/apiHandlers';
import LocalContext from '../../contexts/LocaleContext';
import { deleteToken } from 'firebase/messaging';
import { messaging } from '@/firebase';
import { clearFcmTokenFirebase } from '@/redux/slice/firebaseNotificationSlice';
import { useDispatch } from 'react-redux';
import { cleanup } from '@/redux/slice/userSlice';

const ModalPopup = ({
  open,
  handleClose,
  imageSrc,
  paragraph,
  button1,
  button2,
  bgColor,
  textColor,
  button1Gradient,
  button2Gradient,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { LOCALE } = useContext(LocalContext);
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const res = await postAuthReq('/auth/logout');
      if (res?.status) {
        localStorage?.removeItem('token');
        localStorage?.removeItem('userId');
        localStorage?.removeItem('fcmToken');
        sessionStorage?.clear();
        Cookies?.remove('__user__authToken');
        Cookies?.remove('test__users__isLoggedIn');
        Cookies?.remove('isDemoUser');
        dispatch(clearFcmTokenFirebase());
        dispatch(cleanup());
        deleteToken(messaging)?.then(() => {
          console.log('Old FCM Token deleted');
        });
        navigate(LOCALE + '/');
      } else {
        console?.error('Failed to log out');
      }
    } catch (error) {
      console?.error('Error during logout:', error);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div
          className="w-80 p-6 rounded-lg shadow-xl text-center relative"
          style={{
            backgroundColor: bgColor || 'white',
            color: textColor || 'black',
          }}
        >
          {imageSrc && (
            <img
              src={imageSrc}
              alt="Popup"
              className="mx-auto mb-4 rounded-lg w-auto h-auto"
            />
          )}

          <p id="modal-description" className="mt-2">
            {paragraph}
          </p>

          <div className="flex flex-col gap-2 mt-4">
            {button1 && (
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className={`w-full px-4 py-2 rounded-full font-medium font-poppins text-16 leading-6 text-black ${
                  button1Gradient || 'bg-custom-gradient'
                } ${button1?.className || ''}`}
              >
                {isLoading ? 'Logging out...' : button1?.text}
              </button>
            )}
            {button2 && (
              <button
                onClick={button2.onClick}
                className={`w-full px-4 py-2 rounded-full font-medium font-poppins text-16 leading-6 ${
                  button2Gradient || 'bg-transparent border border-yellow-300'
                } ${button2?.className || ''}`}
              >
                {button2?.text}
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

ModalPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  imageSrc: PropTypes.string,
  paragraph: PropTypes.string,
  button1: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
  }),
  button2: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
  }),
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  button1Gradient: PropTypes.string,
  button2Gradient: PropTypes.string,
};

export default ModalPopup;
