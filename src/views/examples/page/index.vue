<!--
 * @LastEditTime: 2022-08-31 10:23:46
 * @Description: 表格列表页
-->

<template>
  <BasicTable @register="registerTable">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <TableAction
          :actions="createActionColumn(record, handleDatail, handleEdit, handleDelete)"
        />
      </template>
    </template>
    <template #toolbar>
      <a-button type="success" class="mr-2" @click="handleAdd"> 新增 </a-button>
      <a-button type="error" class="mr-2" @click="handleMultiDelete"> 删除 </a-button>
    </template>
  </BasicTable>
  <Add @register="registerAdd" v-bind="addState" @success="reload" />
  <Detail @register="registerDetail" v-bind="detailState" />
</template>
<script lang="ts" setup name="ExamplePage">
  import { createBasicColumns, createActionColumn, createSchemas } from './data';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useRouter } from 'vue-router';
  // component
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import Add from './add/index.vue';
  import { useAdd } from './add/useAdd';

  import Detail from './detail/index.vue';
  import { useDetail } from './detail/useDetail';

  import { demoListApi } from '/@/api/demo/table';
  import { useDelete } from './useDelete';

  // table
  const [registerTable, { getSelectRowKeys, reload }] = useTable({
    useSearchForm: true,
    formConfig: {
      schemas: createSchemas(),
      baseColProps: { span: 8 },
    },
    columns: createBasicColumns(handleName),
    rowSelection: { type: 'checkbox' },
    clickToRowSelect: false,
    rowKey: 'id',
    api: demoListApi,
    actionColumn: {
      width: 180,
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
  // 新增/编辑弹窗
  const { registerAdd, handleAdd, handleEdit, addState } = useAdd();
  // 详情
  const { registerDetail, detailState, handleDatail } = useDetail();

  // 删除
  const { handleDelete, handleMultiDelete } = useDelete(reload, getSelectRowKeys);
</script>
