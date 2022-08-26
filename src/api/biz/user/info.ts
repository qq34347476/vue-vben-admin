/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-26 13:59:26
 * @FilePath: \knowledge-web\src\api\biz\library\knowledge.ts
 * @Description: 个人信息api
 */
import { defHttp } from '/@/utils/http/axios';
import type { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
import { UploadParams, UserContribution } from './model/infoModel';
enum Api {
  USER_UPLOAD_AVATAR = '/user/upload/avatar',
  USER_INFO = '/user/info',
  USER_CONTRIBUTION = '/user/contribution',
}

/**
 * @description: 分类树数据
 * @param {BasicPageParams} params
 * @return {*}
 */
export const uploadAvatar = (
  params: UploadParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) => defHttp.uploadFile<any>({ url: Api.USER_UPLOAD_AVATAR, onUploadProgress }, params);

/**
 * @description: 分类列表
 * @return {*}
 */
export const getUserInfo = () => defHttp.post<TreeDataItem[]>({ url: Api.USER_INFO });
/**
 * @description: 个人贡献
 * @return {*}
 */
export const getUserContribution = () =>
  defHttp.post<UserContribution>({ url: Api.USER_CONTRIBUTION });
