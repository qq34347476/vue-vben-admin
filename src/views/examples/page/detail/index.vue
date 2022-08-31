<!--
 * @LastEditTime: 2022-08-31 11:11:21
 * @Description: 详情
-->

<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="register"
    title="详情"
    width="90%"
    :is-detail="true"
    @visible-change="handleVisibleChange"
  >
    <Description title="基本信息" :column="2" :data="detailRef" :schema="createDesSchemas()" />
    <BasicTable @register="registerTable" />
  </BasicDrawer>
</template>
<script lang="ts" setup name="Detail">
  import { ref } from 'vue';
  import type { PropType } from 'vue';

  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Description } from '/@/components/Description/index';
  import { createDesSchemas, createBasicColumns } from './data';
  import { BasicTable, useTable } from '/@/components/Table';

  // api
  import { DemoListItem } from '/@/api/demo/model/tableModel';
  import { demoDetailApi, demoListApi } from '/@/api/demo/table';
  // expose
  //   defineExpose({
  //   open
  // })
  // props
  const props = defineProps({
    record: { type: Object as PropType<DemoListItem> },
  });
  const [register, { changeLoading }] = useDrawerInner();

  // drawer
  const detailRef = ref<DemoListItem>();
  async function handleVisibleChange(visible) {
    if (visible) {
      try {
        changeLoading(true);
        detailRef.value = await demoDetailApi({ id: props.record?.id || '' });
      } finally {
        changeLoading(false);
      }
    }
  }

  // table
  const [registerTable] = useTable({
    title: '列表',
    columns: createBasicColumns(),
    api: demoListApi,
  });
</script>
