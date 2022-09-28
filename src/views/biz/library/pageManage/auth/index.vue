<!--
 * @LastEditTime: 2022-09-28 11:41:15
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
    :use-wrapper="false"
    :min-height="100"
  >
    <BasicForm @register="registerForm">
      <template #saveUserAuthsSlot="{ model, field }"> 表格{{ model[field] }} </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup name="Move">
  import { nextTick, shallowReactive } from 'vue';
  import type { PropType } from 'vue';
  // import { Tree } from 'ant-design-vue';
  import { useLoading } from '/@/components/Loading';

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { createSchemas } from './data';

  import { KnowledgeItem } from '/@/api/biz/library/model/knowledgeModel';
  import { PageRecyclingPublicTree } from '../types';
  import { PageTreeItem } from '/@/api/biz/library/model/pageManage';
  import { getPageTreeListData, movePage } from '/@/api/biz/library/pageManage';

  // emit
  const emit = defineEmits(['success', 'register']);

  // props
  const props = defineProps({
    selectedPage: { type: Object as PropType<PageRecyclingPublicTree> },
    selectedSpaceItem: { type: Object as PropType<KnowledgeItem> },
    knowledges: { type: Array as PropType<KnowledgeItem[]> },
    path: {
      type: String,
    },
  });

  // form
  const [registerForm, { setFieldsValue, validateFields, updateSchema }] = useForm({
    schemas: createSchemas(),
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
    labelWidth: 100,
  });
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '加载中...',
  });
  const state = shallowReactive<{ treeData: PageTreeItem[]; selectPath: string }>({
    treeData: [],
    selectPath: '',
  });
  async function handleSpaceIdChange(value: string) {
    // console.log(e);
    try {
      openFullLoading();
      const data = await getPageTreeListData({ spaceId: value });
      state.treeData = data;
    } finally {
      closeFullLoading();
    }
  }

  // 打开弹窗
  function handleVisible(visible: boolean) {
    if (visible) {
      // console.log(props.knowledges);
      const { spaceId = '' } = props.selectedSpaceItem || {};
      handleSpaceIdChange(spaceId);

      nextTick(() => {
        updateSchema({
          field: 'spaceId',
          componentProps: {
            onChange: handleSpaceIdChange,
            options: props.knowledges?.map((item) => {
              return {
                value: item.spaceId,
                label: item.name,
              };
            }),
          },
        });
        setFieldsValue({ spaceId });
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
    const { pageId: keys, spaceId } = value || {};
    const [parentId] = keys || [];
    const { pageId = '' } = props.selectedPage || {};
    try {
      changeOkLoading(true);
      await movePage({ pageId, parentId, spaceId });

      closeModal();
      emit('success');
    } finally {
      changeOkLoading(false);
    }
  }
</script>
