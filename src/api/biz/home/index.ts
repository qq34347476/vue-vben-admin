/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-26 18:18:10
 * @FilePath: \knowledge-web\src\api\biz\library\knowledge.ts
 * @Description: 个人信息api
 */
import { defHttp } from '/@/utils/http/axios';
import { UserContribution, HomeUpdateItem, HomeContributionItem } from './model/indexModel';
enum Api {
  USER_CONTRIBUTION = '/user/contribution',
  HOME_UPDATE = '/home/update',
  HOME_VISIT = '/home/visit',
  HOME_CONTRIBUTION = '/home/contribution',
}

/**
 * @description: 个人贡献
 * @return {*}
 */
export const getUserContribution = () =>
  defHttp.post<UserContribution>({ url: Api.USER_CONTRIBUTION });
/**
 * @description: 最近更新
 * @return {*}
 */
export const getHomeUpdate = () => defHttp.post<HomeUpdateItem[]>({ url: Api.HOME_UPDATE });
/**
 * @description: 最近访问
 * @return {*}
 */
export const getHomeVisit = () => defHttp.post<HomeUpdateItem[]>({ url: Api.HOME_VISIT });
/**
 * @description: 贡献排行
 * @return {*}
 */
export const getHomeContribution = () =>
  defHttp.post<HomeContributionItem[]>({ url: Api.HOME_CONTRIBUTION });
