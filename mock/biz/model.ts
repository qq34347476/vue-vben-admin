/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 09:51:33
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-23 17:20:21
 * @FilePath: \knowledge-web\mock\biz\knowledge.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';
import Mock from 'mockjs';

const modelListData = Mock.mock({
  'records|12': [
    {
      modelName: '@ctitle(3,40)',
      'modelState|1': ['0', '1'],
      'createPsn|1': ['张三', '李四'],
      createPsn: '李四',
      createTime: '@date',
      updatePsn: '@cname()',
      updateTime: '@date',
    },
  ],
});
export default [
  {
    url: '/basic-api/model/list',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(modelListData);
    },
  },
] as MockMethod[];
