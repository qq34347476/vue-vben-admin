/*
 * @LastEditTime: 2022-08-24 17:50:40
 * @Description:
 */
import { ref } from 'vue';
import { KnowledgeItem } from '/@/api/biz/library/model/knowledgeModel';
import { useModal } from '/@/components/Modal';

export function useDetail() {
  // detailDrawer
  const [registerDetailModal, { openModal }] = useModal();
  // 详情
  const recordRef = ref<KnowledgeItem>();
  function handleDatail(record: KnowledgeItem) {
    recordRef.value = record;
    openModal();
  }

  return {
    registerDetailModal,
    recordRef,
    handleDatail,
  };
}
