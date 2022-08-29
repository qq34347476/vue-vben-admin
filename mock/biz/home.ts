/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-23 17:20:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-29 09:50:30
 * @FilePath: \knowledge-web\mock\biz\classify.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';
import { mock } from 'mockjs';

export default [
  {
    url: '/basic-api/home/update',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(
        mock({
          'items|5': [
            {
              id: '@id',
              pageName: '@ctitle(10,20)',
              time: '@date',
            },
          ],
        }).items,
      );
    },
  },
  {
    url: '/basic-api/home/visit',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(
        mock({
          'items|5': [
            {
              id: '@id',
              pageName: '@ctitle(5,10)',
            },
          ],
        }).items,
      );
    },
  },
  {
    url: '/basic-api/home/contribution',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(
        mock({
          'items|5': [
            {
              id: '@id',
              userName: '@cname',
              'department|1': ['产品部', '研发部', '行政部'],
              count: '@integer(10, 150)',
            },
          ],
        }).items,
      );
    },
  },
] as MockMethod[];
