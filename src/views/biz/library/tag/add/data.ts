/*
 * @LastEditTime: 2022-09-26 16:08:27
 * @Description:静态数据
 */

import { FormSchema } from '/@/components/Form/index';
export function createSchemas(): FormSchema[] {
  return [
    {
      field: 'tageName',
      label: '标签名称',
      component: 'Input',
      rules: [{ required: true }],
    },
    {
      field: 'tagConfig',
      label: '标签颜色',
      component: 'RadioColorGroup',
      componentProps: {
        isSolid: false,
      },
      rules: [{ required: true }],
    },
  ];
}
