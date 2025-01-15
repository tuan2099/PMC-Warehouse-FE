import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

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
import Issue from 'views/Issue';
import Incident from 'views/Incident';
// sample page routing

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: (
        <ProtectedRoute requiredPermissions={['view']}>
          <DashboardDefault />
        </ProtectedRoute>
      )
    },
    {
      path: 'products',
      element: (
        <ProtectedRoute requiredPermissions={['view']}>
          <ProductsManager />
        </ProtectedRoute>
      )
    },
    {
      path: 'users',
      element: (
        <ProtectedRoute requiredPermissions={['view']}>
          <UserManager />
        </ProtectedRoute>
      )
    },
    {
      path: 'warehouses',
      element: (
        <ProtectedRoute requiredPermissions={['view']}>
          <WarehouseManager />
        </ProtectedRoute>
      )
    },
    {
      path: 'warehouse-dispatch',
      element: (
        <ProtectedRoute requiredPermissions={['view']}>
          <WarehouseDispatch />
        </ProtectedRoute>
      )
    },
    {
      path: 'customer',
      element: (
        <ProtectedRoute requiredPermissions={['view']}>
          <Customer />
        </ProtectedRoute>
      )
    },
    {
      path: 'suppliers',
      element: (
        <ProtectedRoute requiredPermissions={['view']}>
          <Suppliers />
        </ProtectedRoute>
      )
    },
    {
      path: 'transfer',
      element: (
        <ProtectedRoute requiredPermissions={['view']}>
          <Transfer />
        </ProtectedRoute>
      )
    },
    {
      path: 'options',
      element: (
        <ProtectedRoute requiredPermissions={['view']}>
          <Option />
        </ProtectedRoute>
      )
    },
    {
      path: 'orders',
      element: (
        <ProtectedRoute requiredPermissions={['view']}>
          <Order />
        </ProtectedRoute>
      )
    },
    {
      path: 'permissions',
      element: (
        <ProtectedRoute requiredPermissions={['view']}>
          <Permission />
        </ProtectedRoute>
      )
    },
    {
      path: 'issue',
      element: (
        <ProtectedRoute requiredPermissions={['view']}>
          <Issue />
        </ProtectedRoute>
      )
    },
    {
      path: 'incident',
      element: (
        <ProtectedRoute requiredPermissions={['view']}>
          <Incident />
        </ProtectedRoute>
      )
    }
  ]
};

export default MainRoutes;
