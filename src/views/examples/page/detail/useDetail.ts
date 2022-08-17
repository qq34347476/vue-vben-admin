import { ref } from 'vue';
import { KnowledgeItem } from '/@/api/biz/library/model/knowledgeModel';
import { useDrawer } from '/@/components/Drawer';

export function useDetail() {
  // detailDrawer
  const [registerDrawer, { openDrawer }] = useDrawer();
  // 详情
  const recordRef = ref<KnowledgeItem>();
  function handleDatail(record: KnowledgeItem) {
    recordRef.value = record;
    openDrawer();
  }

  return {
    registerDrawer,
    recordRef,
    handleDatail,
  };
}
