/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-22 14:25:50
 * @FilePath: \knowledge-web\src\api\biz\library\knowledge.ts
 * @Description: 模板管理api
 */
import { defHttp } from '/@/utils/http/axios';
import { KnowledgeListParams, KnowledgeItem } from './model/knowledgeModel';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  Model_LIST = '/model/list',
}

/**
 * @description: 有效知识库列表
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getModelListData = (params: BasicPageParams & KnowledgeListParams) =>
  defHttp.post<BasicFetchResult<KnowledgeItem>>({ url: Api.Model_LIST, params });
