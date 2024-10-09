/* eslint-disable prettier/prettier */
import {
  IconKey,
  IconUserBolt,
  IconBuildingWarehouse,
  IconBrandProducthunt,
  IconArrowAutofitRight,
  IconArrowAutofitLeft,
  IconBuildingLighthouse
} from '@tabler/icons-react';
// import PeopleIcon from '@mui/icons-material/People';
const icons = {
  IconKey,
  IconUserBolt,
  IconBuildingWarehouse,
  IconBrandProducthunt,
  IconArrowAutofitRight,
  IconArrowAutofitLeft,
  IconBuildingLighthouse
};

const users = {
  id: 'pages',
  title: 'Quản lý kho',
  caption: 'Quản lý kho',
  type: 'group',
  children: [
    {
      id: 'User',
      title: 'Quản lý người dùng',
      type: 'item',
      url: '/users',
      icon: icons.IconUserBolt,
      breadcrumbs: false
    },
    {
      id: 'Warehouse',
      title: 'Quản lý Kho hàng',
      type: 'item',
      url: '/warehouses',
      icon: icons.IconBuildingWarehouse,
      breadcrumbs: false
    },
    {
      id: 'Products',
      title: 'Danh sách biển bảng',
      type: 'item',
      url: '/products',
      icon: icons.IconBrandProducthunt,
      breadcrumbs: false
    },
    {
      id: 'Warehouse-dispatch',
      title: 'Xuất kho',
      type: 'item',
      url: '/warehouse-dispatch',
      icon: icons.IconArrowAutofitRight,
      breadcrumbs: false
    },
    {
      id: 'Customer',
      title: 'Dự án',
      type: 'item',
      url: '/customer',
      icon: icons.IconBuildingLighthouse,
      breadcrumbs: false
    },
    {
      id: 'Suppliers',
      title: 'Nhà cung cấp',
      type: 'item',
      url: '/suppliers',
      icon: icons.IconBuildingWarehouse,
      breadcrumbs: false
    },
    {
      id: 'Transfer',
      title: 'Chuyển kho',
      type: 'item',
      url: '/transfer',
      icon: icons.IconBuildingWarehouse,
      breadcrumbs: false
    },
    {
      id: 'Orders',
      title: 'Nhập kho',
      type: 'item',
      url: '/orders',
      icon: icons.IconArrowAutofitLeft,
      breadcrumbs: false
    },
    {
      id: 'Permissions',
      title: 'Quản lý quyền hạn',
      type: 'item',
      url: '/permissions',
      icon: icons.IconBuildingWarehouse,
      breadcrumbs: false
    }
  ]
};

export default users;
