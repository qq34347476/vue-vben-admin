/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-19 09:45:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-22 10:27:58
 * @FilePath: \knowledge-web\src\views\examples\page\add\data.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FormSchema } from '/@/components/Form/index';
export function createSchemas(): FormSchema[] {
  return [
    {
      field: 'cateName',
      label: '分类名称',
      component: 'Input',
      rules: [{ required: true }],
    },
    {
      field: 'prntCateName',
      label: '上级分类',
      component: 'Input',
      dynamicDisabled: true,
    },
    {
      field: 'descInfo',
      label: '分类描述',
      component: 'InputTextArea',
    },
    {
      field: 'cateConfig',
      label: '分类颜色',
      component: 'RadioColorGroup',
      componentProps: {
        showRadio: true,
      },
      rules: [{ required: true }],
    },
  ];
}
