<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-17 14:44:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-23 15:47:24
 * @FilePath: \knowledge-web\src\views\examples\page\index.vue
 * @Description: 分类管理
-->
<template>
  <Row>
    <Col :span="6" class="pl-4 py-4">
      <div class="bg-white h-full">
        <Spin :spinning="treeLoadingRef">
          <BasicTree
            title="分类列表"
            :treeData="treeDataRef"
            :actionList="actionList"
            search
            ref="classifyTreeRef"
            defaultExpandAll
            @select="selectTree"
            :fieldNames="{
              key: 'cateId',
            }"
          />
        </Spin>
      </div>
    </Col>
    <Col :span="18">
      <BasicTable @register="registerTable">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction :actions="createActionColumn(record, handleEdit, handleDelete)" />
          </template>
        </template>
      </BasicTable>
    </Col>
  </Row>
  <Add
    @register="registerModal"
    :type="modalTypeRef"
    :record="(addRecordRef as ClassifyItem)"
    @success="closeAddModal(reloadTableAndTree)"
  />
  <Detail @register="registerDetailModal" :record="recordRef" />
</template>
<script lang="ts" setup name="ClassfyManage">
  import { onBeforeMount } from 'vue';
  import { createBasicColumns, createActionColumn, createSchemas } from './data';
  import { useDetail } from './detail/useDetail';
  import { useAdd } from './add/useAdd';
  import { useDelete } from './useDelete';
  import { useTree } from './useTree';
  // component
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import Add from './add/index.vue';
  import Detail from './detail/index.vue';
  import { Row, Col, Spin } from 'ant-design-vue';
  import { BasicTree } from '/@/components/Tree/index';

  // api
  import { getClassifyListApi } from '/@/api/biz/system/classify';
  import { ClassifyItem } from '/@/api/biz/system/model/classifyModel';

  // 新增/编辑弹窗
  const { registerModal, modalTypeRef, openAddModal, handleEdit, addRecordRef, closeAddModal } =
    useAdd();

  // 详情
  const { registerDetailModal, recordRef, handleDatail } = useDetail();

  // table
  const [registerTable, { reload }] = useTable({
    useSearchForm: true,
    formConfig: {
      schemas: createSchemas(),
      baseColProps: { span: 8 },
    },
    columns: createBasicColumns(handleDatail),
    clickToRowSelect: false,
    rowKey: 'id',
    api: getClassifyListApi,
    actionColumn: {
      width: 100,
      title: '操作',
      align: 'left',
      dataIndex: 'action',
    },
  });

  // 删除
  const { handleDelete } = useDelete(reloadTableAndTree);

  // tree
  const { treeLoadingRef, treeDataRef, classifyTreeRef, getTreeData, actionList, selectTree } =
    useTree(openAddModal, handleEdit, handleDelete, reload);
  onBeforeMount(() => {
    getTreeData();
  });

  // 刷新树和表格
  function reloadTableAndTree() {
    reload({ page: 1 });
    getTreeData();
  }
</script>
