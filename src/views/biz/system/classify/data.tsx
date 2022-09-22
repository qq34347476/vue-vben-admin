/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-17 16:05:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-22 14:16:53
 * @FilePath: \knowledge-web\src\views\examples\page\data.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn, ActionItem } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';
import { TypeEnum } from '/@/enums/biz/systeamEnum';

export function createSchemas(): FormSchema[] {
  return [
    {
      field: 'cateName',
      label: '分类名称',
      component: 'Input',
    },
  ];
}

export function createBasicColumns(handleName): BasicColumn[] {
  return [
    {
      dataIndex: 'cateName',
      title: '分类名称',
      width: 200,
      fixed: 'left',
      customRender: ({ text, record }) => {
        return (
          <a class="line-clamp-1" onClick={handleName.bind(null, record)}>
            {text}
          </a>
        );
      },
    },
    {
      dataIndex: 'prntCateName',
      title: '上级分类',
      width: 200,
    },
    {
      dataIndex: 'crteTime',
      title: '创建时间',
      width: 160,
      sorter: true,
    },
    {
      dataIndex: 'updtTime',
      title: '更新时间',
      width: 160,
      sorter: true,
    },
  ];
}

export function createActionColumn(
  record,
  handleEdit: Function,
  handleFile: Function,
): ActionItem[] {
  return [
    {
      label: '编辑',
      disabled: record.cateName === TypeEnum.defaultType,
      onClick: handleEdit.bind(null, record),
    },
    {
      label: '删除',
      color: 'error',
      disabled: record.cateName === TypeEnum.defaultType,
      onClick: handleFile.bind(null, [record.id]),
    },
  ];
}
