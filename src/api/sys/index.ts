/*
 * @LastEditTime: 2022-08-30 09:29:46
 * @Description:
 */
import { systemHttp } from '/@/utils/http/axios';
import { GetDictCodeListParams, GetDictCodeListResult } from './model/index';

enum Api {
  DICT_CODE_LIST = '/dict/find-by-param',
}

/**
 * @description: 获取数据字典
 * @Date: 2020-09-01 10:46:30
 */
export const getDictCodeListApi = (params: GetDictCodeListParams) =>
  systemHttp.post<GetDictCodeListResult[]>({
    url: Api.DICT_CODE_LIST,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });
