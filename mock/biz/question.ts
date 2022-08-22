import { MockMethod } from 'vite-plugin-mock';
import { mock, Random } from 'mockjs';
import { resultPageSuccess, resultSuccess } from '../_util';

const demoList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 200; index++) {
    result.push({
      id: `${index}`,
      time: '@datetime',
      address: '@city()',
      name: '@cname()',
      title: '@ctitle(10,100)',
      content: '@cparagraph(1,10)',
      look: '@integer(0,100)',
      answerCount: '@integer(0,100)',
      'cateName|1': ['医保政策', '业务知识', '产品介绍'],
      'status|1': ['normal', 'enable', 'disable'],
      avatar: Random.image('100x100', Random.color(), Random.color(), Random.first()),
    });
  }
  return result;
})();

export default [
  {
    url: '/basic-api/question/getList',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, demoList);
    },
  },
  {
    url: '/basic-api/question/getCatList',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(
        mock({
          'items|20': [
            {
              id: '@id',
              cateName: '@ctitle(3,10)',
            },
          ],
        }).items,
      );
    },
  },
] as MockMethod[];
