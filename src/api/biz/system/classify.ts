/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-24 18:08:27
 * @FilePath: \knowledge-web\src\api\biz\library\knowledge.ts
 * @Description: 分类管理api
 */
import { defHttp } from '/@/utils/http/axios';
import type { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
enum Api {
  CLASSIFY_TREE_LIST = '/classify/tree/list',
  CLASSIFY_LIST = '/classify/list',
  CLASSIFY_DETAIL = '/classify/detail',
}

/**
 * @description: 分类树数据
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getClassifyTreeList = () =>
  defHttp.post<TreeDataItem[]>({ url: Api.CLASSIFY_TREE_LIST });

/**
 * @description: 分类列表
 * @return {*}
 */
export const getClassifyList = () => defHttp.post<TreeDataItem[]>({ url: Api.CLASSIFY_LIST });
/**
 * @description: 分类详情
 * @return {*}
 */
export const getClassifyDetail = (params) =>
  defHttp.post<TreeDataItem[]>({ url: Api.CLASSIFY_DETAIL }, params);
