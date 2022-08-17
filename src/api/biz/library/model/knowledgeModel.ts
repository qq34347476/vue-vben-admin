/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 09:35:28
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-16 17:40:14
 * @FilePath: \knowledge-web\src\api\biz\library\model\knowledgeModel.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface KnowledgeListParams {
  type: string;
  knowName?: string;
}

export interface KnowledgeParams {
  id: string;
}

export interface KnowledgeItem {
  id: string;
  knowName: string;
  pageNum: string;
  knowAdmin: string;
  switch: string;
  collection: string;
  createPsn: string; // '张三',
  createTime: string; // '2022-05-05',
  updatePsn: string; // '李四',
  updateTime: string; // '2022-05-05',
  memo: string; // '知识库描述'
  add: string; // '1'
  knowMark: string; // 'NBZLK',
  edit: string; // '0'
}
