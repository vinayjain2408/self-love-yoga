// import { reactIcons } from '@/utils/icons';
import { init } from '@/redux/actions';
import { increment } from '@/redux/slice/countSlice';
import { setAuthCookie } from '@/utils/apiHandlers';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const GoogleOAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id:
            '459167872534-dkf140nbbtv5gd1kgm61g513c53hs1uk.apps.googleusercontent.com',
          callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton'),
          {
            type: 'standard',
            shape: 'pill',
            theme: 'outline',
            text: 'sign_in_with',
            size: 'large',
            logo_alignment: 'center',
            width: '220',
          },
        );
        window.google.accounts.id.prompt();
      }
    };
    return () => {
      document.body.removeChild(script);
    };
    // eslint-disable-next-line
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const serverResponse = await axios.post(
        'https://api-mstigaming.codesfortomorrow.com/auth/google',
        {
          token: response.credential,
        },
      );
      // const serverResponse = await axios.get(
      //   `https://api-mstigaming.codesfortomorrow.com/auth/google?token=${response.credential}`
      // );

      const { data, status, error } = serverResponse;
      if (data?.type != 'agent') {
        if (status) {
          const { accessToken, loginAt } = data;
          Cookies.set('__user__authToken', accessToken, {
            expires: 1,
          });
          Cookies.set('test__users__isLoggedIn', true);
          localStorage.setItem('test__users__isLoggedIn', loginAt);
          dispatch(init());
          dispatch(increment());
          setAuthCookie();
          window.location.href = '/';
          // localStorage.setItem('teleLog', 'false');
        } else if (error) {
          if (Array.isArray(error)) {
            toast.dismiss();
            toast.error(error?.message[0]);
          } else {
            toast.dismiss();
            toast.error(error?.message);
          }
        }
      } else {
        toast.dismiss();
        toast.error('Invalid Credentials');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  return (
    <div className=" flex justify-center items-center">
      <div
        id="googleSignInButton"
        data-type="standard"
        data-shape="pill"
        data-theme="filled_blue"
        data-text="sign_in_with"
        data-size="large"
        data-logo_alignment="center"
        data-width="220"
      ></div>
    </div>
  );
};

export default GoogleOAuth;
