/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-19 09:45:01
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-19 10:22:32
 * @FilePath: \knowledge-web\src\views\examples\page\add\data.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FormSchema } from '/@/components/Form/index';
import { numStrPattern } from '/@/utils/pattern';
export function createSchemas(): FormSchema[] {
  return [
    {
      field: 'knowName',
      label: '知识库名称',
      component: 'Input',
    },
    {
      field: 'required',
      label: '必填',
      component: 'Input',
      rules: [{ required: true }],
    },
    {
      field: 'count',
      label: '字数限制',
      component: 'Input',
      componentProps: {
        showCount: true,
        maxlength: 10,
      },
      rules: [{ required: true }],
    },
    {
      field: 'only',
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
