/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-20 15:27:32
 * @FilePath: \knowledge-web\src\api\biz\library\knowledge.ts
 * @Description: 知识库管理api
 */
import { systemHttp, custHttp } from '/@/utils/http/axios';
import {
  KnowledgeParams,
  KnowledgeListParams,
  KnowledgeItem,
  GroupItem,
} from './model/knowledgeModel';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

enum Api {
  KNOWLEDGE_LIST = '/space/find-effective-by-condition-to-page',
  KNOWLEDEG_SAVE = '/space/save-space',
  GROUP_INFO_list = '/group-info/find-team-list-by-param',
  TEAM_MENBER_LIST = '/group-info/find-team-member-list-by-param',
  KNOWLEDGE_DETAIL = '/space/get-space-detail-and-auth/',
  KNOWLEDGE_USER_LIST = '/knowledge/user/list',
  KNOWLEDGE_PIGEONHOLE_BY_ID = '/space/pigeonhole-by-id/',
  KNOWLEDGE_PIGEONHOLE_LIST = '/space/find-pigeonhole-by-condition-to-page',
}

/**
 * @description: 有效知识库列表
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getKnowledgeListDataApi = (params: BasicPageParams & KnowledgeListParams) =>
  systemHttp.post<BasicFetchResult<KnowledgeItem>>({
    url: Api.KNOWLEDGE_LIST,
    params,
  });
/**
 * @description: 保存知识库
 * @param {BasicPageParams} params
 * @return {*}
 */
export const knowledgeSaveApi = (params: BasicPageParams & KnowledgeListParams) =>
  systemHttp.post(
    {
      url: Api.KNOWLEDEG_SAVE,
      params,
    },
    {
      successMessageModel: 'message',
    },
  );
/**
 * @description: 分组列表
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getGroupInfoListApi = (params: BasicPageParams & Partial<{ grpName: string }>) =>
  custHttp.post<BasicFetchResult<GroupItem>>({
    url: Api.GROUP_INFO_list,
    params,
  });
/**
 * @description: 分组成员列表
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getTeamMenberListApi = (params: BasicPageParams & Partial<{ userName: string }>) =>
  custHttp.post<BasicFetchResult<GroupItem>>({
    url: Api.TEAM_MENBER_LIST,
    params,
  });
/**
 * @description: 知识库详情
 * @param {KnowledgeParams} params
 * @return {*}
 */
export const getKnowledgeDetailApi = (params: string) =>
  systemHttp.get<KnowledgeItem>({
    url: Api.KNOWLEDGE_DETAIL,
    params,
  });

/**
 * @description: 知识库用户列表
 * @param {KnowledgeParams} params
 * @return {*}
 */
export const getKnowledgeUserListData = (params: KnowledgeParams) =>
  systemHttp.post<KnowledgeParams>({ url: Api.KNOWLEDGE_USER_LIST, params });

/**
 * @description: 归档/回收
 * @param {KnowledgeParams} params
 * @return {*}
 */
export const knowledgePigeonholeApi = (params: string) =>
  systemHttp.post(
    { url: Api.KNOWLEDGE_PIGEONHOLE_BY_ID, params },
    {
      successMessageModel: 'message',
    },
  );
