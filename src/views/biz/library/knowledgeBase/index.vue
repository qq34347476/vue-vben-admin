<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-12 14:10:27
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-19 15:14:35
 * @FilePath: \knowledge-web\src\views\biz\library\knowledgeBase\index.vue
 * @Description: 知识库
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="getActions(record)" />
        </template>
      </template>
      <template #toolbar v-if="props.type !== 'file'">
        <a-button
          type="success"
          v-if="props.type === 'effective'"
          class="mr-2"
          @click="addKnoledgeBase"
        >
          新建知识库
        </a-button>
        <a-button
          type="error"
          v-if="props.type === 'recycleBin'"
          class="mr-2"
          @click="handleForeverDelete(getSelectRowKeys())"
        >
          永久删除
        </a-button>
      </template>
    </BasicTable>
    <DetailDrawer @register="registerDrawer" :knowledge-record="knowledgeRecordRef" />
    <AddDrawer
      @register="registerAddDrawer"
      :knowledge-record="knowledgeRecordRef"
      :type="drawerTypeRef"
    />
  </div>
</template>
<script lang="ts" setup>
  // import { ref, watch } from 'vue';
  import {
    createBasicColumns,
    createSchemas,
    createEffActionColumn,
    createFileActionColumn,
    createRecycleActionColumn,
  } from './data';
  import { actionsFn } from './actionsFn';

  // compoent
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import DetailDrawer from './detailDrawer/index.vue';
  import AddDrawer from './addKnowledgeBase/index.vue';
  import { useDrawer } from '/@/components/Drawer';

  // api
  import { getKnowledgeListData } from '/@/api/biz/library/knowledge';

  const props = defineProps<{
    type: 'effective' | 'file' | 'recycleBin';
  }>();

  // Drawer
  const [registerDrawer, { openDrawer: openDetailDrawer }] = useDrawer();
  const [registerAddDrawer, { openDrawer: openAddDrawer }] = useDrawer();

  // table
  const [registerTable, { getSelectRowKeys }] = useTable({
    columns: createBasicColumns(),
    useSearchForm: true,
    formConfig: {
      labelWidth: 80,
      schemas: createSchemas(),
      baseColProps: { span: 8 },
    },
    api: getKnowledgeListData,
    actionColumn: {
      width: props.type === 'effective' ? 230 : 180,
      title: '操作',
      align: 'left',
      dataIndex: 'action',
    },
    rowSelection: props.type === 'recycleBin' ? { type: 'checkbox' } : undefined,
    clickToRowSelect: false,
  });
  // 展示操作列
  function getActions(record) {
    if (props.type === 'effective') {
      return createEffActionColumn(record, handelDetail, handleEdit, handleFile, handleCollection);
    } else if (props.type === 'file') {
      return createFileActionColumn(record, handelDetail, handleActive, handleDelete);
    } else {
      return createRecycleActionColumn(record, handelDetail, handleRecover, handleForeverDelete);
    }
  }
  // actionsFn
  const {
    knowledgeRecordRef,
    handelDetail,
    handleEdit,
    drawerTypeRef,
    handleFile,
    handleCollection,
    handleActive,
    handleDelete,
    handleRecover,
    handleForeverDelete,
  } = actionsFn(openDetailDrawer, openAddDrawer);

  // 新建知识库
  function addKnoledgeBase() {
    drawerTypeRef.value = 'add';
    openAddDrawer();
  }
</script>
