<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-17 16:49:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-26 16:17:36
 * @FilePath: \knowledge-web\src\views\examples\page\add\index.vue
 * @Description: 新增弹窗
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
  import { DemoListItem } from '/@/api/demo/model/tableModel';
  import { demoDetailApi } from '/@/api/demo/table';

  // emit
  const emit = defineEmits(['success']);

  // props
  const props = defineProps({
    record: { type: Object as PropType<DemoListItem> },
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
      try {
        if (props.type === 'add') {
          console.log('新增接口');
        } else {
          console.log('编辑接口');
        }
        changeOkLoading(true);
        await demoDetailApi({});
        closeModal();
        emit('success');
      } finally {
        changeOkLoading(false);
      }
    }
  }
</script>
