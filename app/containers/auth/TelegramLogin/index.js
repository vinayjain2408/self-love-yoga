import React, { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { init } from '@/redux/actions';
import { setAuthCookie } from '@/utils/apiHandlers';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

const TelegramLogin = () => {
  const dispatch = useDispatch();
  const teleLogin = localStorage.getItem('teleLog');
  const handleTelegramAuth = async (telegramData) => {
    if (telegramData) {
      try {
        const response = await axios.post(
          'https://api-mstigaming.codesfortomorrow.com/auth/telegram',
          telegramData,
        );
        const { data, status, error } = response;
        if (data?.type != 'agent') {
          if (status) {
            const { accessToken, loginAt } = data;
            Cookies.set('__user__authToken_user', accessToken, {
              expires: 1,
            });
            localStorage.setItem('__user__loginTime', loginAt);
            dispatch(init());
            setAuthCookie();
            window.location.href = '/welcome';
            localStorage.setItem('teleLog', 'false');
          } else if (error) {
            Array.isArray(error)
              ? error?.message?.map((msg) => {
                  toast.dismiss();
                  toast.error(msg);
                })
              : toast.dismiss();
            toast.error(error?.message);
          }
        } else {
          toast.dismiss();
          toast.error('Invalid Credentials');
        }
      } catch (error) {
        console.error('Error during Telegram authentication:', error);
      }
    }
  };

  useEffect(() => {
    window.onTelegramAuth = handleTelegramAuth;
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', 'MstIgamingBot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-userpic', 'false');
    script.onload = () => {
      console.log('Telegram Widget Loaded');
      const iframe = document.getElementById('telegram-login-MstIgamingBot');
      if (iframe) {
        const btn = iframe.getElementsByClassName('tgme_widget_login_button');
        console.log(btn);
      }
    };
    const container = document.getElementById('telegram-login-widget');
    container?.appendChild(script);
    return () => {
      if (container?.contains(script)) {
        container.removeChild(script);
      }
    };
    // eslint-disable-next-line
  }, [teleLogin === 'true']);

  useEffect(() => {
    window.TelegramLoginWidget = {
      onLogin: (user) => {
        handleTelegramAuth(user);
      },
    };

    // eslint-disable-next-line
  }, []);

  return (
    <div className="text-black flex justify-center items-center">
      <div id="telegram-login-widget"></div>
    </div>
  );
};

export default TelegramLogin;
