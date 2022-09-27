/*
 * @LastEditTime: 2022-09-27 11:12:15
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
      helpMessage: '温馨提示：移动父页面时，子页面将同时跟随父页面移动',
      required: true,
    },
  ];
}
