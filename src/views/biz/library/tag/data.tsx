/*
 * @LastEditTime: 2022-09-26 16:29:33
 * @Description:
 */
/**
 * @description: 存放静态数据
 * @return {*}
 */
import { BasicColumn, ActionItem } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';

export function createSchemas(): FormSchema[] {
  return [
    {
      field: 'tageName',
      label: '标签名称',
      component: 'Input',
    },
  ];
}

export function createBasicColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'tageName',
      title: '知识库名称',
      width: 300,
      fixed: 'left',
      customRender: ({ text, record }) => {
        return <span style={JSON.parse(record.tagConfig).style}>{text}</span>;
      },
    },
    {
      dataIndex: 'tageCount',
      title: '引用页面数',
    },
    {
      dataIndex: 'crter',
      title: '创建人',
      sorter: true,
    },
    {
      dataIndex: 'crteTime',
      title: '创建时间',
      sorter: true,
    },
    {
      dataIndex: 'opterId',
      title: '更新人',
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
      onClick: handleFile.bind(null, [record.tageId]),
    },
  ];
}
