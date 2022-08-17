/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-17 16:05:41
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-23 10:33:02
 * @FilePath: \knowledge-web\src\views\examples\page\data.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn, ActionItem } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';
import { ReviewStateList } from '/@/enums/biz/libraryEnum';

export function createUnauditedSchemas(): FormSchema[] {
  return [
    {
      field: 'pageName',
      label: '页面名称',
      component: 'Input',
    },
  ];
}
export function createReviewedSchemas(): FormSchema[] {
  return [
    {
      field: 'pageName',
      label: '页面名称',
      component: 'Input',
    },
    {
      field: 'reviewState',
      label: '审核状态',
      component: 'Select',
      componentProps: {
        options: ReviewStateList,
      },
    },
  ];
}

export function createUnauditedColumns(handleName, pageClassifyList?): BasicColumn[] {
  return [
    {
      dataIndex: 'pageName',
      title: '页面名称',
      width: 300,
      fixed: 'left',
      customRender: (text) => {
        return <a onClick={handleName}>{text.text}</a>;
      },
    },
    {
      dataIndex: 'knowledgeName',
      title: '知识库',
      width: 300,
    },
    {
      dataIndex: 'pageClassify',
      title: '页面分类',
      width: 150,
      flag: 'TAG',
      tagList: pageClassifyList,
    },
    {
      dataIndex: 'reviewType',
      title: '审核类型',
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

export function createReviewedColumns(handleName, pageClassifyList): BasicColumn[] {
  console.log(pageClassifyList);
  return [
    {
      dataIndex: 'pageName',
      title: '页面名称',
      width: 300,
      fixed: 'left',
      customRender: (text) => {
        return <a onClick={handleName}>{text.text}</a>;
      },
    },
    {
      dataIndex: 'pageClassify',
      title: '页面分类',
      width: 150,
      flag: 'TAG',
      tagList: pageClassifyList,
    },
    {
      dataIndex: 'reviewState',
      title: '审核状态',
      width: 150,
      flag: 'TAG',
      tagList: ReviewStateList,
    },
    {
      dataIndex: 'knowledgeName',
      title: '知识库',
      width: 300,
    },
    {
      dataIndex: 'reviewType',
      title: '审核类型',
      width: 100,
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
    {
      dataIndex: 'reviewPsn',
      title: '审核人',
      width: 100,
      sorter: true,
    },
    {
      dataIndex: 'reviewTime',
      title: '审核时间',
      width: 200,
      sorter: true,
    },
    {
      dataIndex: 'memo',
      title: '审核原因',
      width: 200,
    },
  ];
}

export function createActionColumn(record, handleEdit: Function): ActionItem[] {
  return [
    {
      label: '审核',
      onClick: handleEdit.bind(null, [record.id]),
    },
  ];
}
