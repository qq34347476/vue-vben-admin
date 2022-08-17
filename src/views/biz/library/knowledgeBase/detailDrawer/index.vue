<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 10:59:49
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-19 17:30:57
 * @FilePath: \knowledge-web\src\views\biz\library\knowledgeBase\detailDrawer\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    title="知识库详情"
    width="90%"
    :is-detail="true"
    @visible-change="handleVisibleChange"
  >
    <Spin :spinning="unref(loadingRef)">
      <Description :column="2" :data="unref(desDataRef)" :schema="createDesSchemas()" />
      <BasicTable @register="registerTable" />
    </Spin>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicDrawer } from '/@/components/Drawer';
  import { Description } from '/@/components/Description/index';
  import { createDesSchemas, createBasicColumns } from './data';
  import { BasicTable, useTable } from '/@/components/Table';
  import { Spin } from 'ant-design-vue';

  // api
  import { getKnowledgeDetailData, getKnowledgeUserListData } from '/@/api/biz/library/knowledge';
  import { KnowledgeItem } from '/@/api/biz/library/model/knowledgeModel';
  const props = defineProps<{
    knowledgeRecord: KnowledgeItem | undefined;
  }>();

  // drawer
  const desDataRef = ref<KnowledgeItem>();
  const loadingRef = ref(false);
  async function handleVisibleChange(visibel) {
    if (visibel) {
      loadingRef.value = true;
      try {
        desDataRef.value = await getKnowledgeDetailData({ id: props.knowledgeRecord?.id || '' });
      } finally {
        loadingRef.value = false;
      }
    }
  }

  // table
  const [registerTable] = useTable({
    title: '用户列表',
    columns: createBasicColumns(),
    api: getKnowledgeUserListData,
  });
</script>
