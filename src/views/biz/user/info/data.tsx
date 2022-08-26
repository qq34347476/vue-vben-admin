/*
 * @LastEditTime: 2022-08-25 14:16:05
 * @Description:
 */
import { DescItem } from '/@/components/Description/index';

export function createDesSchemas(): DescItem[] {
  return [
    {
      field: 'username',
      label: '用户名',
    },
    {
      field: 'realName',
      label: '姓名',
    },
    {
      field: 'phoneNumber',
      label: '手机号码',
    },
    {
      field: 'email',
      label: '用户邮箱',
    },
    {
      field: 'updatePsn',
      label: '所属分组',
    },
    {
      field: 'updateTime',
      label: '角色',
    },
  ];
}
