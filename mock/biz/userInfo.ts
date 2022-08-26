/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-23 17:20:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-26 13:56:11
 * @FilePath: \knowledge-web\mock\biz\classify.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';
import { mock } from 'mockjs';

export default [
  {
    url: '/basic-api/user/contribution',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(
        mock({
          knowledgeCount: '@integer(0, 30)',
          pageCount: '@integer(0, 30)',
          questionCount: '@integer(0, 30)',
        }),
      );
    },
  },
] as MockMethod[];
