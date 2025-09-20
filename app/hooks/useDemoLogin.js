import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
// import { postData } from '@/helpers/request';
import { getAuthReq, postAuthReq, setAuthCookie } from '@/utils/apiHandlers';
import { useDispatch } from 'react-redux';
import { increment } from '@/redux/slice/countSlice';
import LocalContext from '../contexts/LocaleContext';
const useDemoLogin = () => {
  const { LOCALE } = useContext(LocalContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchUserData = async () => {
    try {
      const res = await getAuthReq('/users/me');
      if (res?.status) {
        localStorage.setItem('userId', res?.data?.id);
        dispatch(increment());
        navigate(LOCALE + '/');
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const res = await postAuthReq('/auth/demo');
      if (res?.data?.type === 'demo') {
        Cookies.set('isDemoUser', true);
        Cookies.set('__user__authToken', res?.data?.accessToken);
        setAuthCookie();
        fetchUserData();
      } else {
        toast.error(
          res?.data?.error || res?.data?.message || 'Internal Server Error',
        );
      }
    } catch (err) {
      toast.error('Something went wrong! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { handleDemoLogin, loading };
};

export default useDemoLogin;
