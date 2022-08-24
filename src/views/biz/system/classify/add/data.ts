/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-19 09:45:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-24 14:47:26
 * @FilePath: \knowledge-web\src\views\examples\page\add\data.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FormSchema } from '/@/components/Form/index';
export function createSchemas(): FormSchema[] {
  return [
    {
      field: 'classifyName',
      label: '分类名称',
      component: 'Input',
      rules: [{ required: true }],
    },
    {
      field: 'upClassify',
      label: '上级分类',
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      field: 'memo',
      label: '分类描述',
      component: 'InputTextArea',
    },
  ];
}
