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
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      )
    },
    {
      path: 'products',
      element: (
        <ProtectedRoute>
          <ProductsManager />
        </ProtectedRoute>
      )
    },
    {
      path: 'users',
      element: (
        <ProtectedRoute>
          <UserManager />
        </ProtectedRoute>
      )
    },
    {
      path: 'warehouses',
      element: (
        <ProtectedRoute>
          <WarehouseManager />
        </ProtectedRoute>
      )
    },
    {
      path: 'warehouse-dispatch',
      element: (
        <ProtectedRoute>
          <WarehouseDispatch />
        </ProtectedRoute>
      )
    },
    {
      path: 'customer',
      element: (
        <ProtectedRoute>
          <Customer />
        </ProtectedRoute>
      )
    },
    {
      path: 'suppliers',
      element: (
        <ProtectedRoute>
          <Suppliers />
        </ProtectedRoute>
      )
    },
    {
      path: 'transfer',
      element: (
        <ProtectedRoute>
          <Transfer />
        </ProtectedRoute>
      )
    },
    {
      path: 'options',
      element: (
        <ProtectedRoute>
          <Option />
        </ProtectedRoute>
      )
    },
    {
      path: 'orders',
      element: (
        <ProtectedRoute>
          <Order />
        </ProtectedRoute>
      )
    },
    {
      path: 'permissions',
      element: (
        <ProtectedRoute>
          <Permission />
        </ProtectedRoute>
      )
    },
    {
      path: 'issue',
      element: (
        <ProtectedRoute>
          <Issue />
        </ProtectedRoute>
      )
    },
    {
      path: 'incident',
      element: (
        <ProtectedRoute>
          <Incident />
        </ProtectedRoute>
      )
    }
  ]
};

export default MainRoutes;
