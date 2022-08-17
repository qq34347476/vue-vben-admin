/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-19 18:01:16
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-22 17:24:15
 * @FilePath: \knowledge-web\src\enums\libraryEnum.ts
 * @Description: 知识库enum
 */
import { ColorTypeEnum } from './indexEnum';
export enum ModelState {
  enable = '1',
  deactivate = '0',
}

export const ModelStateList = [
  {
    value: ModelState.enable,
    label: '启用',
    type: ColorTypeEnum.success,
  },
  {
    value: ModelState.deactivate,
    label: '停用',
    type: ColorTypeEnum.error,
  },
];

export enum ReviewState {
  reviewed = '已审核',
  unaudited = '待审核',
  reviewPass = '审核通过',
  reviewFail = '审核驳回',
}
export const ReviewStateList = [
  {
    value: ReviewState.reviewPass,
    label: '审核通过',
    type: ColorTypeEnum.success,
  },
  {
    value: ReviewState.reviewFail,
    label: '审核驳回',
    type: ColorTypeEnum.error,
  },
];
