<!--
 * @LastEditTime: 2022-09-28 17:24:56
 * @Description: 详情
-->

<template>
  <BasicDrawer
    @register="register"
    @visible-change="handleVisibleChange"
    v-bind="$attrs"
    title="知识库详情"
    width="90%"
    :is-detail="true"
  >
    <QuestionDetail
      ref="detailVueRef"
      :id="props.record?.themeId || ''"
      :is-manage="true"
      :immediate="false"
      @success="handleSuccess"
    />
  </BasicDrawer>
</template>
<script lang="ts" setup name="Detail">
  import { nextTick, ref } from 'vue';
  import type { PropType } from 'vue';

  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import QuestionDetail from '/@/views/biz/question/detail/index.vue';

  // api
  import { QuestionListItem } from '/@/api/biz/question/model/listModel';
  // emit
  const emit = defineEmits(['success', 'register']);
  // props
  const props = defineProps({
    record: { type: Object as PropType<QuestionListItem> },
  });
  const detailVueRef = ref<{ initData: () => void } | null>(null);
  const [register, { closeDrawer }] = useDrawerInner();

  async function handleVisibleChange(visible) {
    if (visible) {
      // console.log(props.record, props.record?.themeId);
      nextTick(() => {
        // 刷新数据
        detailVueRef.value?.initData();
      });
    }
  }
  // 删除问答：成功关闭
  function handleSuccess() {
    emit('success');
    closeDrawer();
  }
</script>
