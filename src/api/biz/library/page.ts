/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-23 10:00:50
 * @FilePath: \knowledge-web\src\api\biz\library\knowledge.ts
 * @Description: 页面审核api
 */
import { defHttp } from '/@/utils/http/axios';
import { KnowledgeListParams, KnowledgeItem } from './model/knowledgeModel';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  PAGE_REVIEW_LIST = '/page/review/list',
  PAGE_CLASSIFY_LIST = '/page/classify/list',
}

/**
 * @description: 有效知识库列表
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getPageReviewListData = (params: BasicPageParams & KnowledgeListParams) =>
  defHttp.post<BasicFetchResult<KnowledgeItem>>({ url: Api.PAGE_REVIEW_LIST, params });

export const getPageClassifyListData = () =>
  defHttp.post<BasicFetchResult<KnowledgeItem>>({ url: Api.PAGE_CLASSIFY_LIST });
