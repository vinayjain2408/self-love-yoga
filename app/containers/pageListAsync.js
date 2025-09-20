import React from 'react';
import { Loading } from '@/components';
import loadable from '../utils/loadable';

// Landing Page
export const Landing = loadable(() => import('./Landing'), {
  fallback: <Loading />,
});

// Static Pages
export const NotFound = loadable(() => import('./NotFound'), {
  fallback: <Loading />,
});
export const Login = loadable(() => import('./auth/Login'), {
  fallback: <Loading />,
});
export const Signup = loadable(() => import('./auth/Signup'), {
  fallback: <Loading />,
});
export const ForgetPassword = loadable(() => import('./auth/ForgetPassword'), {
  fallback: <Loading />,
});
export const Home = loadable(() => import('./Home'), {
  fallback: <Loading />,
});

export const Notification = loadable(() => import('./Notification'), {
  fallback: <Loading />,
});
export const Profile = loadable(() => import('./Profile'), {
  fallback: <Loading />,
});

export const AboutUs = loadable(() => import('./AboutUs'), {
  fallback: <Loading />,
});
