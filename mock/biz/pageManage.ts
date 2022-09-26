import { MockMethod } from 'vite-plugin-mock';
// import {  resultSuccess } from '../_util';
import getPageTreeList from '../_json/knowledge/get-page-tree-list.json';

export default [
  {
    url: '/basic-api/page/get-page-tree-list',
    timeout: 1000,
    method: 'post',
    response: () => {
      return getPageTreeList;
    },
  },
] as MockMethod[];
