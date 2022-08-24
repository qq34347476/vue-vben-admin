<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-17 14:44:03
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-23 15:40:35
 * @FilePath: \knowledge-web\src\views\examples\page\index.vue
 * @Description: 页面模板
-->
<template>
  <!-- <BasicForm @register="registerForm" @submit="handelSearch" style="margin: 16px" /> -->
  <Tabs class="bg-white" style="margin: 16px; padding: 0 16px" @change="tabChange">
    <TabPane :key="ReviewState.unaudited" tab="待审核">
      <BasicTable style="padding: 0" @register="registerUnauditedTable">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction :actions="createActionColumn(record, openAddModal)" />
          </template>
        </template>
        <template #toolbar>
          <a-button
            type="primary"
            style="margin-right: 18px"
            @click="openAddModal(getSelectRowKeys())"
          >
            审核
          </a-button>
        </template>
      </BasicTable>
    </TabPane>
    <TabPane :key="ReviewState.reviewed" tab="已审核" forceRender>
      <BasicTable style="padding: 0" @register="registerReviewedTable" />
    </TabPane>
  </Tabs>
  <Add
    @register="registerModal"
    :reviewId="reviewIdRef"
    @success="closeAddModal(unauditedReload)"
  />
</template>
<script lang="ts" setup>
  import { nextTick, ref } from 'vue';
  import {
    createUnauditedColumns,
    createActionColumn,
    createUnauditedSchemas,
    createReviewedColumns,
    createReviewedSchemas,
  } from './data';
  import { PageEnum } from '/@/enums/pageEnum';
  import { ReviewState } from '/@/enums/biz/libraryEnum';
  import { useRouter } from 'vue-router';
  import { useAdd } from './add/useAdd';
  // component
  import { Tabs, TabPane } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  // import { BasicForm, useForm } from '/@/components/Form/index';
  import Add from './add/index.vue';

  // api
  import { getPageReviewListData, getPageClassifyListData } from '/@/api/biz/library/page';

  // form
  // const [registerForm, { setProps: setFormProps, getFieldsValue, resetFields }] = useForm({
  //   schemas: createUnauditedSchemas(),
  //   baseColProps: { span: 8 },
  //   labelWidth: 80,
  // });

  // tab
  const activeKeyRef = ref();
  function tabChange(activeKey: string) {
    activeKeyRef.value = activeKey;
    // resetFields();
    if (activeKey === ReviewState.reviewed) {
      nextTick(() => {
        reviewedReload();
        // setFormProps({
        //   schemas: createReviewedSchemas(),
        // });
      });
    } else {
      nextTick(() => {
        unauditedReload();
        // setFormProps({
        //   schemas: createUnauditedSchemas(),
        // });
      });
    }
  }

  // 新增/编辑弹窗
  const { registerModal, openAddModal, reviewIdRef, closeAddModal } = useAdd();

  // 获取页面分类标签
  const pageClassifyListRef = ref();
  async function getPageClassifyList() {
    const data = await getPageClassifyListData();
    pageClassifyListRef.value = data;
    setUnauditedTableProps({
      columns: createUnauditedColumns(handleName, data),
    });
    setReviewedTableProps({
      columns: createReviewedColumns(handleName, data),
    });
  }
  nextTick(() => {
    getPageClassifyList();
  });

  // table
  // 待审核
  const [
    registerUnauditedTable,
    { reload: unauditedReload, getSelectRowKeys, setProps: setUnauditedTableProps },
  ] = useTable({
    useSearchForm: true,
    formConfig: {
      schemas: createUnauditedSchemas(),
      baseColProps: { span: 8 },
      labelWidth: 80,
    },
    columns: createUnauditedColumns(handleName),
    rowSelection: { type: 'checkbox' },
    clickToRowSelect: false,
    rowKey: 'id',
    api: getPageReviewListData,
    actionColumn: {
      width: 60,
      title: '操作',
      align: 'left',
      dataIndex: 'action',
    },
  });
  // 已审核
  const [registerReviewedTable, { reload: reviewedReload, setProps: setReviewedTableProps }] =
    useTable({
      useSearchForm: true,
      formConfig: {
        schemas: createReviewedSchemas(),
        baseColProps: { span: 8 },
        labelWidth: 80,
      },
      columns: createReviewedColumns(handleName, pageClassifyListRef.value),
      clickToRowSelect: false,
      rowKey: 'id',
      api: getPageReviewListData,
      immediate: false,
    });

  // 点击名称
  const { push } = useRouter();
  function handleName() {
    // 页面跳转
    push(PageEnum.BASE_HOME);
  }
</script>
