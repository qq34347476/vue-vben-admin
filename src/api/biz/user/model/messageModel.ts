/*
 * @LastEditTime: 2022-08-26 10:00:12
 * @Description:
 */
export interface MessageListItem {
  id: string;
  userName: string;
  type: string;
  time: string;
  questionName: string;
  pageName: string;
}

export interface MessageParams {
  type: string;
}
