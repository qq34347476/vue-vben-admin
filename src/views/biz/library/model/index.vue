<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-17 14:44:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-27 10:05:44
 * @FilePath: \knowledge-web\src\views\examples\page\index.vue
 * @Description: 页面模板
-->
<template>
  <BasicTable @register="registerTable">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <TableAction
          :actions="
            createActionColumn(record, handleDatail, handleEdit, handleEnable, handleDelete)
          "
        />
      </template>
    </template>
    <template #toolbar>
      <a-button type="success" class="mr-2" @click="openAddModal"> 新建模板 </a-button>
    </template>
  </BasicTable>
  <Add
    @register="registerModal"
    :type="modalTypeRef"
    :record="addRecordRef"
    @success="closeAddModal(reload)"
  />
</template>
<script lang="ts" setup>
  import { createBasicColumns, createActionColumn, createSchemas } from './data';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useRouter } from 'vue-router';
  import { useAdd } from './add/useAdd';
  import { useMessage } from '/@/hooks/web/useMessage';

  // component
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import Add from './add/index.vue';

  // api
  import { getModelListApi, modelChangeAbleApi, modelDeleteApi } from '/@/api/biz/library/model';
  import { ModelItem } from '/@/api/biz/library/model/model';

  // 新增/编辑弹窗
  const { registerModal, openAddModal, modalTypeRef, handleEdit, addRecordRef, closeAddModal } =
    useAdd();

  // table
  const [registerTable, { reload }] = useTable({
    useSearchForm: true,
    formConfig: {
      schemas: createSchemas(),
      baseColProps: { span: 8 },
      labelWidth: 100,
    },
    columns: createBasicColumns(handleName),
    clickToRowSelect: false,
    rowKey: 'id',
    api: getModelListApi,
    actionColumn: {
      width: 200,
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
  function handleDatail(record: ModelItem) {
    console.log(record);
    push(PageEnum.BASE_HOME);
  }

  // 启用/停用
  async function handleEnable(record: ModelItem) {
    await modelChangeAbleApi([record.pageTmplId]);
    reload({ page: 1 });
  }

  // 删除
  const { createConfirm, createMessage } = useMessage();
  function handleDelete(rowKeys: string[], record: ModelItem) {
    if (rowKeys.length) {
      createConfirm({
        iconType: 'warning',
        title: '确认操作',
        content: `确认将模板<span class="text-blue-500">【${record.templeteName}】</span>删除吗，删除后新建页面无法再引用。`,
        onOk: async () => {
          await modelDeleteApi(rowKeys);
          reload({ page: 1 });
        },
      });
    } else {
      createMessage.warn('请先勾选要删除的知识库');
    }
  }
</script>
