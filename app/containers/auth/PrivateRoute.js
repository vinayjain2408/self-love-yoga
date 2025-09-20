import { isLoggedIn } from '@/utils/apiHandlers';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const auth = isLoggedIn();
  return auth ? <>{children}</> : <Navigate to={'/'} />;
};
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoute;
