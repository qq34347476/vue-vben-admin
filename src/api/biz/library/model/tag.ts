/*
 * @LastEditTime: 2022-09-23 10:04:07
 * @Description:
 */
export interface TagItem {
  tageId: string; //  '1';
  tageName: string; //  '业务培训';
  tageCode: string; //  'yewupeixun';
  tageType: number;
  tageCount: number;
  updtTime: string; //  '2022-09-05 13: string; // 55: string; // 46';
  opterId: string; //  null;
  spaceId: string; //  '2';
  crter: string; //  'hhh';
  crteTime: string; //  '2022-09-05 10:45:39';
  crterId: string; //  '7da3eed7f74a4d93889c4aa166bea7d1';
}

export interface SaveTagParams {
  tageName: string;
  tagColor: string;
}

export interface TagDetail {
  tageId: '2';
  tageName: '内部资料';
  tageType: '2';
  pageCount: 0;
  tagPageList: TagDetailPageItem[];
}

export interface TagDetailPageItem {
  objId: string; // 页面id
  pageName: string; // 页面名称
  crterId: string; // 创建人id
  crter: string; // 创建人姓名
  crteTime: string; // 创建时间
  spaceId: string; // 知识库id
  spaceName: string; // 知识库名称
}
