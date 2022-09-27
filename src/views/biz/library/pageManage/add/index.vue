<!--
 * @LastEditTime: 2022-09-27 15:34:08
 * @Description: 新增/编辑 标题
-->

<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="props.type === 'add' ? '新增页面' : '编辑'"
    @ok="handleOk"
    @visible-change="handleVisible"
    :destroy-on-close="true"
    :use-wrapper="false"
    :min-height="100"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup name="Add">
  import { nextTick } from 'vue';
  import type { PropType } from 'vue';

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { createSchemas } from './data';
  import { PageTreeItem, CreateNodeEditPageParams } from '/@/api/biz/library/model/pageManage';
  import { createNodeEditPage, pageSave } from '/@/api/biz/library/pageManage';
  import { PageTypeEnum, CorrespondSortEnum } from '/@/enums/biz/libraryEnum';

  // emit
  const emit = defineEmits(['success', 'register']);

  // props
  const props = defineProps({
    record: { type: Object as PropType<PageTreeItem> },
    type: { type: String as PropType<'add' | 'edit'> },
    spaceId: { type: String },
    correspondSort: { type: Object as PropType<CorrespondSortEnum> },
  });

  // form
  const [registerForm, { setFieldsValue, validateFields }] = useForm({
    schemas: createSchemas(),
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
    labelWidth: 100,
  });

  // 打开弹窗
  function handleVisible(visible) {
    if (visible) {
      console.log(props.type);

      if (props.type === 'edit') {
        nextTick(() => {
          setFieldsValue(props.record);
        });
      }
    }
  }

  // 确定
  const [register, { changeOkLoading, closeModal }] = useModalInner();
  async function handleOk() {
    const value = await validateFields();
    if (!value) {
      return;
    }
    if (!props.spaceId) {
      return;
    }
    try {
      changeOkLoading(true);
      const { id } = props.record || {};
      if (props.type === 'add') {
        // TODO: up/down
        const params: CreateNodeEditPageParams = {
          pageType: PageTypeEnum.DRAFT,
          spaceId: props.spaceId,
          ...value,
          // parentId: id || null,
        };
        if (!props.correspondSort) {
          params.parentId = id;
        } else {
          params.correspondSort = props.correspondSort;
          params.correspondId = id;
        }
        await createNodeEditPage(params);
      } else {
        console.log('编辑接口');
        await pageSave({
          pageId: id,
          ...value,
        });
      }
      // await demoDetailApi({});
      closeModal();
      emit('success');
    } finally {
      changeOkLoading(false);
    }
  }
</script>
