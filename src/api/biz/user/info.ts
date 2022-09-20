/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-15 15:06:48
 * @FilePath: \knowledge-web\src\api\biz\library\knowledge.ts
 * @Description: 个人信息api
 */
import { custHttp } from '/@/utils/http/axios';
// import type { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
import { UploadParams, UserContribution, UserInfo } from './model/infoModel';
enum Api {
  USER_INFO = '/cust/query-user-basic-info/',
  USER_UPLOAD_AVATAR = '/user/upload/avatar',
  USER_CONTRIBUTION = '/cust/query-user-contribution/',
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
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) => custHttp.uploadFile<any>({ url: Api.USER_UPLOAD_AVATAR, onUploadProgress }, params);

/**
 * @description: 个人贡献
 * @return {*}
 */
export const getUserContribution = (params: string) =>
  custHttp.post<UserContribution>({ url: Api.USER_CONTRIBUTION, params });
