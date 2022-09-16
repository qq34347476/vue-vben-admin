<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-17 14:44:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-16 09:59:48
 * @FilePath: \knowledge-web\src\views\examples\page\index.vue
 * @Description: 草稿箱
-->
<template>
  <BasicTable @register="registerTable">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <TableAction :actions="createActionColumn(record, handleEdit, handleDelete)" />
      </template>
    </template>
  </BasicTable>
</template>
<script lang="ts" setup>
  import { createBasicColumns, createActionColumn, createSchemas } from './data';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useRouter } from 'vue-router';
  import { useDelete } from './useDelete';
  // component
  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  // api
  import { getUserDraftsListApi } from '/@/api/biz/user/drafts';

  // table
  const [registerTable, { reload }] = useTable({
    useSearchForm: true,
    formConfig: {
      schemas: createSchemas(),
      baseColProps: { span: 8 },
    },
    columns: createBasicColumns(handleName),
    rowSelection: { type: 'checkbox' },
    clickToRowSelect: false,
    rowKey: 'id',
    api: getUserDraftsListApi,
    actionColumn: {
      width: 100,
      title: '操作',
      align: 'left',
      dataIndex: 'action',
    },
  });

  // 点击名称
  const { push } = useRouter();
  function handleName() {
    // 页面跳转
    push(PageEnum.BASE_HOME);
  }

  // 详情
  function handleEdit(record) {
    console.log(record);
  }

  // 删除
  const { handleDelete } = useDelete(reload);
</script>
