/*
 * @LastEditTime: 2022-09-26 15:48:59
 * @Description:
 */
export interface UploadParams {
  file: File | Blob;
  id: string;
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
  headPortraitUrl: string; // 头像
}

export interface UploadHeadResult {
  fileName: string; // ']GT~VM){HGMWLDMHS@W1[F9_1664174213668.png';
  headPortraitUrl: string; // 'http://10.16.0.191:5900/push-test/%5DGT~VM%29%7BHGMWLDMHS%40W1%5BF9_1664174213668.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jPhvPLFii1lh8PCF%2F20220926%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220926T063653Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=faa9d25f7ab117b83ef9be7f78dacdc64bc2fd98001b7ba74bc9fee397292ac2';
  oldFileName: string; // null;
}
