<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 10:59:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-24 18:10:39
 * @FilePath: \knowledge-web\src\views\biz\library\knowledgeBase\detailDrawer\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicModal v-bind="$attrs" title="分类详情" @visible-change="handleVisibleChange">
    <Spin :spinning="loadingRef">
      <Description :column="1" :data="unref(desDataRef)" :schema="createDesSchemas()" />
    </Spin>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicModal } from '/@/components/Modal';
  import { Description } from '/@/components/Description/index';
  import { createDesSchemas } from './data';
  import { Spin } from 'ant-design-vue';

  // api
  import { getClassifyDetail } from '/@/api/biz/system/classify';
  import { KnowledgeItem } from '/@/api/biz/library/model/knowledgeModel';
  const props = defineProps<{
    record: KnowledgeItem | undefined;
  }>();

  // drawer
  const desDataRef = ref();
  const loadingRef = ref(false);
  async function handleVisibleChange(visibel) {
    if (visibel) {
      loadingRef.value = true;
      try {
        desDataRef.value = await getClassifyDetail({ id: props.record?.id || '' });
      } finally {
        loadingRef.value = false;
      }
    }
  }
</script>
