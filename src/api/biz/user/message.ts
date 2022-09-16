/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-15 16:46:16
 * @FilePath: \knowledge-web\src\api\biz\library\knowledge.ts
 * @Description: 我的消息api
 */
import { custHttp } from '/@/utils/http/axios';
import { BasicFetchResult, BasicPageParams } from '../../model/baseModel';
import { MessageListItem, MessageParams } from './model/messageModel';

enum Api {
  USER_MESSAGE_LIST = '/cust/query-user-page-message/',
}

/**
 * @description: 消息列表
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getUserMessageList = (params: BasicPageParams & MessageParams) =>
  custHttp.post<BasicFetchResult<MessageListItem>>({
    url: Api.USER_MESSAGE_LIST,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });
