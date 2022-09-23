<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-17 16:49:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-23 16:45:26
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
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { createSchemas } from './data';
  // api
  import { cateSaveApi } from '/@/api/biz/system/classify';
  import { ClassifyItem } from '/@/api/biz/system/model/classifyModel';

  // emit
  const emit = defineEmits(['success']);

  // props
  const props = defineProps<{
    type: 'add' | 'edit';
    record: ClassifyItem;
  }>();

  // form
  const [registerForm, { setFieldsValue, validateFields, updateSchema }] = useForm({
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
          nextTick(() => {
            if (props.record.cateConfig) {
              const { color, isSolid } = JSON.parse(props.record.cateConfig);
              updateSchema([
                {
                  field: 'cateConfig',
                  componentProps: {
                    defaultColor: color,
                    isSolid: isSolid,
                  },
                },
              ]);
            }
          });
        } else {
          setFieldsValue({ prntCateName: props.record?.cateName });
        }
      });
    }
  }

  // 确定
  const [registerModal, { setModalProps }] = useModalInner();
  async function handleOk() {
    // const data = getFieldsValue();
    const value = await validateFields();
    if (value) {
      try {
        setModalProps({
          confirmLoading: true,
        });
        const params = {
          cateName: value.cateName,
          descInfo: value.descInfo,
          cateConfig: value.cateConfig,
          cateType: props.record.cateType,
        };
        if (props.type === 'add') {
          await cateSaveApi({
            ...params,
            prntCateId: props.record.cateId,
            prntCateName: props.record.cateName,
          });
        } else {
          await cateSaveApi({
            ...params,
            cateId: props.record.cateId,
            prntCateId: props.record.prntCateId,
            prntCateName: props.record.prntCateName,
          });
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
