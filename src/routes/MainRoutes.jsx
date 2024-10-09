/* eslint-disable prettier/prettier */
import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

const UserManager = Loadable(lazy(() => import('views/User/index')));
const WarehouseManager = Loadable(lazy(() => import('views/warehouse/index')));
const ProductsManager = Loadable(lazy(() => import('views/Products/index')));
const WarehouseDispatch = Loadable(lazy(() => import('views/WarehouseDispatch/index')));
const Customer = Loadable(lazy(() => import('views/customer/index')));
import ProtectedRoute from './ProtectedRoute';
import Suppliers from 'views/Suppliers';
import Transfer from 'views/Transfer';
import Option from 'views/options';
import Order from 'views/order';
import Permission from 'views/permission';
// sample page routing

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      )
    },
    {
      path: 'products',
      element: (
        <ProtectedRoute requiredPermissions={['view']} moduleName="sản phẩm">
          <ProductsManager />
        </ProtectedRoute>
      )
    },
    {
      path: 'users',
      element: (
        <ProtectedRoute requiredPermissions={['view']} moduleName="người dùng">
          <UserManager />
        </ProtectedRoute>
      )
    },
    {
      path: 'warehouses',
      element: (
        <ProtectedRoute requiredPermissions={['view']} moduleName="nhà kho">
          <WarehouseManager />
        </ProtectedRoute>
      )
    },
    {
      path: 'warehouse-dispatch',
      element: (
        <ProtectedRoute requiredPermissions={['view']} moduleName="xuất kho">
          <WarehouseDispatch />
        </ProtectedRoute>
      )
    },
    {
      path: 'customer',
      element: (
        <ProtectedRoute requiredPermissions={['view']} moduleName="khách hàng">
          <Customer />
        </ProtectedRoute>
      )
    },
    {
      path: 'suppliers',
      element: (
        <ProtectedRoute requiredPermissions={['view']} moduleName="nhà cung cấp">
          <Suppliers />
        </ProtectedRoute>
      )
    },
    {
      path: 'transfer',
      element: (
        <ProtectedRoute requiredPermissions={['view']} moduleName="chuyển kho">
          <Transfer />
        </ProtectedRoute>
      )
    },
    {
      path: 'options',
      element: (
        <ProtectedRoute requiredPermissions={['view']} moduleName="cài đặt">
          <Option />
        </ProtectedRoute>
      )
    },
    {
      path: 'orders',
      element: (
        <ProtectedRoute requiredPermissions={['view']} moduleName="nhập kho">
          <Order />
        </ProtectedRoute>
      )
    },
    {
      path: 'permissions',
      element: (
        <ProtectedRoute requiredPermissions={['view']} moduleName="quyền hạn">
          <Permission />
        </ProtectedRoute>
      )
    }
  ]
};

export default MainRoutes;
