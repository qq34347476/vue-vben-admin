/*
 * @LastEditTime: 2022-09-22 11:16:18
 * @Description:
 */

export interface ClassifyTreeItem {
  cateCode: null;
  cateConfig: null;
  cateId: '1';
  cateName: '知识页面';
  cateType: 1;
  children: ClassifyItem[];
  descInfo: null;
  prntCateId: '0';
  lv?: string;
  key: string;
  title: string;
}
export interface ClassifyItem {
  cateCode: string; //  'default';
  cateConfig: string; //  null;
  cateId: string; //  '065741ff48e544a7830d5d6a211d9a2f';
  cateName: string; //  '默认分类';
  cateType: string; //  1;
  crteTime: string; //  '2022-08-29 16:08:22';
  crter: string; //  '李健麟';
  crterId: string; //  '9af767783e624d4cb96691459024aa4a';
  descInfo: string; //  '';
  opter: string; //  '李健麟';
  opterId: string; //  '9af767783e624d4cb96691459024aa4a';
  prntCateId: string; //  '1';
  prntCateName: string; //  '1';
  stas: string; //  1;
  updtTime: string; //  '2022-08-29 16:52:53';
  lv?: string;
  key: string;
  title: string;
}

export interface CateParams {
  cateId?: string;
  cateName: string;
  prntCateId: string;
  prntCateName: string;
  descInfo?: string;
  cateConfig: string;
}
