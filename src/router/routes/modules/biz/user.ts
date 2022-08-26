/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 14:16:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-25 16:09:53
 * @FilePath: \knowledge-web\src\router\routes\modules\biz\library.ts
 * @Description: 系统管理路由
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const user: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/user/info',
  meta: {
    orderNo: 30,
    title: '用户中心',
  },
  children: [
    {
      path: 'info',
      name: 'Info',
      component: () => import('/@/views/biz/user/info/index.vue'),
      meta: {
        // affix: true,
        title: '个人信息',
      },
    },
    {
      path: 'drafts',
      name: 'Drafts',
      component: () => import('/@/views/biz/user/drafts/index.vue'),
      meta: {
        // affix: true,
        title: '草稿箱',
      },
    },
    {
      path: 'message',
      name: 'Message',
      component: () => import('/@/views/biz/user/message/index.vue'),
      meta: {
        // affix: true,
        title: '我的消息',
      },
    },
  ],
};

export default user;
