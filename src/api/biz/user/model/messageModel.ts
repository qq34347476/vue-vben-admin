/*
 * @LastEditTime: 2022-09-15 18:17:05
 * @Description:
 */
export interface MessageListItem {
  forumThemeId: string; // '45a062a3dc874cba8bfa3108a8303e5f';
  commentId: string; // 'f5a527c30c9c45ec85fb79943c4422d2';
  pageId: string; // null;
  crter: string; // '匿名用户';
  content: string; // '评论了你的评论';
  newType: string; // 'comment';
  crteTime: string; // '2022-09-15 11:35:22';
}

export interface MessageParams {
  type: string;
}
