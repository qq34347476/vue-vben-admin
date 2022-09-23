/*
 * @LastEditTime: 2022-09-22 16:08:05
 * @Description:
 */
import { DescItem } from '/@/components/Description/index';

export function createDesSchemas(): DescItem[] {
  return [
    {
      field: 'custCode',
      label: '用户名',
    },
    {
      field: 'custNick',
      label: '姓名',
    },
    {
      field: 'mob',
      label: '手机号码',
    },
    {
      field: 'email',
      label: '用户邮箱',
    },
    {
      field: 'groupName',
      label: '所属分组',
    },
  ];
}
