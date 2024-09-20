/* eslint-disable prettier/prettier */
import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication3/Register3')));
const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication3/AuthForgotPassword')));
const AuthResetPassword = Loadable(lazy(() => import('views/pages/authentication3/AuthResetPassword')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/pages/login/login3',
      element: <AuthLogin3 />
    },
    {
      path: '/pages/register/register3',
      element: <AuthRegister3 />
    },
    {
      path: '/pages/forgot-password/forgot-password',
      element: <AuthForgotPassword />
    },
    {
      path: '/pages/reset-password/reset-password',
      element: <AuthResetPassword />
    }
  ]
};

export default AuthenticationRoutes;
