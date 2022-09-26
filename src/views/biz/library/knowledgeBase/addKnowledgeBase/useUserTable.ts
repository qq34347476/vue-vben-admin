/*
 * @LastEditTime: 2022-09-26 11:21:36
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
    rowKey: 'groupId',
    rowSelection: {
      type: 'checkbox',
      onSelect: selectChange.bind(null, 'group'),
      onSelectAll: selectAllChange.bind(null, 'group'),
    },
    scroll: {
      y: 470,
    },
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
    rowKey: 'custId',
    rowSelection: {
      type: 'checkbox',
      onSelect: selectChange.bind(null, 'user'),
      onSelectAll: selectAllChange.bind(null, 'user'),
    },
    scroll: {
      y: 470,
    },
  });

  // selectChange
  function selectChange(type, record, selected) {
    if (selected) {
      if (type === 'group') {
        groupSelectArr.push(record.groupId);
      } else {
        userSelectArr.push(record.custId);
      }
    } else {
      if (type === 'group') {
        groupSelectArr.splice(groupSelectArr.indexOf(record.groupId), 1);
      } else {
        userSelectArr.splice(userSelectArr.indexOf(record.custId), 1);
      }
    }
  }
  // selectAllChange
  function selectAllChange(type, selected, _, changeRows) {
    if (selected) {
      changeRows.forEach((item) => {
        if (type === 'group') {
          groupSelectArr.push(item.groupId);
        } else {
          userSelectArr.push(item.custId);
        }
      });
    } else {
      changeRows.forEach((item) => {
        if (type === 'group') {
          groupSelectArr.splice(groupSelectArr.indexOf(item.groupId), 1);
        } else {
          userSelectArr.splice(userSelectArr.indexOf(item.custId), 1);
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
