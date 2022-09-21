/*
 * @LastEditTime: 2022-09-20 20:02:11
 * @Description:静态数据
 */

import { FormSchema } from '/@/components/Form/index';
export function createSchemas(): FormSchema[] {
  return [
    {
      field: 'pageTitle',
      label: '标题',
      component: 'Input',
      rules: [{ required: true }],
    },
  ];
}
