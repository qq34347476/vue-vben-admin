/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-17 16:05:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-30 15:04:50
 * @FilePath: \knowledge-web\src\views\examples\page\data.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn, ActionItem } from '/@/components/Table';
import { Switch } from 'ant-design-vue';
import { FormSchema } from '/@/components/Form/index';
import { h } from 'vue';

export function createSchemas(): FormSchema[] {
  return [
    {
      field: 'name',
      label: '知识库名称',
      component: 'Input',
    },
    {
      field: 'gender',
      label: '性别',
      component: 'DictSelect',
    },
  ];
}

export function createBasicColumns(handleName): BasicColumn[] {
  return [
    {
      dataIndex: 'name',
      title: '知识库名称',
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
      dataIndex: 'gender',
      title: '性别（数据字典）',
      flag: 'DICT',
    },
    {
      dataIndex: 'name1',
      title: '页面数',
      width: 100,
    },
    {
      dataIndex: 'name2',
      title: '知识库管理员',
      width: 150,
    },
    {
      dataIndex: 'switch',
      title: '审核开关',
      width: 100,
      customRender: ({ record }) => {
        return h(Switch, {
          checked: record.switch === '1',
          onChange(checked: boolean) {
            console.log(checked);
          },
        });
      },
    },
    {
      dataIndex: 'address',
      title: '知识库描述',
      width: 300,
    },
    {
      dataIndex: 'name4',
      title: '创建人',
      width: 100,
      sorter: true,
    },
    {
      dataIndex: 'beginTime',
      title: '创建时间',
      width: 200,
      sorter: true,
    },
    {
      dataIndex: 'name5',
      title: '更新人',
      width: 100,
      sorter: true,
    },
    {
      dataIndex: 'endTime',
      title: '更新时间',
      width: 200,
      sorter: true,
    },
  ];
}

export function createActionColumn(
  record,
  handleDetail: Function,
  handleEdit: Function,
  handleFile: Function,
): ActionItem[] {
  return [
    {
      label: '详情',
      onClick: handleDetail.bind(null, record),
    },
    {
      label: '编辑',
      onClick: handleEdit.bind(null, record),
    },
    {
      label: '删除',
      color: 'error',
      onClick: handleFile.bind(null, [record.id]),
    },
  ];
}
