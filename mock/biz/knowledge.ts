/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 09:51:33
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-16 18:11:07
 * @FilePath: \knowledge-web\mock\biz\knowledge.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';
const knowledgeListData = {
  items: [
    {
      id: '123456',
      knowName: '知识库一',
      pageNum: '5',
      knowAdmin: '管理员1',
      switch: '0',
      collection: '1',
      memo: '知识库描述',
      createPsn: '李四',
      createTime: '2022-08-16',
      updatePsn: '李四',
      updateTime: '2022-08-16',
    },
    {
      id: '654321',
      knowName: '知识库二按时发发发秩序册是的撒大V暗示法秩序张旭升大V',
      pageNum: '3',
      knowAdmin: '管理员2',
      switch: '1',
      collection: '0',
      memo: '知识库描述算大防守打法发送至是许三多VS 阿斯顿发所大所大所多',
      createPsn: '李四',
      createTime: '2022-08-16',
      updatePsn: '李四',
      updateTime: '2022-08-16',
    },
  ],
};
const detailData = {
  knowName: '内部资料库',
  knowMark: 'NBZLK',
  createPsn: '张三',
  createTime: '2022-05-05',
  updatePsn: '李四',
  updateTime: '2022-05-05',
  knowAdmin: '王五',
  switch: '1',
  add: '1',
  edit: '0',
  memo: '知识库描述',
};
const userListData = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      group: '分组一',
      userId: 'zhangsan' + index,
      userName: '张三' + index,
    });
  }
  return result;
})();
export default [
  {
    url: '/basic-api/knowledge/list',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(knowledgeListData);
    },
  },
  {
    url: '/basic-api/knowledge/detail',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(detailData);
    },
  },
  {
    url: '/basic-api/knowledge/user/list',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(userListData);
    },
  },
] as MockMethod[];
