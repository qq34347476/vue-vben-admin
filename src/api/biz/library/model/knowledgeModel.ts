/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 09:35:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-20 14:27:10
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
  spaceId: string; // 知识库id
  name: string; // 知识库名称
  code: string;
  stas: string;
  contentDesc: string;
  crterId: string; // 创建人id
  crter: string; // 创建人姓名
  crteTime: string; // 创建时间
  updtTime: string; // 更新时间
  opterId: string; // 操作人id
  pageCount: string; // 页面数
  admins: KnowledgeAdmin[]; // 管理员信息
  needAudit: boolean; // 审核开关
  needAuditOperate: string[]; // 审核操作
  userAuthList: KnowledgeAuth[];
  groupAuthList: KnowledgeAuth[];
}

export interface KnowledgeAdmin {
  custId: string;
  custCode: string;
  custNick: string;
}

export interface KnowledgeAuth {
  objId: string;
  authType: string;
  knowObjId: string;
}

export interface GroupItem {
  uactId: string; //  null;
  userId: string; //  null;
  userName: string; //  null;
  teamMemberId: string; //  null;
  teamId: string; //  '197b1fcc89344cada5f5c1a41b2cce9c';
  grpName: string; //  '默认分组';
}
export interface GroupTreeItem<GroupItem> {
  uactId: string; //  null;
  userId: string; //  null;
  userName: string; //  null;
  teamMemberId: string; //  null;
  teamId: string; //  '197b1fcc89344cada5f5c1a41b2cce9c';
  grpName: string; //  '默认分组';
  children: GroupItem;
}
