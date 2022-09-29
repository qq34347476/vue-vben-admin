/*
 * @LastEditTime: 2022-09-28 14:48:48
 * @Description:静态数据
 */

import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';

export function createSchemas(handleAuthTypeChange: Function): FormSchema[] {
  return [
    {
      field: 'pageAuthType',
      label: '用户权限',
      component: 'DictSelect',
      required: true,
      componentProps: {
        onChange: handleAuthTypeChange,
      },
    },
    {
      field: 'saveUserAuths',
      component: 'Input',
      label: '用户列表',
      slot: 'saveUserAuthsSlot',
    },
  ];
}

export function createBasicColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'groupName',
      title: '分组名称',
    },
    {
      dataIndex: 'custNick',
      title: '姓名',
    },
    {
      dataIndex: 'custCode',
      title: '用户名',
    },
    {
      dataIndex: 'look',
      title: '查看',
    },
    {
      dataIndex: 'edit',
      title: '编辑',
    },
  ];
}
