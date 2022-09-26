/*
 * @LastEditTime: 2022-09-26 16:02:03
 * @Description:
 */
/**
 * @description: 静态数据
 * @return {*}
 */
import { DescItem } from '/@/components/Description/index';
import { BasicColumn } from '/@/components/Table';

export function createDesSchemas(): DescItem[] {
  return [
    {
      field: 'tageName',
      label: '标签名称',
      render(val, data) {
        return <span style={JSON.parse(data.tagConfig).style}>{val}</span>;
      },
    },
  ];
}

export function createBasicColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'pageName',
      title: '页面标题',
      width: 300,
    },
    {
      dataIndex: 'crter',
      title: '创建人',
    },
    {
      dataIndex: 'crteTime',
      title: '创建时间',
    },
    {
      dataIndex: 'spaceName',
      title: '知识库',
    },
  ];
}
