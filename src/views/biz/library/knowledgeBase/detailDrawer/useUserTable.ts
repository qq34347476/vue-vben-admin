/*
 * @LastEditTime: 2022-09-20 17:23:46
 * @Description:用户权限表格
 */
import { reactive } from 'vue';
import {
  // createGroupSchemas,
  createGroupColumns,
  // createUserSchemas,
  createBasicColumns,
} from './data';
import { useTable } from '/@/components/Table';
import { getTeamMenberListApi, getGroupInfoListApi } from '/@/api/biz/library/knowledge';
export function useUserTable() {
  // 分组table
  const groupSelectArr = reactive<string[]>([]);
  const [registerGroupTable, { setSelectedRowKeys: groupSetSelectedRowKeys }] = useTable({
    columns: createGroupColumns(),
    api: getGroupInfoListApi,
  });

  // 用户table
  const userSelectArr = reactive<string[]>([]);
  const [registerUserTable, { setSelectedRowKeys: userSetSelectedRowKeys }] = useTable({
    columns: createBasicColumns(),
    api: getTeamMenberListApi,
  });

  return {
    registerGroupTable,
    groupSetSelectedRowKeys,
    registerUserTable,
    userSetSelectedRowKeys,
    groupSelectArr,
    userSelectArr,
  };
}
