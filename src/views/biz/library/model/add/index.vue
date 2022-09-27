<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-17 16:49:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-26 17:39:34
 * @FilePath: \knowledge-web\src\views\examples\page\add\index.vue
 * @Description: 新增弹窗
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="props.type === 'add' ? '新增' : '编辑'"
    @ok="handleOk"
    @visible-change="handleVisible"
    :destroy-on-close="true"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { nextTick } from 'vue';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { createSchemas } from './data';
  import { KnowledgeItem } from '/@/api/biz/library/model/knowledgeModel';
  // api
  import { modelSaveApi } from '/@/api/biz/library/model';

  // emit
  const emit = defineEmits(['success']);

  // props
  const props = defineProps<{
    type: 'add' | 'edit';
    record: KnowledgeItem | undefined;
  }>();

  // form
  const [registerForm, { setFieldsValue, validateFields }] = useForm({
    schemas: createSchemas(),
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
    labelWidth: 100,
  });

  // 打开弹窗
  function handleVisible(visibel) {
    if (visibel) {
      nextTick(() => {
        if (props.type === 'edit') {
          setFieldsValue(props.record);
        }
      });
    }
  }

  // 确定
  const [registerModal, { setModalProps }] = useModal();
  async function handleOk() {
    const value = await validateFields();
    if (value) {
      try {
        setModalProps({
          confirmLoading: true,
        });
        if (props.type === 'add') {
          await modelSaveApi(value);
        } else {
          console.log('编辑接口');
        }
        emit('success');
      } finally {
        setModalProps({
          confirmLoading: false,
        });
      }
    }
  }
</script>
