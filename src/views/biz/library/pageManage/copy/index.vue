<!--
 * @LastEditTime: 2022-09-27 13:49:39
 * @Description: 页面复制
-->

<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="页面复制"
    @ok="handleOk"
    @visible-change="handleVisible"
    :destroy-on-close="true"
    :use-wrapper="false"
    :min-height="100"
  >
    <BasicForm @register="registerForm">
      <template #pageIdSlot="{ model, field }">
        <Tree
          :block-node="true"
          v-model:selectedKeys="model[field]"
          :tree-data="state.treeData"
          :fieldNames="{ children: 'children', title: 'pageTitle', key: 'pageId' }"
          @select="handlePageSelect"
        />
        <div class="pt-3 text-xs">
          <Checkbox v-model:checked="state.saveChildren">包含子页面一起复制</Checkbox>
        </div>
        <div class="py-2 text-xs">
          <Checkbox v-model:checked="state.saveTag">包含页面标签一起复制</Checkbox>
        </div>
      </template>
    </BasicForm>
    <div class="border-t-1 pt-3">
      <p>旧页面位置：{{ props.path }}</p>
      <p>新页面位置：{{ state.selectPath }}</p>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup name="Copy">
  import { nextTick, shallowReactive } from 'vue';
  import type { PropType } from 'vue';
  import { Tree, Checkbox } from 'ant-design-vue';
  import { useLoading } from '/@/components/Loading';

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { createSchemas } from './data';

  import { KnowledgeItem } from '/@/api/biz/library/model/knowledgeModel';
  import { PageRecyclingPublicTree } from '../types';
  import { PageTreeItem } from '/@/api/biz/library/model/pageManage';
  import { copyPage, getPageTreeListData } from '/@/api/biz/library/pageManage';
  import { findPath } from '/@/utils/helper/treeHelper';

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
  const [registerForm, { setFieldsValue, validateFields, updateSchema, getFieldsValue }] = useForm({
    schemas: createSchemas(),
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
    labelWidth: 100,
  });
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '加载中...',
  });
  const state = shallowReactive<{
    treeData: PageTreeItem[];
    selectPath: string;
    saveChildren: boolean;
    saveTag: boolean;
  }>({
    treeData: [],
    selectPath: '',
    saveChildren: false,
    saveTag: false,
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
  function handlePageSelect(selectedKeys) {
    // console.log(selectedKeys);
    const { spaceId } = getFieldsValue();
    const find = props.knowledges?.find((item) => item.spaceId === spaceId);
    const list =
      findPath<PageTreeItem>(state.treeData, (item) => item.pageId === selectedKeys[0])?.map(
        (item) => item.pageTitle,
      ) || [];

    find && list.unshift(find.name);
    state.selectPath = list.join(' / ') || '';
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
      await copyPage({ pageId, parentId, spaceId });

      closeModal();
      emit('success');
    } finally {
      changeOkLoading(false);
    }
  }
</script>
