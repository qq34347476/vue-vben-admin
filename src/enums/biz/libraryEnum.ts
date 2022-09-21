/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-19 18:01:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-21 18:07:27
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

// page type  1文件夹  2草稿页面  3审核  4发布页面
export enum PageTypeEnum {
  FILE = '1',
  DRAFT = '2',
  AUDIT = '3',
  RELEASE = '4',
}
// 新增页面
// correspondSort?: '1' | '0'; //'1'; //1表示上，0表示下
export enum CorrespondSortEnum {
  UP = '1',
  DOWN = '0',
}
