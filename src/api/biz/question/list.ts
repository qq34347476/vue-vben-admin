/*
 * @LastEditTime: 2022-08-19 15:15:18
 * @Description:问答中心
 */
import { defHttp } from '/@/utils/http/axios';
import { BasicFetchResult, BasicPageParams } from '../../model/baseModel';
import { CateListItem, QuestionListItem } from './model/listModel';

enum Api {
  QUESTION_LIST = '/question/getList',
  CAT_LIST = '/question/getCatList',
}

/**
 * @description: 问答列表
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getQuestionListApi = (params: BasicPageParams & Partial<QuestionListItem>) =>
  defHttp.get<BasicFetchResult<QuestionListItem>>({
    url: Api.QUESTION_LIST,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });

/**
 * @description: 分类列表
 * @param {Partial} params
 * @return {*}
 */
export const getCateListApi = (params: Partial<CateListItem>) =>
  defHttp.get<CateListItem[]>({
    url: Api.CAT_LIST,
    params,
  });
