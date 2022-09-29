<template>
  <BasicModal
    @register="register"
    v-bind="$attrs"
    title="问答回复"
    width="1000px"
    okText="发布"
    @ok="handleOk"
    @visible-change="handleVisible"
  >
    <Tinymce v-model="state.content" width="100%" :height="350" />
    <!-- <div class="mt-2">
      <Checkbox v-model:checked="state.isAnonymous">匿名提问</Checkbox>
    </div> -->
  </BasicModal>
</template>
<script lang="ts" setup name="Answer">
  import { reactive } from 'vue';
  import type { PropType } from 'vue';

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Tinymce } from '/@/components/Tinymce/index';
  // 匿名：二期
  // import { Checkbox } from 'ant-design-vue';
  import { ForumCommentDTOItem, QuestionListItem } from '/@/api/biz/question/model/listModel';
  import { commentSaveApi } from '/@/api/biz/question/list';
  // emit
  const emit = defineEmits(['success', 'register']);
  const props = defineProps({
    record: { type: Object as PropType<QuestionListItem> },
    comment: { type: Object as PropType<ForumCommentDTOItem> },
  });
  const state = reactive<{
    content: string;
    // isAnonymous: boolean;
  }>({
    content: '',
    // isAnonymous: false,
  });

  // 打开弹窗
  function handleVisible(visible) {
    if (visible) {
      // 重新打开：清空数据
      state.content = '';
    }
  }

  const [register, { setModalProps, closeModal }] = useModalInner();

  // 发布
  async function handleOk() {
    try {
      setModalProps({ loading: true, confirmLoading: true });
      // console.log(props.record);
      const { themeId = '' } = props.record || {};
      if (props.comment) {
        // 有评论：则为回复; 最多二级
        const { commentId, prntCommentId } = props.comment;
        await commentSaveApi({
          forumThemeId: themeId,
          content: state.content,
          prntCommentId: prntCommentId === '0' ? commentId : prntCommentId,
          answeredId: commentId,
        });
      } else {
        await commentSaveApi({ forumThemeId: themeId, content: state.content, prntCommentId: '' });
      }
      emit('success');
      closeModal();
    } finally {
      setModalProps({ loading: false, confirmLoading: false });
    }
  }
</script>
