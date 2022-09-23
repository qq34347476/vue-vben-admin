/*
 * @LastEditTime: 2022-09-21 14:54:11
 * @Description:
 */
import { ref } from 'vue';
import { ClassifyItem } from '/@/api/biz/system/model/classifyModel';
import { useModal } from '/@/components/Modal';

export function useDetail() {
  // detailDrawer
  const [registerDetailModal, { openModal }] = useModal();
  // 详情
  const recordRef = ref<ClassifyItem>();
  function handleDatail(record: ClassifyItem) {
    recordRef.value = record;
    openModal();
  }

  return {
    registerDetailModal,
    recordRef,
    handleDatail,
  };
}
