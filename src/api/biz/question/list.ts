/*
 * @LastEditTime: 2022-08-30 17:53:29
 * @Description:问答中心
 */
import { forumHttp, systemHttp } from '/@/utils/http/axios';
import { BasicFetchResult, BasicPageParams } from '../../model/baseModel';
import {
  CateListItem,
  CommentSaveParams,
  GetQuestionListParams,
  QuestionListItem,
  QuestionSaveParams,
} from './model/listModel';

enum Api {
  QUESTION_LIST = '/forum-theme/find-by-condition-to-page',
  QUESTION_BY_ID = '/forum-theme/get-by-id/',
  CATE_LIST = '/cate/find-by-condition-to-page',
  QUESTION_SAVE = '/forum-theme/save',
  COMMENT_SAVE = '/forum-comment/save',
  QUESTION_LIST_MANAGER = '/forum-theme/find-by-condition-to-manager-page',
}

/**
 * @description: 问答列表
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getQuestionListApi = (params: BasicPageParams & Partial<GetQuestionListParams>) =>
  forumHttp.post<BasicFetchResult<QuestionListItem>>({
    url: Api.QUESTION_LIST,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });
/**
 * @description: 问答详情
 * @param {string} params
 * @return {*}
 */
export const getQuestionByIdApi = (params: string) =>
  forumHttp.post<QuestionListItem>({
    url: Api.QUESTION_BY_ID,
    params,
  });
/**
 * @description: 分类列表
 * @param {Partial} params
 * @return {*}
 */
export const getCateListApi = (params: BasicPageParams & Partial<CateListItem>) =>
  systemHttp.post<BasicFetchResult<CateListItem>>({
    url: Api.CATE_LIST,
    params,
  });

/**
 * @description: 发起提问
 * @param {QuestionSaveParams} params
 * @return {*}
 */
export function questionSaveApi(params: QuestionSaveParams) {
  return forumHttp.post(
    {
      url: Api.QUESTION_SAVE,
      params,
    },
    {
      successMessageModel: 'message',
    },
  );
}

/**
 * @description: 写回答
 * @param {CommentSaveParams} params
 * @return {*}
 */
export function commentSaveApi(params: CommentSaveParams) {
  return forumHttp.post(
    {
      url: Api.COMMENT_SAVE,
      params,
    },
    {
      successMessageModel: 'message',
    },
  );
}

/**
 * @description: 问答管理
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getQuestionListManageApi = (
  params: BasicPageParams & Partial<GetQuestionListParams>,
) =>
  forumHttp.post<BasicFetchResult<QuestionListItem>>({
    url: Api.QUESTION_LIST_MANAGER,
    params,
  });
