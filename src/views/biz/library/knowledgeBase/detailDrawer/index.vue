<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 10:59:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-26 11:20:49
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
    :destroy-on-close="true"
  >
    <Spin :spinning="unref(loadingRef)">
      <div class="common-title">基本信息</div>
      <Description
        class="mx-4 mb-4"
        :column="2"
        :data="unref(desDataRef)"
        :schema="createDesSchemas()"
      />
      <div class="common-title">用户权限</div>
      <Tabs class="bg-white p-0" style="margin: 16px; padding: 0" type="card">
        <TabPane :key="1" tab="分组">
          <BasicTable @register="registerGroupTable" style="padding: 0" />
        </TabPane>
        <TabPane :key="2" tab="用户">
          <BasicTable @register="registerUserTable" style="padding: 0" />
        </TabPane>
      </Tabs>
    </Spin>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicDrawer } from '/@/components/Drawer';
  import { Description } from '/@/components/Description/index';
  import {
    createDesSchemas,
    createGroupColumns,
    createBasicColumns,
    createGroupSchemas,
    createUserSchemas,
  } from './data';
  import { BasicTable } from '/@/components/Table';
  import { Spin, Tabs, TabPane } from 'ant-design-vue';
  import { useTable } from '/@/components/Table';

  // api
  import {
    getKnowledgeDetailApi,
    getGroupInfoListApi,
    getTeamMenberListApi,
  } from '/@/api/biz/library/knowledge';
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
        desDataRef.value = await getKnowledgeDetailApi(props.knowledgeRecord?.spaceId || '');
      } finally {
        loadingRef.value = false;
      }
    }
  }
  // beforeFetch
  function beforeFetch(v) {
    return {
      ...v,
      spaceId: props.knowledgeRecord?.spaceId || '',
    };
  }

  // 分组table
  const [registerGroupTable] = useTable({
    useSearchForm: true,
    formConfig: {
      schemas: createGroupSchemas(),
      baseColProps: { span: 8 },
      actionColOptions: { span: 16 },
    },
    columns: createGroupColumns(),
    api: getGroupInfoListApi,
    beforeFetch: beforeFetch,
    scroll: {
      y: 470,
    },
  });

  // 用户table
  const [registerUserTable] = useTable({
    useSearchForm: true,
    formConfig: {
      schemas: createUserSchemas(),
      baseColProps: { span: 8 },
      actionColOptions: { span: 16 },
    },
    columns: createBasicColumns(),
    api: getTeamMenberListApi,
    beforeFetch: beforeFetch,
    scroll: {
      y: 470,
    },
  });
</script>
