<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 10:59:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-26 15:31:03
 * @FilePath: \knowledge-web\src\views\biz\library\knowledgeBase\detailDrawer\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="register"
    title="知识库详情"
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
    title: '用户列表',
    columns: createBasicColumns(),
    api: demoListApi,
  });
</script>
