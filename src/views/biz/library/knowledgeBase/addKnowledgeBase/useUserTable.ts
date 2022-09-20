/*
 * @LastEditTime: 2022-09-20 18:17:05
 * @Description:用户权限表格
 */
import { reactive } from 'vue';
import {
  createGroupSchemas,
  createGroupColumns,
  createUserSchemas,
  createBasicColumns,
} from './data';
import { useTable } from '/@/components/Table';
import { getTeamMenberListApi, getGroupInfoListApi } from '/@/api/biz/library/knowledge';
export function useUserTable() {
  // 分组table
  const groupSelectArr = reactive<string[]>([]);
  const [registerGroupTable, { setSelectedRowKeys: groupSetSelectedRowKeys }] = useTable({
    useSearchForm: true,
    formConfig: {
      schemas: createGroupSchemas(),
      baseColProps: { span: 8 },
      actionColOptions: { span: 16 },
    },
    columns: createGroupColumns(),
    api: getGroupInfoListApi,
    rowKey: 'teamId',
    rowSelection: {
      type: 'checkbox',
      onSelect: selectChange.bind(null, 'group'),
      onSelectAll: selectAllChange.bind(null, 'group'),
    },
    maxHeight: 470,
  });

  // 用户table
  const userSelectArr = reactive<string[]>([]);
  const [registerUserTable, { setSelectedRowKeys: userSetSelectedRowKeys }] = useTable({
    useSearchForm: true,
    formConfig: {
      schemas: createUserSchemas(),
      baseColProps: { span: 8 },
      actionColOptions: { span: 16 },
    },
    columns: createBasicColumns(),
    api: getTeamMenberListApi,
    rowKey: 'uactId',
    rowSelection: {
      type: 'checkbox',
      onSelect: selectChange.bind(null, 'user'),
      onSelectAll: selectAllChange.bind(null, 'user'),
    },
    maxHeight: 470,
  });

  // selectChange
  function selectChange(type, record, selected) {
    if (selected) {
      if (type === 'group') {
        groupSelectArr.push(record.teamId);
      } else {
        userSelectArr.push(record.uactId);
      }
    } else {
      if (type === 'group') {
        groupSelectArr.splice(groupSelectArr.indexOf(record.teamId), 1);
      } else {
        userSelectArr.splice(userSelectArr.indexOf(record.uactId), 1);
      }
    }
  }
  // selectAllChange
  function selectAllChange(type, selected, _, changeRows) {
    if (selected) {
      changeRows.forEach((item) => {
        if (type === 'group') {
          groupSelectArr.push(item.teamId);
        } else {
          userSelectArr.push(item.uactId);
        }
      });
    } else {
      changeRows.forEach((item) => {
        if (type === 'group') {
          groupSelectArr.splice(groupSelectArr.indexOf(item.teamId), 1);
        } else {
          userSelectArr.splice(userSelectArr.indexOf(item.uactId), 1);
        }
      });
    }
  }
  return {
    registerGroupTable,
    groupSetSelectedRowKeys,
    registerUserTable,
    userSetSelectedRowKeys,
    groupSelectArr,
    userSelectArr,
  };
}
