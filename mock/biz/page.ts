/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 09:51:33
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-23 17:20:11
 * @FilePath: \knowledge-web\mock\biz\knowledge.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';
import Mock from 'mockjs';

const pegeListData = Mock.mock({
  'records|12': [
    {
      id: '@id',
      pageName: '@ctitle(3,40)',
      knowledgeName: '@ctitle(3,40)',
      'pageClassify|1': ['0', '1', '2', '3'],
      'reviewState|1': ['审核通过', '审核驳回'],
      'modelState|1': ['0', '1'],
      'reviewType|1': ['新增', '编辑'],
      'createPsn|1': ['张三', '李四'],
      createPsn: '李四',
      createTime: '@date',
      updatePsn: '@cname()',
      updateTime: '@date',
      reviewPsn: '@cname()',
      reviewTime: '@date',
      memo: '@ctitle(3,40)',
    },
  ],
});

const pageClassifyList = Mock.mock([
  {
    value: '0',
    label: '医保政策',
    type: '@hex()',
  },
  {
    value: '1',
    label: '部门材料',
    type: '@hex()',
  },
  {
    value: '2',
    label: '产品介绍',
    type: '@hex()',
  },
  {
    value: '3',
    label: '业务知识',
    type: '@hex()',
  },
]);
export default [
  {
    url: '/basic-api/page/review/list',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(pegeListData);
    },
  },
  {
    url: '/basic-api/page/classify/list',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(pageClassifyList);
    },
  },
] as MockMethod[];
