<!--
 * @LastEditTime: 2022-08-31 11:48:40
 * @Description: 问答管理
-->
<template>
  <BasicTable @register="registerTable">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <TableAction
          :actions="createActionColumn(record, handleDatail, handleHide, handleDelete)"
        />
      </template>
    </template>
    <template #toolbar>
      <a-button type="error" class="mr-2" @click="handleMultiDelete"> 删除 </a-button>
    </template>
  </BasicTable>
  <Detail @register="registerDetail" v-bind="detailState" @success="reload" />
</template>
<script lang="ts" setup name="QuestionManage">
  import { createBasicColumns, createActionColumn, createSchemas } from './data';
  // import { PageEnum } from '/@/enums/pageEnum';
  // import { useRouter } from 'vue-router';
  import { useDetail } from './detail/useDetail';
  import { useDelete } from './useDelete';
  // component
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import Detail from './detail/index.vue';
  import { getQuestionManageListApi } from '/@/api/biz/question/list';

  // table
  const [registerTable, { getSelectRowKeys, reload }] = useTable({
    useSearchForm: true,
    formConfig: {
      schemas: createSchemas(),
      baseColProps: { span: 8 },
      labelWidth: 100,
    },
    columns: createBasicColumns(),
    rowSelection: { type: 'checkbox' },
    clickToRowSelect: false,
    rowKey: 'themeId',
    api: getQuestionManageListApi,
    actionColumn: {
      width: 180,
      title: '操作',
      align: 'left',
      dataIndex: 'action',
    },
  });

  // 点击名称
  // const { push } = useRouter();
  // function handleName() {
  //   // 页面跳转
  //   push(PageEnum.BASE_HOME);
  // }

  // 详情
  const { registerDetail, detailState, handleDatail } = useDetail();

  // 删除
  const { handleDelete, handleMultiDelete, handleHide } = useDelete(reload, getSelectRowKeys);
</script>
