<!--
 * @LastEditTime: 2022-09-23 11:07:10
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
    <Row>
      <Col :span="12">
        <Description
          style="padding: 0"
          title="标签信息"
          :column="1"
          :data="detailRef"
          :schema="createDesSchemas()"
        />
      </Col>
    </Row>

    <BasicTable @register="registerTable" />
  </BasicDrawer>
</template>
<script lang="ts" setup name="Detail">
  import { ref } from 'vue';
  import type { PropType } from 'vue';
  import { Row, Col } from 'ant-design-vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Description } from '/@/components/Description/index';
  import { createDesSchemas, createBasicColumns } from './data';
  import { BasicTable, useTable } from '/@/components/Table';

  // api
  import { getTagDetailApi } from '/@/api/biz/library/tag';
  import { TagItem, TagDetailPageItem, TagDetail } from '/@/api/biz/library/model/tag';

  const props = defineProps({
    record: { type: Object as PropType<TagItem> },
  });
  const [register, { changeLoading }] = useDrawerInner();

  // drawer
  const detailRef = ref<TagDetail>();
  const tableDataRef = ref<TagDetailPageItem[]>();
  async function handleVisibleChange(visible) {
    if (visible) {
      try {
        changeLoading(true);
        detailRef.value = await getTagDetailApi(props.record?.tageId || '');
        tableDataRef.value = detailRef.value.tagPageList;
      } finally {
        changeLoading(false);
      }
    }
  }

  // table
  const [registerTable] = useTable({
    title: '引用页面',
    columns: createBasicColumns(),
    dataSource: tableDataRef.value,
  });
</script>
