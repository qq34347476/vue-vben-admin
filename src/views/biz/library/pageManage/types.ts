// import { PageTreeItem } from "/@/api/biz/library/model/pageManage";

import { PageRecyclingPublicItem } from '/@/api/biz/library/model/pageManage';

export enum MenuKeyEnum {
  NEW = 'NEW',
  KNOWLEDGE = 'KNOWLEDGE',
  HOME = 'HOME',
  TREE = 'TREE',
}

// 页面树：右键功能
export enum TreeMenuKeyEnum {
  // 页面树右键
  NEW = 'NEW',
  KNOWLEDGE = 'KNOWLEDGE',
  RENAME = 'RENAME',
  DELETE = 'DELETE',
  SUB = 'SUB',
  UP = 'UP',
  DOWN = 'DOWN',
  // 资料库：查看全部
  KNOWLEDGE_ALL = 'KNOWLEDGE_ALL',
  // 回收站：根节点
  RECYCLING_ROOT = 'RECYCLING_ROOT',
  // 回收站：永久删除
  RECYCLING_DELETE_PERMANENT = 'DELETE_PERMANENT',
  // 回收站：还原
  RECYCLING_RECOVER = 'RECOVER',
  // 页面：更多
  MORE_AUDIT = 'MORE_AUDIT',
  MORE_LOCK = 'MORE_LOCK',
  MORE_VERSION = 'MORE_VERSION',
  MORE_MOVE = 'MORE_MOVE',
  MORE_COPY = 'MORE_COPY',
  MORE_EXPORT = 'MORE_EXPORT',
  MORE_DELETE = 'MORE_DELETE',
  MORE_SHAER = 'MORE_SHAER',
}
export const MORE_MENUS: TreeMenuItem[] = [
  {
    key: TreeMenuKeyEnum.MORE_AUDIT,
    title: '权限设置',
  },
  {
    key: TreeMenuKeyEnum.MORE_LOCK,
    title: '页面锁定',
  },
  {
    key: TreeMenuKeyEnum.MORE_VERSION,
    title: '页面版本恢复',
  },
  {
    key: TreeMenuKeyEnum.MORE_MOVE,
    title: '移动',
  },
  {
    key: TreeMenuKeyEnum.MORE_COPY,
    title: '复制',
  },
  {
    key: TreeMenuKeyEnum.MORE_DELETE,
    title: '删除',
  },
];
export const TREE_MENU: TreeMenuItem[] = [
  {
    key: TreeMenuKeyEnum.NEW,
    title: '新建',
    children: [
      {
        key: TreeMenuKeyEnum.SUB,
        title: '子页面',
      },
      {
        key: TreeMenuKeyEnum.UP,
        title: '上方添加页面',
      },
      {
        key: TreeMenuKeyEnum.DOWN,
        title: '下方添加页面',
      },
    ],
  },
  {
    key: TreeMenuKeyEnum.KNOWLEDGE,
    title: '从模板中新建',
  },
  {
    key: TreeMenuKeyEnum.RENAME,
    title: '重命名',
  },
  {
    key: TreeMenuKeyEnum.DELETE,
    title: '删除',
  },
];

export interface TreeMenuItem {
  key: TreeMenuKeyEnum;
  title: string;
  children?: TreeMenuItem[];
}
// 页面树的类型
export enum TreeTypeEnum {
  RECYCLING = 'RECYCLING',
  RECYCLING_ITEM = 'RECYCLING_ITEM',
}
export interface PageRecyclingPublicTree extends PageRecyclingPublicItem {
  children?: PageRecyclingPublicItem[];
}

export const RECYCLING_ROOT: PageRecyclingPublicTree = {
  pageId: TreeMenuKeyEnum.RECYCLING_ROOT,
  pageCode: '',
  pageTitle: '回收站',
  pageType: '2',
  parentId: '',
  externalUrl: '',
  children: [],
};
