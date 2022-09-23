<!--
 * @LastEditTime: 2022-09-23 09:41:14
 * @Description: 新增/编辑
-->

<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="props.type === 'add' ? '新增' : '编辑'"
    @ok="handleOk"
    @visible-change="handleVisible"
    :destroy-on-close="true"
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

  // api
  import { tagSaveApi } from '/@/api/biz/library/tag';
  import { TagItem } from '/@/api/biz/library/model/tag';

  // emit
  const emit = defineEmits(['success', 'register']);

  // props
  const props = defineProps({
    record: { type: Object as PropType<TagItem> },
    type: { type: String as PropType<'add' | 'edit'> },
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
    if (value) {
      changeOkLoading(true);
      try {
        if (props.type === 'add') {
          await tagSaveApi(value);
        } else {
          await tagSaveApi({ ...value, tageId: props.record?.tageId });
        }
        closeModal();
        emit('success');
      } finally {
        changeOkLoading(false);
      }
    }
  }
</script>
