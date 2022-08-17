/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 15:16:05
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-19 17:36:50
 * @FilePath: \knowledge-web\src\views\biz\library\knowledgeBase\data.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { BasicColumn, ActionItem } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';

export function createSchemas(): FormSchema[] {
  return [
    {
      field: 'knowName',
      label: '知识库名称',
      component: 'Input',
    },
  ];
}

export function createBasicColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'knowName',
      title: '知识库名称',
      width: 300,
      fixed: 'left',
    },
    {
      dataIndex: 'pageNum',
      title: '页面数',
      width: 100,
    },
    {
      dataIndex: 'knowAdmin',
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
          checkedChildren: '开',
          unCheckedChildren: '关',
          onChange(checked: boolean) {
            console.log(checked);
          },
        });
      },
    },
    {
      dataIndex: 'memo',
      title: '知识库描述',
      width: 300,
    },
    {
      dataIndex: 'createPsn',
      title: '创建人',
      width: 100,
      sorter: true,
    },
    {
      dataIndex: 'createTime',
      title: '创建时间',
      width: 200,
      sorter: true,
    },
    {
      dataIndex: 'updatePsn',
      title: '更新人',
      width: 100,
      sorter: true,
    },
    {
      dataIndex: 'updateTime',
      title: '更新时间',
      width: 200,
      sorter: true,
    },
  ];
}

export function createEffActionColumn(
  record,
  handleDetail: Function,
  handleEdit: Function,
  handleFile: Function,
  handleCollection: Function,
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
      label: '归档',
      onClick: handleFile.bind(null, record),
    },
    {
      label: record.collection === '0' ? '收藏' : '取消收藏',
      onClick: handleCollection.bind(null, record),
    },
  ];
}
export function createFileActionColumn(
  record,
  handleDetail: Function,
  handleActive: Function,
  handleDelete: Function,
): ActionItem[] {
  return [
    {
      label: '详情',
      onClick: handleDetail.bind(null, record),
    },
    {
      label: '激活',
      onClick: handleActive.bind(null, record),
    },
    {
      label: '删除',
      color: 'error',
      onClick: handleDelete.bind(null, record),
    },
  ];
}
export function createRecycleActionColumn(
  record,
  handleDetail: Function,
  handleRecover: Function,
  handleForeverDelete: Function,
): ActionItem[] {
  return [
    {
      label: '详情',
      onClick: handleDetail.bind(null, record),
    },
    {
      label: '恢复',
      onClick: handleRecover.bind(null, record),
    },
    {
      label: '永久删除',
      color: 'error',
      onClick: handleForeverDelete.bind(null, [record.id]),
    },
  ];
}
