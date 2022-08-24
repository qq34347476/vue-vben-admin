/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 15:02:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-24 18:10:11
 * @FilePath: \knowledge-web\src\views\biz\library\knowledgeBase\detailDrawer\data.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DescItem } from '/@/components/Description/index';

export function createDesSchemas(): DescItem[] {
  return [
    {
      field: 'classifyName',
      label: '分类名称',
    },
    {
      field: 'upClassify',
      label: '上级分类',
    },
    {
      field: 'memo',
      label: '分类描述',
    },
    {
      field: 'createTime',
      label: '创建时间',
    },
    {
      field: 'updateTime',
      label: '更新时间',
    },
  ];
}
