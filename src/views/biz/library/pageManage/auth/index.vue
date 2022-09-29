<!--
 * @LastEditTime: 2022-09-29 11:40:22
 * @Description:权限设置
-->

<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="权限设置"
    @ok="handleOk"
    @visible-change="handleVisible"
    :destroy-on-close="true"
    width="60%"
  >
    <BasicForm @register="registerForm">
      <!-- ="{ model, field }" -->
      <template #saveUserAuthsSlot>
        <BasicTable @register="registerTable">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'look'">
              <Checkbox :checked="record.look" @change="handleChange('look', record, $event)" />
            </template>
            <template v-else-if="column.key === 'edit'">
              <Checkbox :checked="record.edit" @change="handleChange('edit', record, $event)" />
            </template>
          </template>
        </BasicTable>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup name="Move">
  import { nextTick, shallowReactive } from 'vue';
  import type { PropType } from 'vue';
  import { useLoading } from '/@/components/Loading';
  import { Checkbox } from 'ant-design-vue';

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { createSchemas, createBasicColumns } from './data';

  import { KnowledgeItem } from '/@/api/biz/library/model/knowledgeModel';
  import { PageRecyclingPublicTree } from '../types';
  // import { getPageTreeListData, movePage } from '/@/api/biz/library/pageManage';
  import { BasicTable, useTable } from '/@/components/Table';
  // api
  import { getTeamMenberListApi } from '/@/api/biz/library/knowledge';

  // emit
  const emit = defineEmits(['success', 'register']);

  // props
  const props = defineProps({
    selectedPage: { type: Object as PropType<PageRecyclingPublicTree> },
    selectedSpaceItem: { type: Object as PropType<KnowledgeItem> },
  });

  // form
  const [registerForm, { validateFields }] = useForm({
    schemas: createSchemas(handleAuthTypeChange),
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
    labelWidth: 100,
  });

  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '加载中...',
  });
  const state = shallowReactive<{ auth: string }>({
    auth: '',
  });
  const [registerTable, { reload }] = useTable({
    api: getTeamMenberListApi,
    columns: createBasicColumns(),
    immediate: false,
    // bordered: true,
  });
  // 权限设置变化
  async function handleAuthTypeChange(value: string) {
    console.log(value);
    try {
      openFullLoading();
      // reload({
      //   searchInfo: {
      //     spaceId: value,
      //   },
      // });
    } finally {
      closeFullLoading();
    }
  }
  // 权限变化
  function handleChange(type: 'look' | 'edit', record, value) {
    console.log(type, record, value);
  }
  // 打开弹窗
  function handleVisible(visible: boolean) {
    if (visible) {
      console.log(state);

      const { spaceId = '' } = props.selectedSpaceItem || {};
      // handleAuthTypeChange(spaceId);

      nextTick(() => {
        reload({
          searchInfo: {
            spaceId,
          },
        });
        // setFieldsValue({ spaceId });
      });
    }
  }

  // 确定
  const [register, { changeOkLoading, closeModal }] = useModalInner();
  async function handleOk() {
    const value = await validateFields();
    if (!value) {
      return;
    }
    console.log(value);

    try {
      changeOkLoading(true);
      // await movePage({ pageId, parentId, spaceId });

      closeModal();
      emit('success');
    } finally {
      changeOkLoading(false);
    }
  }
</script>
