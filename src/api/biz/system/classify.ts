/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-23 16:55:44
 * @FilePath: \knowledge-web\src\api\biz\library\knowledge.ts
 * @Description: 分类管理api
 */
import { systemHttp } from '/@/utils/http/axios';
import type { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
import { ClassifyTreeItem, ClassifyItem, CateParams } from './model/classifyModel';

enum Api {
  CLASSIFY_TREE_LIST = '/cate/find-tree-by-condition',
  CLASSIFY_LIST = '/cate/find-by-condition-to-page',
  CATE_SAVE = '/cate/save',
  CATE_DELETE = '/cate/delete-by-id/',
}

/**
 * @description: 分类树数据
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getClassifyTreeListApi = () =>
  systemHttp.post<ClassifyTreeItem[]>({ url: Api.CLASSIFY_TREE_LIST });

/**
 * @description: 分类列表
 * @return {*}
 */
export const getClassifyListApi = (params: BasicPageParams & Partial<{ cateName: string }>) =>
  systemHttp.post<BasicFetchResult<ClassifyItem[]>>({ url: Api.CLASSIFY_LIST, params });
/**
 * @description: 新增/编辑分类
 * @return {*}
 */
export const cateSaveApi = (params: CateParams) =>
  systemHttp.post<TreeDataItem[]>(
    { url: Api.CATE_SAVE, params },
    {
      successMessageModel: 'message',
    },
  );

/**
 * @description: 删除分类
 * @param {CateParams} params
 * @return {*}
 */
export const cateDeleteApi = (params: { cateId: string; cateType: number }) =>
  systemHttp.post<TreeDataItem[]>(
    { url: '', params: { cateType: params.cateType } },
    {
      urlPrefix: Api.CATE_DELETE + params.cateId,
      successMessageModel: 'message',
    },
  );
