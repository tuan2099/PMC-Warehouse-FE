import { IconKey } from '@tabler/icons-react';

const icons = {
  IconKey
};

const users = {
  id: 'pages',
  title: 'a hih i',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Default',
      type: 'item',
      url: '/users',
      icon: icons.IconKey,
      breadcrumbs: false
    }
  ]
};

export default users;
