import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const about: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/index',
  meta: {
    hideChildrenInMenu: true,
    // icon: 'simple-icons:about-dot-me',
    title: '知识门户',
    orderNo: 1,
  },
  children: [
    {
      path: 'index',
      name: 'HomePage',
      component: () => import('/@/views/biz/home/index.vue'),
      meta: {
        title: '知识门户',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default about;
