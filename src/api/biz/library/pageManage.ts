import { knowledgeHttp } from '/@/utils/http/axios';
import {
  CopyPageParams,
  CreateNodeEditPageParams,
  MovePageParams,
  PageRecyclingItem,
  PageTreeItem,
} from './model/pageManage';

enum Api {
  GET_PAGE_TREE_LIST = '/page/get-page-tree-list',
  CREAT_NODE_EDIT_PAGE = '/page/create-node-edit-page',
  PAGE_SAVE = '/page/save',
  DELETE_PAGE_TREE_BY_ID = '/page/delete-page-tree-by-id/',
  GET_RECYCLING_LIST = '/page/get-recycling-station-page-list',
  PERMANENTLY_DELETE = '/page/permanently-delete-by-ids',
  REDUCTION_PAGE = '/page/reduction-page',
  PAGE_BY_ID = '/page/get-by-id/',
  PAGE_MOVE = '/page/move-page',
  PAGE_COPY = '/page/copy-page',
}

/**
 * @description: 查询页面树
 * @param {object} params
 * @return {*}
 */
export const getPageTreeListData = (params: { spaceId: string }) =>
  knowledgeHttp.post<PageTreeItem[]>({ url: Api.GET_PAGE_TREE_LIST, params });

/**
 * @description: 新建页面
 * @param {CreateNodeEditPageParams} params
 * @return {*}
 */
export const createNodeEditPage = (params: CreateNodeEditPageParams) =>
  knowledgeHttp.post<PageRecyclingItem>(
    { url: Api.CREAT_NODE_EDIT_PAGE, params },
    { successMessageModel: 'message' },
  );

/**
 * @description: 页面标题重名命\分类修改
 * @return {*}
 */
export const pageSave = (params: {
  cateId?: string;
  pageTitle?: string; //'测试页面1';
  pageId: string; // '77c7900203f94ca89e44d06ce318c4d4';
}) => knowledgeHttp.post({ url: Api.PAGE_SAVE, params }, { successMessageModel: 'message' });

/**
 * @description: 根据id删除树形结构页面
 * @param {string} params
 * @return {*}
 */
export const deletePageTreeById = (params: string) =>
  knowledgeHttp.post(
    { url: Api.DELETE_PAGE_TREE_BY_ID, params },
    { successMessageModel: 'message' },
  );

/**
 * @description: 获取知识库页面回收站的页面

 * @param {object} params
 * @return {*}
 */
export const getRecyclingList = (params: { spaceId: string }) =>
  knowledgeHttp.post<PageRecyclingItem[]>({ url: Api.GET_RECYCLING_LIST, params });

/**
 * @description: 根据id永久删除数据
 * @param {string} params
 * @return {*}
 */
export const permanentlyDeleteByIds = (params: string[]) =>
  knowledgeHttp.post({ url: Api.PERMANENTLY_DELETE, params }, { successMessageModel: 'message' });

/**
 * @description: 回收站-页面还原
 * @param {PageRecyclingItem} params
 * @return {*}
 */
export const reductionPage = (params: PageRecyclingItem) =>
  knowledgeHttp.post({ url: Api.REDUCTION_PAGE, params }, { successMessageModel: 'message' });

/**
 * @description: 根据条件查询单条数据
 * @param {string} params
 * @return {*}
 */
export const getPageByID = (params: string) =>
  knowledgeHttp.get<PageRecyclingItem>({ url: Api.PAGE_BY_ID, params });

/**
 * @description: 页面移动
 * @param {PageRecyclingItem} params
 * @return {*}
 */
export const movePage = (params: MovePageParams) =>
  knowledgeHttp.post({ url: Api.PAGE_MOVE, params }, { successMessageModel: 'message' });
/**
 * @description: 页面复制
 * @return {*}
 */
export const copyPage = (params: CopyPageParams) =>
  knowledgeHttp.post({ url: Api.PAGE_COPY, params }, { successMessageModel: 'message' });
