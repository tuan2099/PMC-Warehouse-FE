import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import userApi from 'api/auth.api';
import { Box, Container, Typography } from '@mui/material';

const ProtectedRoute = ({ children, requiredPermissions = [], moduleName }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authToken = localStorage.getItem('auth_token');
  const userID = JSON.parse(localStorage.getItem('auth_user'));

  const {
    data: userData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['user', userID?.id],
    queryFn: async () => {
      if (!userID?.id) throw new Error('User ID is not available.');
      const response = await userApi.getUserById(userID.id);
      return response;
    },
    enabled: !!userID?.id,
    keepPreviousData: true
  });

  if (!isAuthenticated && !authToken) {
    return <Navigate to="/pages/login/login3" state={{ from: window.location.pathname }} replace />;
  }

  if (isLoading) {
    return (
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography variant="h6">Loading user data...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" textAlign="center">
          <Typography variant="h6" color="error">
            Error loading user data: {error.message}
          </Typography>
        </Box>
      </Container>
    );
  }

  const userPermissions = userData?.data?.data?.permission || {};
  const userRole = userData?.data?.data?.roleID || '';
  if (userRole === 1) {
    return children;
  }

  const hasAnyPermission = (module, permissions) => {
    if (!module || permissions.length === 0) return false;
    const userModulePermissions = userPermissions?.[module] || [];
    return permissions.some((permission) => userModulePermissions.includes(permission));
  };

  if (requiredPermissions.length > 0 && !hasAnyPermission(moduleName, requiredPermissions)) {
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
