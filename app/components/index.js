import React from 'react';
import loadable from '../utils/loadable';
import Loading from './Loading';

// Loading - No need to lazy load this component
export { default as Loading } from './Loading';
export { default as TopBar } from './TopBar';

export const Welcome = loadable(() => import('./Welcome'), {
  fallback: <Loading />,
});

export const Modal = loadable(() => import('./Modal'), {
  fallback: <Loading />,
});
export const Footer = loadable(() => import('./Footer'), {
  fallback: <Loading />,
});
export const Navbar = loadable(() => import('./Navbar'), {
  fallback: <Loading />,
});
