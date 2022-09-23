import { shallowReactive, nextTick } from 'vue';
import { TagItem } from '/@/api/biz/library/model/tag';
import { useDrawer } from '/@/components/Drawer';

export function useDetail() {
  // detailDrawer
  const [registerDetail, { openDrawer }] = useDrawer();
  // 详情
  const detailState = shallowReactive<{ record: TagItem | undefined }>({
    record: undefined,
  });
  function handleDatail(record: TagItem) {
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
