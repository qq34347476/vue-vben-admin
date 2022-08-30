export interface GetDictCodeListParams {
  dicTypeCode: string;
}

export interface GetDictCodeListResult {
  dictId: string; // '1';
  dicValCode: string; // '1';
  dicValName: string; // '男';
  dicTypeCode: string; // 'gender';
  dicTypeName: string; // '性别';
  prntDicValCode: string; // null;
  extFlag: string; // null;
  pinyin: string; // null;
  seq: number; // 1;
  stas: number; // 1;
  updtTime: string; // null;
  opterId: string; // null;
}

export interface DictOptionItem {
  dictItemName: string;
  dictItemCode: string | number;
  dictItemDscr?: string;
  [key: string]: any;
}

export interface GetSysCodeListResult {
  [key: string]: DictOptionItem[];
}
