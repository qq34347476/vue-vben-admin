<template>
  <BasicModal
    @register="register"
    v-bind="$attrs"
    title="问答回复"
    width="1000px"
    okText="发布"
    @ok="handleOk"
  >
    <Tinymce v-model="state.content" width="100%" :height="350" />
    <div class="mt-2">
      <Checkbox v-model:checked="state.isAnonymous">匿名提问</Checkbox>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import type { PropType } from 'vue';

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Tinymce } from '/@/components/Tinymce/index';
  import { Checkbox } from 'ant-design-vue';
  import { QuestionListItem } from '/@/api/biz/question/model/listModel';
  import { getQuestionListApi } from '/@/api/biz/question/list';
  const props = defineProps({
    record: { type: Object as PropType<QuestionListItem> },
  });
  const state = reactive<{
    content: string;
    isAnonymous: boolean;
  }>({
    content: '',
    isAnonymous: false,
  });
  const [register, { setModalProps }] = useModalInner();

  // 发布
  async function handleOk() {
    try {
      setModalProps({ loading: true, confirmLoading: true });
      console.log(props.record);
      await getQuestionListApi({ page: 1, pageSize: 10 });
    } finally {
      setModalProps({ loading: false, confirmLoading: false });
    }
  }
</script>
