import {
  IconMoodHappy
} from "@tabler/icons-react";

const icons = {
  IconMoodHappy
};

const microsoftServices = {
  id: 'microsoft',
  title: 'Ý kiến cư dân',
  caption: '',
  type: 'group',
  children: [
    {
      id: 'Issue',
      title: 'Nhập ý kiến sự vụ',
      type: 'item',
      url: '/issue',
      icon: icons.IconMoodHappy
    },
    {
      id: 'Incident',
      title: 'Nhập ý kiến Sự cố',
      type: 'item',
      url: '/incident',
      icon: icons.IconMoodHappy
    }
  ]
};

export default microsoftServices;
