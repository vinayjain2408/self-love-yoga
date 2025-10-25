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

export const Home = loadable(() => import('./Home'), {
  fallback: <Loading />,
});

export const Notification = loadable(() => import('./Notification'), {
  fallback: <Loading />,
});

export const AboutUs = loadable(() => import('./AboutUs'), {
  fallback: <Loading />,
});
export const Login = loadable(() => import('./Login'), {
  fallback: <Loading />,
});

export const Signup = loadable(() => import('./Signup'), {
  fallback: <Loading />,
});

export const Invest = loadable(() => import('./Invest'), {
  fallback: <Loading />,
});
