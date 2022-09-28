/*
 * @LastEditTime: 2022-09-28 11:41:08
 * @Description:静态数据
 */

import { FormSchema } from '/@/components/Form/index';
export function createSchemas(): FormSchema[] {
  return [
    {
      field: 'pageAuthType',
      label: '用户权限',
      component: 'DictSelect',
      required: true,
    },
    {
      field: 'saveUserAuths',
      component: 'Input',
      label: '用户列表',
      slot: 'saveUserAuthsSlot',
    },
  ];
}
