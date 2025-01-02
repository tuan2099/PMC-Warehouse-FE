/* eslint-disable prettier/prettier */
import {
  IconKey,
  IconUserBolt,
  IconBuildingWarehouse,
  IconBrandProducthunt,
  IconArrowAutofitRight,
  IconArrowAutofitLeft,
  IconBuildingLighthouse, IconArrowsExchange, IconLockAccess
} from '@tabler/icons-react';
// import PeopleIcon from '@mui/icons-material/People';
const icons = {
  IconKey,
  IconUserBolt,
  IconBuildingWarehouse,
  IconBrandProducthunt,
  IconArrowAutofitRight,
  IconArrowAutofitLeft,
  IconBuildingLighthouse,
  IconArrowsExchange,
  IconLockAccess
};

const users = {
  id: 'pages',
  title: 'Quản lý người dùng',
  caption: 'Quản lý người dùng',
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
      id: 'Permissions',
      title: 'Quản lý quyền hạn',
      type: 'item',
      url: '/permissions',
      icon: icons.IconLockAccess
    }
  ]
};

export default users;
