/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-20 15:40:36
 * @FilePath: \knowledge-web\src\api\biz\library\knowledge.ts
 * @Description: 知识库管理api
 */
import { systemHttp } from '/@/utils/http/axios';
import { KnowledgeListParams, KnowledgeItem } from './model/knowledgeModel';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  KNOWLEDGE_PIGEONHOLE_LIST = '/space/find-pigeonhole-by-condition-to-page',
  KNOWLEDGE_ACTIVE_BY_ID = '/space/active-by-id/',
  KNOWLEDGE_DELETE_BY_ID = '/space/delete-by-id/',
}

/**
 * @description: 归档知识库列表
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getFileKnowledgeListApi = (params: BasicPageParams & KnowledgeListParams) =>
  systemHttp.post<BasicFetchResult<KnowledgeItem>>({
    url: Api.KNOWLEDGE_PIGEONHOLE_LIST,
    params,
  });

/**
 * @description: 激活
 * @param {string} params
 * @return {*}
 */
export const knowledgeActiveApi = (params: string) =>
  systemHttp.post(
    { url: Api.KNOWLEDGE_ACTIVE_BY_ID, params },
    {
      successMessageModel: 'message',
    },
  );

/**
 * @description: 删除
 * @param {string} params
 * @return {*}
 */
export const knowledgeDeleteApi = (params: string) =>
  systemHttp.post(
    { url: Api.KNOWLEDGE_DELETE_BY_ID, params },
    {
      successMessageModel: 'message',
    },
  );
