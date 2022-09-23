/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditTime: 2022-09-23 11:30:46
 * @Description: 标签管理api
 */
import { knowledgeHttp } from '/@/utils/http/axios';
import { SaveTagParams, TagItem, TagDetail } from './model/tag';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  KNOWLEDGE_TAG_LIST = '/tag-info/query-tag-by-page',
  KNOWLEDGE_TAG_SAVE = '/tag-info/save',
  KNOWLEDGE_TAG_DETAIL = '/tag-info/query-tag-detail-by-id/',
  KNOWLEDGE_TAG_DELETE = '/tag-info/delete-tag-by-ids',
}

export const getKnowledgeTagListApi = (params: BasicPageParams & Partial<{ tageName: string }>) =>
  knowledgeHttp.post<BasicFetchResult<TagItem[]>>({
    url: Api.KNOWLEDGE_TAG_LIST,
    params,
  });

/**
 * @description: 保存tag
 * @param {BasicPageParams} params
 * @return {*}
 */
export const tagSaveApi = (params: SaveTagParams) =>
  knowledgeHttp.post(
    {
      url: Api.KNOWLEDGE_TAG_SAVE,
      params,
    },
    {
      successMessageModel: 'message',
    },
  );
/**
 * @description: 保存tag
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getTagDetailApi = (params: string) =>
  knowledgeHttp.post<TagDetail>({
    url: Api.KNOWLEDGE_TAG_DETAIL,
    params,
  });

/**
 * @description: 删除tag
 * @param {BasicPageParams} params
 * @return {*}
 */
export const tagDeleteApi = (params: string[]) =>
  knowledgeHttp.post(
    {
      url: Api.KNOWLEDGE_TAG_DELETE,
      params,
    },
    {
      successMessageModel: 'message',
    },
  );
