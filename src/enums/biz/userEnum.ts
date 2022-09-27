/*
 * @LastEditTime: 2022-09-27 15:26:00
 * @Description:
 */
export enum MessageType {
  ALL = '',
  COMMENT = 'comment',
  PAGE = 'page',
}
export const MessageTypeList = [
  {
    value: MessageType.ALL,
    label: '全部类别',
  },
  {
    value: MessageType.COMMENT,
    label: '问答回复',
  },
  {
    value: MessageType.PAGE,
    label: '提及我的',
  },
];
