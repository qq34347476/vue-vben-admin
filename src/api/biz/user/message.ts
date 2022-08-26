/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 18:18:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-26 13:51:47
 * @FilePath: \knowledge-web\src\api\biz\library\knowledge.ts
 * @Description: 我的消息api
 */
import { defHttp } from '/@/utils/http/axios';
import { BasicFetchResult, BasicPageParams } from '../../model/baseModel';
import { MessageListItem, MessageParams } from './model/messageModel';

enum Api {
  USER_MESSAGE_LIST = '/user/message/list',
}

/**
 * @description: 消息列表
 * @param {BasicPageParams} params
 * @return {*}
 */
export const getUserMessageList = (params: BasicPageParams & MessageParams) =>
  defHttp.post<BasicFetchResult<MessageListItem>>({
    url: Api.USER_MESSAGE_LIST,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });
