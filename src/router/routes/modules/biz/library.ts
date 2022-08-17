/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 14:16:03
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-19 17:57:54
 * @FilePath: \knowledge-web\src\router\routes\modules\biz\library.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const library: AppRouteModule = {
  path: '/library',
  name: 'Library',
  component: LAYOUT,
  redirect: '/library/knowledge',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '知识库',
  },
  children: [
    {
      path: 'knowledge',
      name: 'Knowledge',
      redirect: '/library/knowledge/effective',
      component: LAYOUT,
      children: [
        {
          path: 'effective',
          name: 'Effective',
          component: () => import('/@/views/biz/library/knowledgeBase/index.vue'),
          meta: {
            // affix: true,
            title: '有效知识库',
          },
          props: { type: 'effective' },
        },
        {
          path: 'file',
          name: 'File',
          component: () => import('/@/views/biz/library/knowledgeBase/index.vue'),
          meta: {
            // affix: true,
            title: '归档知识库',
          },
          props: { type: 'file' },
        },
        {
          path: 'recycleBin',
          name: 'RecycleBin',
          component: () => import('/@/views/biz/library/knowledgeBase/index.vue'),
          meta: {
            // affix: true,
            title: '知识库回收站',
          },
          props: { type: 'recycleBin' },
        },
      ],
      meta: {
        // affix: true,
        title: '知识库管理',
      },
    },
    {
      path: 'page',
      name: 'Page',
      component: () => import('/@/views/biz/library/page/index.vue'),
      meta: {
        // affix: true,
        title: '页面审核',
      },
    },
    {
      path: 'model',
      name: 'Model',
      component: () => import('/@/views/biz/library/model/index.vue'),
      meta: {
        // affix: true,
        title: '模板管理',
      },
    },
    {
      path: 'tag',
      name: 'Tag',
      component: () => import('/@/views/biz/library/tag/index.vue'),
      meta: {
        // affix: true,
        title: '标签管理',
      },
    },
  ],
};

export default library;
