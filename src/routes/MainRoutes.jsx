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
import ProtectedRoute from './ProtectedRoute';
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
    // {
    //   path: 'dashboard',
    //   children: [
    //     {
    //       path: 'default',
    //       element: <DashboardDefault />
    //     }
    //   ]
    // },
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
    }
  ]
};

export default MainRoutes;
