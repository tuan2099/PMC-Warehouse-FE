import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import userApi from 'api/auth.api';

const ProtectedRoute = ({ children, requiredPermissions, moduleName }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authToken = localStorage.getItem('auth_token');

  // Sử dụng React Query để lấy dữ liệu người dùng
  const {
    data: userData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['customer'],
    queryFn: async () => {
      const response = await userApi.getUserById(userID.id); // Giả định userID.id có sẵn trong ứng dụng
      return response;
    },
    keepPreviousData: true
  });

  // Kiểm tra nếu người dùng chưa đăng nhập
  if (!isAuthenticated && !authToken) {
    return <Navigate to="/pages/login/login3" state={{ from: window.location.pathname }} replace />;
  }

  // Hiển thị loading khi đang lấy dữ liệu người dùng
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Hiển thị lỗi nếu xảy ra lỗi khi lấy dữ liệu người dùng
  if (error) {
    return <div>Error loading user data: {error.message}</div>;
  }

  // Giả định quyền của người dùng được trả về trong userData (ví dụ: userData.permissions)
  const userPermissions = userData?.data?.data.permission || {};
  // Hàm kiểm tra xem người dùng có ít nhất một quyền trong mảng requiredPermissions không
  const hasAnyPermission = (module, permissions) => {
    const userModulePermissions = userPermissions?.[module] || [];
    return permissions.some((permission) => userModulePermissions.includes(permission));
  };

  // Kiểm tra quyền của người dùng cho module cụ thể
  if (requiredPermissions && !hasAnyPermission(moduleName, requiredPermissions)) {
    return <div>Bạn không có quyền truy cập vào trang này.</div>;
  }

  // Nếu đã đăng nhập và có quyền, hiển thị nội dung
  return children;
};

export default ProtectedRoute;
