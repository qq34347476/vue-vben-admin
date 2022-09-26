/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-26 17:43:31
 * @FilePath: \knowledge-web\src\api\biz\library\knowledge.ts
 * @Description: 模板管理api
 */
import { knowledgeHttp } from '/@/utils/http/axios';
import { ModelParams, ModelItem } from './model/model';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  MODEL_LIST = '/page-templete/find-by-condition-to-page',
  MODEL_SAVE = '/page-templete/save',
  MODEL_CAHNGE_ABLE = '/page-templete/change-able',
}

/**
 * @description: 模板列表
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getModelListApi = (params: BasicPageParams & Partial<ModelParams>) =>
  knowledgeHttp.post<BasicFetchResult<ModelItem>>({ url: Api.MODEL_LIST, params });

/**
 * @description: 新增模板
 * @param {BasicPageParams} params
 * @return {*}
 */
export const modelSaveApi = (params: Partial<ModelParams>) =>
  knowledgeHttp.post(
    { url: Api.MODEL_SAVE, params },
    {
      successMessageModel: 'message',
    },
  );
/**
 * @description: 新增模板
 * @param {BasicPageParams} params
 * @return {*}
 */
export const modelChangeAbleApi = (params: BasicPageParams & Partial<ModelParams>) =>
  knowledgeHttp.post(
    { url: Api.MODEL_CAHNGE_ABLE, params },
    {
      successMessageModel: 'message',
    },
  );
