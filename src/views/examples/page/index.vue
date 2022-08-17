<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-17 14:44:03
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-23 11:32:03
 * @FilePath: \knowledge-web\src\views\examples\page\index.vue
 * @Description: 页面模板
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
      <a-button type="success" class="mr-2" @click="openAddModal"> 新建知识库 </a-button>
      <a-button type="error" class="mr-2" @click="handleDelete(getSelectRowKeys())">
        删除
      </a-button>
    </template>
  </BasicTable>
  <Add
    @register="registerModal"
    :type="modalTypeRef"
    :record="addRecordRef"
    @success="closeAddModal(reload)"
  />
  <Detail @register="registerDrawer" :record="recordRef" />
</template>
<script lang="ts" setup>
  import { createBasicColumns, createActionColumn, createSchemas } from './data';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useRouter } from 'vue-router';
  import { useDetail } from './detail/useDetail';
  import { useAdd } from './add/useAdd';
  import { useDelete } from './useDelete';
  // component
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import Add from './add/index.vue';
  import Detail from './detail/index.vue';

  // api
  import { getKnowledgeListData } from '/@/api/biz/library/knowledge';

  // 新增/编辑弹窗
  const { registerModal, openAddModal, modalTypeRef, handleEdit, addRecordRef, closeAddModal } =
    useAdd();

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
    api: getKnowledgeListData,
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

  // 详情
  const { registerDrawer, recordRef, handleDatail } = useDetail();

  // 删除
  const { handleDelete } = useDelete(reload);
</script>
