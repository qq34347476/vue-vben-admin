/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-19 09:45:01
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-22 18:03:55
 * @FilePath: \knowledge-web\src\views\examples\page\add\data.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FormSchema } from '/@/components/Form/index';
import { ReviewStateList } from '/@/enums/biz/libraryEnum';
export function createSchemas(reviewChange): FormSchema[] {
  return [
    {
      field: 'knowName',
      label: '审核结果',
      component: 'RadioGroup',
      defaultValue: '审核通过',
      componentProps: {
        options: ReviewStateList,
        onchange: reviewChange,
      },
      rules: [{ required: true }],
    },
    {
      field: 'memo',
      label: '审核原因',
      component: 'InputTextArea',
    },
  ];
}
