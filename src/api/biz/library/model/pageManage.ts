import { CorrespondSortEnum, PageTypeEnum } from '/@/enums/biz/libraryEnum';
export interface PageRecyclingPublicItem {
  pageId: string; // '158aec975ff141c287d8290489663e7c';
  pageCode: string; // null;
  pageTitle: string; // '重命名';
  pageType: string; // '2';
  parentId: string; // 'a15663e93e384575a291c10a01c4912e';
  externalUrl: string; // '/p/158aec975ff141c287d8290489663e7c';
}
export interface PageTreeItem extends PageRecyclingPublicItem {
  level: number; // 0,
  children: PageTreeItem[]; // [],
}

export interface CreateNodeEditPageParams {
  pageTitle: string; // "原型版本",
  parentId?: string; // "2",
  sort?: string; // "2",
  pageType: PageTypeEnum; // "2",
  spaceId: string; // "2"
  correspondId?: string; //'2';
  correspondSort?: CorrespondSortEnum; //'1'; //1表示上，0表示下
}

export interface PageRecyclingItem extends PageRecyclingPublicItem {
  sort: string; // null;
  stas: number; // 0;
  updtTime: string; // '2022-09-21 15:11:22';
  opterId: string; // '80d618683d984b16828fce316593f847';
  spaceId: string; // '2';
  crter: string; // '蒋琴';
  crteTime: string; // '2022-09-21 14:48:54';
  crterId: string; // '80d618683d984b16828fce316593f847';
  correspondId: string; // null;
  correspondSort: string; // null;
  recoverVersion: string; // null;
  padText: string; // null;
}

export interface MovePageParams {
  pageId: string; // '98a924deb6bb41b786a69ac5cd3be19c';
  parentId: string; //  'ae9804e98a3d444cb1d11c8d240b111f';
  spaceId: string; //  '2';
  correspondId: string; //  '2';
  correspondSort: CorrespondSortEnum; //  '1'; //1表示上，0表示下
}

export interface CopyPageParams {
  pageId: string; // '98a924deb6bb41b786a69ac5cd3be19c';
  parentId: string; //  'ae9804e98a3d444cb1d11c8d240b111f';
  spaceId: string; //  '2';
}
