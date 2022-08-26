import { defHttp } from '/@/utils/http/axios';
import { DemoParams, DemoListGetResultModel, DemoListItem } from './model/tableModel';

enum Api {
  DEMO_LIST = '/table/getDemoList',
  DEMO_DETAIL = '/table/getDetail',
}

/**
 * @description: Get sample list value
 */

export const demoListApi = (params: DemoParams) =>
  defHttp.get<DemoListGetResultModel>({
    url: Api.DEMO_LIST,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });

export const demoDetailApi = (params: Partial<DemoListItem>) =>
  defHttp.get<DemoListItem>({
    url: Api.DEMO_DETAIL,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });
