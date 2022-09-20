/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-15 16:27:28
 * @FilePath: \knowledge-web\src\api\biz\library\knowledge.ts
 * @Description: 草稿箱api
 */
import { knowledgeHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '../../model/baseModel';
import { DraftItem } from './model/draftsModel';

enum Api {
  TEMPORARY_STORAGE_TO_PAGE = '/page/find-temporary-storage-to-page',
}

/**
 * @description: 草稿列表
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getUserDraftsListApi = (params: BasicPageParams & Partial<{ pageCode: string }>) =>
  knowledgeHttp.post<BasicFetchResult<DraftItem[]>>({ url: Api.TEMPORARY_STORAGE_TO_PAGE, params });
