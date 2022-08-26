/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-25 16:44:10
 * @FilePath: \knowledge-web\src\api\biz\library\knowledge.ts
 * @Description: 草稿箱api
 */
import { defHttp } from '/@/utils/http/axios';
enum Api {
  USER_DRAFTS_LIST = '/user/drafts/list',
}

/**
 * @description: 分类树数据
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getUserDraftsList = () => defHttp.post({ url: Api.USER_DRAFTS_LIST });
