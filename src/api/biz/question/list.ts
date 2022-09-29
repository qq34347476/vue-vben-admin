/*
 * @LastEditTime: 2022-09-29 09:31:13
 * @Description:问答中心
 */
import { forumHttp, systemHttp } from '/@/utils/http/axios';
import { BasicFetchResult, BasicPageParams } from '../../model/baseModel';
import {
  CateListItem,
  CommentSaveParams,
  ForumCommentDTOItem,
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
  QUESTION_MANAGER_LIST = '/forum-theme/find-by-condition-to-manager-page',
  QUESTION_MANAGER_DEL = '/forum-theme/delete-by-ids',
  QUESTION_MANAGER_HIDE = '/forum-theme/hide/',
  COMMENT_DELETE = '/forum-comment/delete-by-ids',
  COMMENT_LIST = '/forum-comment/find-by-param',
}

/**
 * @description: 问答列表
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getQuestionListApi = (params: Partial<GetQuestionListParams>) =>
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
   * @description: 查看此条问答的所有回答

   * @param {Partial} params
   * @return {*}
   */
export const getCommentListApi = (params: Partial<ForumCommentDTOItem>) =>
  forumHttp.post<ForumCommentDTOItem[]>({
    url: Api.COMMENT_LIST,
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
export const getCateListApi = (params: BasicPageParams & Partial<CateListItem>) =>
  systemHttp.post<BasicFetchResult<CateListItem>>({
    url: Api.CATE_LIST,
    params,
  });
/**
 * @description: 用于远程下拉框ApiSelect
 * @param {BasicPageParams} params
 * @return {*}
 */
export async function getCateListOptionsApi(params: BasicPageParams & Partial<CateListItem>) {
  const { records } = await getCateListApi(params);
  return records.map((item) => {
    return {
      value: item.cateId,
      label: item.cateName,
    };
  });
}
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
export const getQuestionManageListApi = (
  params: BasicPageParams & Partial<GetQuestionListParams>,
) =>
  forumHttp.post<BasicFetchResult<QuestionListItem>>({
    url: Api.QUESTION_MANAGER_LIST,
    params,
  });

/**
 * @description: 问答管理-删除
POST /forum-theme/delete-by-ids
接口ID：36135664
接口地址：https://www.apifox.cn/web/project/1465250/apis/api-36135664
 * @param {string} params
 * @return {*}
 */
export function questionManageDeletesApi(params: string[]) {
  return forumHttp.post(
    {
      url: Api.QUESTION_MANAGER_DEL,
      params,
    },
    {
      successMessageModel: 'message',
    },
  );
}

/**
 * @description: 问答管理-隐藏
POST /forum-theme/hide/{id}
接口ID：36210415
接口地址：https://www.apifox.cn/web/project/1465250/apis/api-36210415
 * @param {string} params
 * @return {*}
 */
export function questionManageHideApi(params: string) {
  return forumHttp.post(
    {
      url: Api.QUESTION_MANAGER_HIDE,
      params,
    },
    {
      successMessageModel: 'message',
    },
  );
}

/**
 * @description: 问答管理-问答详情-删除回复
POST /forum-comment/delete-by-ids
接口ID：36213334
接口地址：https://www.apifox.cn/web/project/1465250/apis/api-36213334
 * @param {string} params
 * @return {*}
 */
export function commentDeletesApi(params: string[]) {
  return forumHttp.post(
    {
      url: Api.COMMENT_DELETE,
      params,
    },
    {
      successMessageModel: 'message',
    },
  );
}
