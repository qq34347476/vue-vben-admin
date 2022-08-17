<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 10:59:49
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-19 17:31:48
 * @FilePath: \knowledge-web\src\views\biz\library\knowledgeBase\detailDrawer\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    title="新增知识库"
    width="90%"
    :is-detail="true"
    @visible-change="handleVisibleChange"
    showFooter
    @ok="handleOk"
    :destroy-on-close="true"
  >
    <Spin :spinning="unref(loadingRef)">
      <div class="common-title mb-2">基本信息</div>
      <BasicForm @register="registerForm">
        <template #switch>
          <Switch
            :checked="unref(switchValRef)"
            @change="handelSwitchChange"
            checked-children="开"
            un-checked-children="关"
          />
          <span class="ml-10" v-show="unref(switchValRef)">
            <Checkbox :checked="true" disabled>新增</Checkbox>
            <Checkbox v-model:checked="editCheckedRef" :disabled="props.type === 'edit'"
              >编辑</Checkbox
            >
          </span>
        </template>
      </BasicForm>
      <BasicTable @register="registerTable" />
    </Spin>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, unref, nextTick } from 'vue';
  import { BasicDrawer } from '/@/components/Drawer';
  import { createSchemas, createBasicColumns } from './data';
  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicForm, useForm } from '/@/components/Form';
  import { Switch, Checkbox, Spin } from 'ant-design-vue';

  // api
  import { getKnowledgeDetailData, getKnowledgeUserListData } from '/@/api/biz/library/knowledge';
  import { KnowledgeItem } from '/@/api/biz/library/model/knowledgeModel';

  const props = defineProps<{
    knowledgeRecord: KnowledgeItem | undefined;
    type: String;
  }>();

  // form
  const [registerForm, { setFieldsValue }] = useForm({
    schemas: createSchemas(),
    baseColProps: { span: 8 },
    labelWidth: 140,
    showActionButtonGroup: false,
  });
  // 审核开关
  const switchValRef = ref(false);
  const editCheckedRef = ref(false);
  function handelSwitchChange(val) {
    switchValRef.value = val;
  }

  // table
  const [registerTable, { setSelectedRowKeys }] = useTable({
    title: '用户权限',
    columns: createBasicColumns(),
    api: getKnowledgeUserListData,
    rowKey: 'userId',
    rowSelection: { type: 'checkbox' },
    maxHeight: 290,
  });

  // drawer
  const loadingRef = ref(false);
  async function handleVisibleChange(visibel) {
    if (visibel) {
      if (props.type === 'edit') {
        loadingRef.value = true;
        try {
          const data = await getKnowledgeDetailData({ id: props.knowledgeRecord?.id || '' });
          setFieldsValue(data);
          switchValRef.value = data.switch === '1';
          editCheckedRef.value = data.edit === '1';
          nextTick(() => {
            setSelectedRowKeys(['zhangsan1']);
          });
        } finally {
          loadingRef.value = false;
        }
      }
    } else {
      switchValRef.value = false;
      editCheckedRef.value = false;
    }
  }
  // handleOk
  function handleOk() {
    console.log(132);
  }
</script>
