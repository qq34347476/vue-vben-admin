import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const about: AppRouteModule = {
  path: '/question',
  name: 'Question',
  component: LAYOUT,
  redirect: '/question/list',
  meta: {
    // hideChildrenInMenu: true,
    // icon: 'simple-icons:about-dot-me',
    title: '知识问答',
    orderNo: 40,
  },
  children: [
    {
      path: 'list',
      name: 'QuestionList',
      component: () => import('/@/views/biz/question/list/index.vue'),
      meta: {
        title: '知识问答',
        hideMenu: true,
      },
    },
    {
      path: 'ask',
      name: 'QuestionAsk',
      component: () => import('/@/views/biz/question/ask/index.vue'),
      meta: {
        title: '发起提问',
        hideMenu: true,
      },
    },
    {
      path: 'detail/:id',
      name: 'QuestionDetail',
      component: () => import('/@/views/biz/question/detail/index.vue'),
      props: true,
      meta: {
        title: '问答详情',
        hideMenu: true,
      },
    },
    {
      path: 'manage',
      name: 'QuestionManage',
      component: () => import('/@/views/examples/page/index.vue'),
      meta: {
        title: '问答管理',
      },
    },
    {
      path: 'audit',
      name: 'QuestionAudit',
      component: () => import('/@/views/biz/question/list/index.vue'),
      meta: {
        title: '问答审核',
      },
    },
  ],
};

export default about;
