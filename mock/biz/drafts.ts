/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-23 17:20:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-25 15:51:32
 * @FilePath: \knowledge-web\mock\biz\classify.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';
import { mock } from 'mockjs';

export default [
  {
    url: '/basic-api/user/drafts/list',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(
        mock({
          'records|20': [
            {
              id: '@id',
              pageName: '@ctitle(3,10)',
              knowName: '@ctitle(3,10)',
              saveTime: '@date',
            },
          ],
        }).records,
      );
    },
  },
] as MockMethod[];
