/*
 * @LastEditTime: 2022-08-26 10:14:35
 * @Description:
 */
export enum MessageType {
  ALL = '',
  ANSWER = 'answer',
  ABOUT = 'about',
}
export const MessageTypeList = [
  {
    value: MessageType.ALL,
    label: '全部类别',
  },
  {
    value: MessageType.ANSWER,
    label: '问答回复',
  },
  {
    value: MessageType.ABOUT,
    label: '提及我的',
  },
];
