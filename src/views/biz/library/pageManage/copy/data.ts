/*
 * @LastEditTime: 2022-09-27 13:32:03
 * @Description:静态数据
 */

import { FormSchema } from '/@/components/Form/index';
export function createSchemas(): FormSchema[] {
  return [
    {
      field: 'spaceId',
      label: '知识库',
      component: 'Select',
      required: true,
    },
    {
      field: 'pageId',
      component: 'Input',
      label: '选择页面',
      slot: 'pageIdSlot',
      required: true,
    },
  ];
}
