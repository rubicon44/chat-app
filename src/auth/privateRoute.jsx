import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AuthContext } from './authProvider';
import SignIn from '../static_pages/sign_in';

const PrivateRoute = ({ component: RouteComponent, ...options }) => {
  const { currentUser } = useContext(AuthContext);
  const Component = currentUser ? RouteComponent : SignIn;

  return <Route {...options} component={Component} />;
};

export default PrivateRoute;