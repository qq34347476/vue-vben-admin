/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 14:16:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-27 15:28:16
 * @FilePath: \knowledge-web\src\router\routes\modules\biz\library.ts
 * @Description: 知识库路由
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
    // icon: 'ion:grid-outline',
    title: '知识库',
  },
  children: [
    {
      path: 'pageManage/:id',
      name: 'PageManage',
      component: () => import('/@/views/biz/library/pageManage/index.vue'),
      props: true,
      meta: {
        title: '页面管理',
        hideMenu: true,
      },
    },
    {
      path: 'pageEdit/:spaceId/:pageId',
      name: 'PageEdit',
      component: () => import('/@/views/biz/library/pageManage/edit/index.vue'),
      props: true,
      meta: {
        title: '编辑页面',
        hideMenu: true,
      },
    },
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
