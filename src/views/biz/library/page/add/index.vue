<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-17 16:49:54
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-22 18:15:15
 * @FilePath: \knowledge-web\src\views\examples\page\add\index.vue
 * @Description: 新增弹窗
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="页面审核"
    @ok="handleOk"
    :destroy-on-close="true"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { createSchemas } from './data';
  import { ReviewState } from '/@/enums/biz/libraryEnum';

  // emit
  const emit = defineEmits(['success']);

  // props
  const props = defineProps<{
    reviewId: string[] | undefined;
  }>();

  // form
  const [registerForm, { validateFields, updateSchema }] = useForm({
    schemas: createSchemas(reviewChange),
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
    labelWidth: 100,
  });

  // 确定
  const [registerModal, { setModalProps }] = useModal();
  async function handleOk() {
    const value = await validateFields();
    if (value) {
      try {
        setModalProps({
          confirmLoading: true,
        });
        console.log('审核接口', props.reviewId);
        emit('success');
      } finally {
        setModalProps({
          confirmLoading: false,
        });
      }
    }
  }

  // 切换审核结果，驳回时审核原因必填
  function reviewChange(val) {
    if (val.target.value === ReviewState.reviewFail) {
      updateSchema([
        {
          field: 'memo',
          rules: [{ required: true }],
        },
      ]);
    } else {
      updateSchema([
        {
          field: 'memo',
          rules: [{ required: false }],
        },
      ]);
    }
  }
</script>
