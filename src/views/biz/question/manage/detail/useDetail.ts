import { shallowReactive, nextTick } from 'vue';
import { QuestionListItem } from '/@/api/biz/question/model/listModel';
import { useDrawer } from '/@/components/Drawer';

export function useDetail() {
  // detailDrawer
  const [registerDetail, { openDrawer }] = useDrawer();
  // 详情
  const detailState = shallowReactive<{ record: QuestionListItem | undefined }>({
    record: undefined,
  });
  function handleDatail(record: QuestionListItem) {
    detailState.record = record;
    nextTick(() => {
      openDrawer();
    });
  }

  return {
    registerDetail,
    detailState,
    handleDatail,
  };
}
