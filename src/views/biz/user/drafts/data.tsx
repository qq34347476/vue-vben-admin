/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-17 16:05:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-25 15:57:25
 * @FilePath: \knowledge-web\src\views\examples\page\data.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn, ActionItem } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';

export function createSchemas(): FormSchema[] {
  return [
    {
      field: 'pageName',
      label: '页面名称',
      component: 'Input',
    },
  ];
}

export function createBasicColumns(handleName): BasicColumn[] {
  return [
    {
      dataIndex: 'pageName',
      title: '页面名称',
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
      dataIndex: 'saveTime',
      title: '保存时间',
      width: 200,
      sorter: true,
    },
    {
      dataIndex: 'knowName',
      title: '知识库名称',
      width: 300,
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
      onClick: handleEdit.bind(null, record),
    },
    {
      label: '删除',
      color: 'error',
      onClick: handleFile.bind(null, record),
    },
  ];
}
