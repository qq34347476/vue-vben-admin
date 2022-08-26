import { shallowReactive, nextTick } from 'vue';
import { DemoListItem } from '/@/api/demo/model/tableModel';
import { useDrawer } from '/@/components/Drawer';

export function useDetail() {
  // detailDrawer
  const [registerDetail, { openDrawer }] = useDrawer();
  // 详情
  const detailState = shallowReactive<{ record: DemoListItem | undefined }>({
    record: undefined,
  });
  function handleDatail(record: DemoListItem) {
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
