/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-23 17:20:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-26 10:39:49
 * @FilePath: \knowledge-web\mock\biz\classify.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess } from '../_util';
import { mock } from 'mockjs';

export default [
  {
    url: '/basic-api/user/message/list',
    timeout: 200,
    method: 'post',
    response: ({ query }) => {
      const { page = 1, pageSize = 20, type = '' } = query;
      const messageList = mock({
        'records|200': [
          {
            id: '@id',
            userName: '@cname()',
            'type|1': type ? [type] : ['about', 'answer'],
            time: '@date',
            questionName: '@ctitle(3,10)',
            pageName: '@ctitle(3,10)',
          },
        ],
      }).records;
      return resultPageSuccess(page, pageSize, messageList);
    },
  },
] as MockMethod[];
