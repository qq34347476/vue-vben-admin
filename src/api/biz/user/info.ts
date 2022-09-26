/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-26 14:38:34
 * @FilePath: \knowledge-web\src\api\biz\library\knowledge.ts
 * @Description: 个人信息api
 */
import { custHttp } from '/@/utils/http/axios';
// import type { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
import { UploadParams, UserContribution, UserInfo, UploadHeadResult } from './model/infoModel';
enum Api {
  USER_INFO = '/cust/query-user-basic-info/',
  USER_UPLOAD_AVATAR = '/user/upload/avatar',
  USER_CONTRIBUTION = '/cust/query-user-contribution/',
  UPLOAD_USER_HEAD_PORTRAIT = '/cust/up-load-user-head-portrait',
}

/**
 * @description: 分类列表
 * @return {*}
 */
export const getUserInfoApi = (params: string) =>
  custHttp.post<UserInfo>({ url: Api.USER_INFO, params });
/**
 * @description: 上传头像
 * @param {BasicPageParams} params
 * @return {*}
 */
export const uploadAvatar = (
  params: UploadParams,
  // onUploadProgress: (progressEvent: ProgressEvent) => void,
) =>
  custHttp.uploadFile<UploadHeadResult>(
    { url: 'http://10.16.253.98:8096/knowledge/cust' + Api.UPLOAD_USER_HEAD_PORTRAIT },
    params,
  );

/**
 * @description: 个人贡献
 * @return {*}
 */
export const getUserContribution = (params: string) =>
  custHttp.post<UserContribution>({ url: Api.USER_CONTRIBUTION, params });
