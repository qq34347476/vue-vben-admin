/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-17 16:05:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-27 10:37:50
 * @FilePath: \knowledge-web\src\views\examples\page\data.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn, ActionItem } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';
import { ModelStateList } from '/@/enums/biz/libraryEnum';
export function createSchemas(): FormSchema[] {
  return [
    {
      field: 'templeteName',
      label: '模板名称',
      component: 'Input',
    },
    {
      field: 'valiFlag',
      label: '模板状态',
      component: 'Select',
      componentProps: {
        options: ModelStateList,
      },
    },
  ];
}

export function createBasicColumns(handleName): BasicColumn[] {
  return [
    {
      dataIndex: 'templeteName',
      title: '模板名称',
      width: 300,
      fixed: 'left',
      customRender: ({ text }) => {
        return (
          <a class="line-clamp-1" onClick={handleName}>
            {text}
          </a>
        );
      },
    },
    {
      dataIndex: 'valiFlag',
      title: '模板状态',
      width: 100,
      flag: 'TAG',
      tagList: ModelStateList,
    },
    {
      dataIndex: 'crter',
      title: '创建人',
      width: 100,
      sorter: true,
    },
    {
      dataIndex: 'crteTime',
      title: '创建时间',
      width: 180,
      sorter: true,
    },
    {
      dataIndex: 'opter',
      title: '更新人',
      width: 100,
      sorter: true,
    },
    {
      dataIndex: 'updtTime',
      title: '更新时间',
      width: 180,
      sorter: true,
    },
  ];
}

export function createActionColumn(
  record,
  handleDetail: Function,
  handleEdit: Function,
  handleEnable: Function,
  handleDlete: Function,
): ActionItem[] {
  return [
    {
      label: '查看',
      onClick: handleDetail.bind(null, record),
    },
    {
      label: '编辑',
      onClick: handleEdit.bind(null, record),
    },
    {
      label: record.valiFlag === 0 ? '启用' : '停用',
      color: record.valiFlag === 0 ? 'success' : 'error',
      onClick: handleEnable.bind(null, record),
    },
    {
      label: '删除',
      color: 'error',
      onClick: handleDlete.bind(null, [record.pageTmplId], record),
    },
  ];
}
