import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticatedByToken = localStorage.getItem('auth_token');

  if (!isAuthenticated && !isAuthenticatedByToken) {
    // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return <Navigate to="/pages/login/login3" />;
  }

  return children;
};

export default ProtectedRoute;
