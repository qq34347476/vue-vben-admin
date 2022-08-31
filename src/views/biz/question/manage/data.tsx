/**
 * @description: 静态数据
 * @return {*}
 */
import { BasicColumn, ActionItem } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';
import { getCateListApi } from '/@/api/biz/question/list';
import { QuestionListItem } from '/@/api/biz/question/model/listModel';
import { HideEnum } from '/@/enums/biz/questionEnum';

export function createSchemas(): FormSchema[] {
  return [
    {
      field: 'title',
      label: '问答标题',
      component: 'Input',
    },
    {
      field: 'threadId',
      component: 'ApiSelect',
      label: '问答分类',
      componentProps: {
        // more details see /src/components/Form/src/components/ApiSelect.vue
        api: getCateListApi,
        params: {
          pageNo: 1,
          pageSize: -1,
        },
        resultField: 'records',
        // use name as label
        labelField: 'cateName',
        // use id as value
        valueField: 'cateId',
        // not request untill to select
        immediate: false,
      },
    },
    {
      field: 'hide',
      label: '显示状态',
      component: 'DictSelect',
    },
    {
      field: 'crter',
      label: '问答发布人',
      component: 'Input',
    },
    {
      field: 'crteTime',
      label: '问答发布时间',
      component: 'DatePicker',
    },
    // TODO：二期
    // {
    //   field: 'name',
    //   label: '审核状态',
    //   component: 'Input',
    // },
  ];
}

export function createBasicColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'title',
      title: '问答标题',
      width: 300,
      fixed: 'left',
    },
    {
      dataIndex: 'threadId',
      title: '问答分类',
      width: 100,
      customRender: ({ record }) => {
        return (record as QuestionListItem)?.cateDTO?.cateName;
      },
    },
    {
      dataIndex: 'hide',
      title: '显示状态',
      width: 80,
      // TODO:
      // flag: 'DICT',
    },
    {
      dataIndex: 'crter',
      title: '问答发布人',
      width: 100,
    },
    {
      dataIndex: 'crteTime',
      title: '问答发布时间',
      width: 180,
    },
    {
      dataIndex: 'updtTime',
      title: '问答更新时间',
      width: 180,
    },
    {
      dataIndex: 'count',
      title: '回答数',
      width: 80,
      sorter: true,
    },
    // {
    //   dataIndex: 'beginTime',
    //   title: '是否匿名',
    //   width: 200,
    //   sorter: true,
    // },
    // {
    //   dataIndex: 'name5',
    //   title: '审核状态',
    //   width: 100,
    //   sorter: true,
    // },
  ];
}

export function createActionColumn(
  record: QuestionListItem,
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
      label: record.hide === HideEnum.HIDE ? '显示' : '隐藏',
      onClick: handleEdit.bind(null, record),
    },
    {
      label: '删除',
      color: 'error',
      onClick: handleFile.bind(null, record),
    },
  ];
}
