/*
 * @LastEditTime: 2022-09-15 16:28:33
 * @Description:
 */
export interface UploadParams {
  file: File | Blob;
}
export interface UserContribution {
  spaceCount: number; //1;
  pageCount: number; //1;
  commentCount: number; //0;
}

export interface UserInfo {
  custId: string; // '7da3eed7f74a4d93889c4aa166bea7d1';
  custCode: string; // 'lixiaodong3303';
  custNick: string; //
  email: string; // '1476880339@qq.com';
  mob: string; // '1476880339';
  externalId: string; // NULL;
  source: string; // '0';
  updtTime: string; // '2022-08-17 15:59:15';
  opterId: string; // 'lixiaodong3303';
  custType: string; // NULL;
  tenantId: string; // '0';
  stas: string; // 1;
  groupName: string; // '默认分组';
}
