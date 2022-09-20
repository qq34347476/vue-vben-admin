/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-20 15:48:51
 * @FilePath: \knowledge-web\src\api\biz\library\knowledge.ts
 * @Description: 知识库管理api
 */
import { systemHttp } from '/@/utils/http/axios';
import { KnowledgeListParams, KnowledgeItem } from './model/knowledgeModel';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  KNOWLEDGE_RECYCLE_LIST = '/space/find-recycle-by-condition-to-page',
  KNOWLEDGE_PERPETUAL_DELETE_BY_IDS = '/space/perpetual-delete-by-ids',
}

/**
 * @description: 回收站知识库列表
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getRecycleKnowledgeListApi = (params: BasicPageParams & KnowledgeListParams) =>
  systemHttp.post<BasicFetchResult<KnowledgeItem>>({
    url: Api.KNOWLEDGE_RECYCLE_LIST,
    params,
  });

/**
 * @description: 永久删除
 * @param {string} params
 * @return {*}
 */
export const knowledgePerpetualDeleteApi = (params: string[]) =>
  systemHttp.post(
    { url: Api.KNOWLEDGE_PERPETUAL_DELETE_BY_IDS, params },
    {
      successMessageModel: 'message',
    },
  );
