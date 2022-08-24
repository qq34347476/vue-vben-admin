/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-23 17:20:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-24 18:09:44
 * @FilePath: \knowledge-web\mock\biz\classify.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';
import { mock } from 'mockjs';

const classifyTreeData = mock([
  {
    classifyName: '全部分类',
    title: '全部分类',
    id: '@id',
    lv: '0',
    children: [
      {
        classifyName: '知识页面',
        title: '知识页面',
        id: '@id',
        lv: '1',
        children: [
          {
            classifyName: '业务知识',
            title: '业务知识',
            id: '@id',
            lv: '2',
            upClassify: '知识页面',
          },
          {
            classifyName: '医保政策',
            title: '医保政策',
            id: '@id',
            lv: '2',
            upClassify: '知识页面',
          },
          {
            classifyName: '默认分类',
            title: '默认分类',
            id: '@id',
            lv: '2',
            upClassify: '知识页面',
          },
        ],
      },
      {
        classifyName: '知识问答',
        title: '知识问答',
        id: '@id',
        lv: '1',
        children: [
          {
            classifyName: '业务知识',
            title: '业务知识',
            id: '@id',
            lv: '2',
            upClassify: '知识问答',
          },
          {
            classifyName: '医保政策',
            title: '医保政策',
            id: '@id',
            lv: '2',
            upClassify: '知识问答',
          },
          {
            classifyName: '默认分类',
            title: '默认分类',
            id: '@id',
            lv: '2',
            upClassify: '知识问答',
          },
        ],
      },
    ],
  },
]);
export default [
  {
    url: '/basic-api/classify/tree/list',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(classifyTreeData);
    },
  },
  {
    url: '/basic-api/classify/list',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(
        mock({
          'records|20': [
            {
              id: '@id',
              classifyName: '@ctitle(3,10)',
              'upClassify|1': ['页面分类', '知识问答'],
              createTime: '@date',
              updateTime: '@date',
            },
          ],
        }).records,
      );
    },
  },
  {
    url: '/basic-api/classify/detail',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(
        mock({
          id: '@id',
          classifyName: '@ctitle(3,10)',
          'upClassify|1': ['页面分类', '知识问答'],
          createTime: '@date',
          updateTime: '@date',
          memo: '@ctitle(10,50)',
        }),
      );
    },
  },
] as MockMethod[];
