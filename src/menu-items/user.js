import { IconKey, IconUserBolt, IconBuildingWarehouse } from '@tabler/icons-react';
// import PeopleIcon from '@mui/icons-material/People';
const icons = {
  IconKey,
  IconUserBolt,
  IconBuildingWarehouse
};

const users = {
  id: 'pages',
  title: 'Quản lý kho',
  caption: 'Pages Caption',
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
      icon: icons.IconBuildingWarehouse,
      breadcrumbs: false
    },
    {
      id: 'Warehouse-dispatch',
      title: 'Xuất kho',
      type: 'item',
      url: '/warehouse-dispatch',
      icon: icons.IconBuildingWarehouse,
      breadcrumbs: false
    }
  ]
};

export default users;
