<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 10:59:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-21 14:57:30
 * @FilePath: \knowledge-web\src\views\biz\library\knowledgeBase\detailDrawer\index.vue
 * @Description: 分类详情
-->
<template>
  <BasicModal v-bind="$attrs" title="分类详情">
    <!-- <Spin :spinning="loadingRef"> -->
    <Description :column="1" :data="unref(props.record)" :schema="createDesSchemas()" />
    <!-- </Spin> -->
  </BasicModal>
</template>
<script lang="ts" setup>
  import { unref } from 'vue';
  import { BasicModal } from '/@/components/Modal';
  import { Description } from '/@/components/Description/index';
  import { createDesSchemas } from './data';
  import { ClassifyItem } from '/@/api/biz/system/model/classifyModel';

  const props = defineProps<{
    record: ClassifyItem | undefined;
  }>();
</script>
