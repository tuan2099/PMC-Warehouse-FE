// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Báo Cáo Tổng',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Báo cáo kho',
      type: 'item',
      url: '/',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'resident',
      title: 'Ý kiến cư dân',
      type: 'item',
      url: '/resident',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
