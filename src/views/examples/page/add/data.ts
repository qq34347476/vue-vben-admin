/*
 * @LastEditTime: 2022-08-31 10:28:30
 * @Description:静态数据
 */

import { FormSchema } from '/@/components/Form/index';
import { numStrPattern } from '/@/utils/pattern';
export function createSchemas(): FormSchema[] {
  return [
    {
      field: 'name',
      label: '知识库名称',
      component: 'Input',
    },
    {
      field: 'name1',
      label: '必填',
      component: 'Input',
      rules: [{ required: true }],
    },
    {
      field: 'name2',
      label: '字数限制',
      component: 'Input',
      componentProps: {
        showCount: true,
        maxlength: 10,
      },
      rules: [{ required: true }],
    },
    {
      field: 'num',
      label: '仅字母数字',
      component: 'Input',
      componentProps: {
        showCount: true,
        maxlength: 10,
      },
      rules: [{ required: true, ...numStrPattern }],
    },
  ];
}
