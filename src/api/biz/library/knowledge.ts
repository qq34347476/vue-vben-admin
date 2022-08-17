/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-22 11:40:38
 * @FilePath: \knowledge-web\src\api\biz\library\knowledge.ts
 * @Description: 知识库管理api
 */
import { defHttp } from '/@/utils/http/axios';
import { KnowledgeParams, KnowledgeListParams, KnowledgeItem } from './model/knowledgeModel';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  KNOWLEDGE_LIST = '/knowledge/list',
  KNOWLEDGE_DETAIL = '/knowledge/detail',
  KNOWLEDGE_USER_LIST = '/knowledge/user/list',
}

/**
 * @description: 有效知识库列表
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getKnowledgeListData = (params: BasicPageParams & KnowledgeListParams) =>
  defHttp.post<BasicFetchResult<KnowledgeItem>>({ url: Api.KNOWLEDGE_LIST, params });
/**
 * @description: 知识库详情
 * @param {KnowledgeParams} data
 * @return {*}
 */
export const getKnowledgeDetailData = (data: KnowledgeParams) =>
  defHttp.post<KnowledgeItem>({ url: Api.KNOWLEDGE_DETAIL, data });

/**
 * @description: 知识库用户列表
 * @param {KnowledgeParams} data
 * @return {*}
 */
export const getKnowledgeUserListData = (data: KnowledgeParams) =>
  defHttp.post<KnowledgeParams>({ url: Api.KNOWLEDGE_USER_LIST, data });
