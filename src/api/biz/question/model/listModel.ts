import { CateTypeEnum } from '/@/enums/biz/questionEnum';

export interface QuestionListItem {
  themeId: string; // '2656773b2819480bb5d22d6d75de06b9';
  updtTime: string; // '2022-08-29 14:10:24';
  opterId: string; // 'e249d2702900405c95ae3b165a15aac6';
  title: string; // '测试';
  crterId: string; // 'e249d2702900405c95ae3b165a15aac6';
  rief: string; // '简介';
  crter: string; // '李健麟';
  stas: number; // 1;
  ver: number; // 0;
  crteTime: string; // null;
  themeDesc: string; // '描述1';
  threadId: string; // '1';
  hide: number; // 1;
  opter: string; // '李健麟';
  forumThemeInstDTO: {
    forumThemeInstId: string; // '7507ae6bff60499e9e8a7ef6fd7faca9';
    forumThemeId: string; // '2656773b2819480bb5d22d6d75de06b9';
    content: string; // '问:你是哪里人啊？';
    updtTime: string; // '2022-08-29 14:05:57';
    crterId: string; // 'e249d2702900405c95ae3b165a15aac6';
    crter: string; // '李健麟';
    ver: string; // '0';
    number: string; // 1;
    crteTime: string; // null;
  };
  forumCommentDTOS: ForumCommentDTOItem[]; // null;
  cateId: string;
}
export interface ForumCommentDTOItem {
  commentId: string; // '5b5a457155fd4b2d83ed9994b4c074ae';
  updtTime: string; // '2022-08-30 10:14:45';
  opterId: string; // 'e249d2702900405c95ae3b165a15aac6';
  content: string; // '评论了';
  prntCommentId: string; // '0';
  crter: string; // '李健麟';
  opter: string; // '李健麟';
  forumThemeId: string; // '2656773b2819480bb5d22d6d75de06b9';
  stas: number; // 1;
  crterId: string; // 'e249d2702900405c95ae3b165a15aac6';
  crteTime: string; // '2022-08-29 14:06:18';
  hide: number; // 1;
}
export interface CommentTreeItem extends ForumCommentDTOItem {
  children: CommentTreeItem[];
}
export interface GetQuestionListParams extends QuestionListItem {
  content: string;
  cateId: string;
}

export interface CateListItem {
  cateId: string; // "2",
  cateCode: string; // null,
  cateName: string; // "知识问答",
  cateType: CateTypeEnum; // 2,
  prntCateId: string; // "0",
  stas: number; // 1,
  updtTime: string; // "2022-08-29 16:40:49",
  opterId: string; // "9af767783e624d4cb96691459024aa4a",
  opter: string; // "李健麟",
  descInfo: string; // null,
  crter: string; // "李健麟",
  crteTime: string; // "2022-08-29 13:55:34",
  crterId: string; // "9af767783e624d4cb96691459024aa4a"
}

export interface QuestionSaveParams {
  title: string; // '测试';
  // 分类id
  threadId: string; // '1';
  forumThemeInstDTO: {
    content: string; // '问:你是哪里人啊？';
  };
}

export interface CommentSaveParams {
  // "commentId":"",
  content: string; //  '评论了你的评论';
  prntCommentId: string; //  '9f4b51663c5d4bfb883248eed30a7ce0';
  forumThemeId: string; //  'a61c102a0ca34f2f8c079bf81036b6f5';
  // hide: string; //  '0';
  // stas: string; //  '1';
}
