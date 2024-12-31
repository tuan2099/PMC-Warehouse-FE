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
  caption: 'Quản lý biển bảng',
  type: 'group',
  children: [
    {
      id: 'User',
      title: 'Quản lý người dùng',
      type: 'item',
      url: '/users',
      icon: icons.IconUserBolt
    },
    {
      id: 'Warehouse',
      title: 'Quản lý Kho hàng',
      type: 'item',
      url: '/warehouses',
      icon: icons.IconBuildingWarehouse
    },
    {
      id: 'Products',
      title: 'Danh sách biển bảng',
      type: 'item',
      url: '/products',
      icon: icons.IconBrandProducthunt
    },
    {
      id: 'Warehouse-dispatch',
      title: 'Xuất kho',
      type: 'item',
      url: '/warehouse-dispatch',
      icon: icons.IconArrowAutofitRight
    },
    {
      id: 'Customer',
      title: 'Dự án',
      type: 'item',
      url: '/customer',
      icon: icons.IconBuildingLighthouse
    },
    {
      id: 'Suppliers',
      title: 'Nhà cung cấp',
      type: 'item',
      url: '/suppliers',
      icon: icons.IconBuildingWarehouse
    },
    {
      id: 'Transfer',
      title: 'Chuyển kho',
      type: 'item',
      url: '/transfer',
      icon: icons.IconBuildingWarehouse
    },
    {
      id: 'Orders',
      title: 'Nhập kho',
      type: 'item',
      url: '/orders',
      icon: icons.IconArrowAutofitLeft
    },
    {
      id: 'Permissions',
      title: 'Quản lý quyền hạn',
      type: 'item',
      url: '/permissions',
      icon: icons.IconBuildingWarehouse
    }
  ]
};

export default users;
