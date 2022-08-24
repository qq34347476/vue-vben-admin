/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 14:16:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-24 11:43:09
 * @FilePath: \knowledge-web\src\router\routes\modules\biz\library.ts
 * @Description: 系统管理路由
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/classify',
  meta: {
    orderNo: 50,
    // icon: 'ion:grid-outline',
    title: '系统管理',
  },
  children: [
    {
      path: 'classify',
      name: 'Classify',
      component: () => import('/@/views/biz/system/classify/index.vue'),
      meta: {
        // affix: true,
        title: '分类管理',
      },
    },
  ],
};

export default system;
