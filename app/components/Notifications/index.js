import { useCallback, useEffect } from 'react';
import { getFCMToken } from '@/firebase';
import { isLoggedIn, postAuthReq } from '@/utils/apiHandlers';
import { useDispatch, useSelector } from 'react-redux';
import { setFcmTokenFirebase } from '@/redux/slice/firebaseNotificationSlice';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const Notifications = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLogin = isLoggedIn();
  const savedToken = localStorage.getItem('fcmToken');
  const { fcmTokenFirebase } = useSelector((state) => state.firebaseToken);
  const isDemoUser = Cookies.get('isDemoUser');
  // Request Notification permission
  const requestNotificationPermission = useCallback(() => {
    if (
      'Notification' in window &&
      (Notification.permission === 'default' ||
        Notification.permission === 'denied')
    ) {
      Notification.requestPermission().then((permission) => {
        console.info(`Notifications ${permission}`);
      });
    }
  }, []);

  // Get FCM Token from Firebase and store in Redux
  const fetchAndSetFirebaseToken = useCallback(async () => {
    if (isLogin) {
      try {
        const token = await getFCMToken();
        if (token) {
          dispatch(setFcmTokenFirebase(token));
          console.log({ firebaseToken: token });
        }
      } catch (err) {
        console.error('Error fetching FCM token:', err);
      }
    }
  }, [dispatch, isLogin]);

  // Send Firebase token to backend if it's new or not yet sent
  const sendFirebaseToken = useCallback(async () => {
    if (isDemoUser || !fcmTokenFirebase || savedToken === fcmTokenFirebase)
      return;

    try {
      const response = await postAuthReq('/users/notification-token', {
        token: fcmTokenFirebase,
      });

      const { status, error } = response;
      if (status) {
        localStorage.setItem('fcmToken', fcmTokenFirebase);
      } else {
        console.error(error);
        // toast.error('Failed to send notification token.');
      }
    } catch (err) {
      console.error('Error sending FCM token:', err);
    }
  }, [fcmTokenFirebase, savedToken, isDemoUser]);

  // Handle FCM token fetching
  useEffect(() => {
    fetchAndSetFirebaseToken();
  }, [fetchAndSetFirebaseToken]);

  // Send token to backend on token change or route change
  useEffect(() => {
    if (isLogin && fcmTokenFirebase && fcmTokenFirebase !== savedToken) {
      sendFirebaseToken();
    }
  }, [
    isLogin,
    fcmTokenFirebase,
    savedToken,
    location.pathname,
    sendFirebaseToken,
  ]);

  // Ask for Notification permission on mount
  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  return null;
};

export default Notifications;
