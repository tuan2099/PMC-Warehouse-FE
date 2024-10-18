/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import userApi from 'api/auth.api';
import { Box, Container, Typography } from '@mui/material';

const ProtectedRoute = ({ children, requiredPermissions, moduleName }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authToken = localStorage.getItem('auth_token');
  const userID = JSON.parse(localStorage.getItem('auth_user'));
  const {
    data: userData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await userApi.getUserById(userID.id);
      return response;
    },
    keepPreviousData: true
  });

  if (!isAuthenticated && !authToken) {
    return <Navigate to="/pages/login/login3" state={{ from: window.location.pathname }} replace />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data: {error.message}</div>;
  }

  const userPermissions = userData?.data?.data.permission || {};
  const userRole = userData?.data?.data.role || '';

  if (userRole === 'ADMIN') {
    return children;
  }

  const hasAnyPermission = (module, permissions) => {
    const userModulePermissions = userPermissions?.[module] || [];
    return permissions.some((permission) => userModulePermissions.includes(permission));
  };

  if (requiredPermissions && !hasAnyPermission(moduleName, requiredPermissions)) {
    return (
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" textAlign="center">
          <Typography variant="h4" fontWeight="bold">
            Bạn không có quyền truy cập vào trang này.
          </Typography>
        </Box>
      </Container>
    );
  }

  return children;
};

export default ProtectedRoute;
