import { useModal } from '/@/components/Modal';
import { shallowReactive, nextTick } from 'vue';
import { TagItem } from '/@/api/biz/library/model/tag';

export function useAdd() {
  const [registerAdd, { openModal }] = useModal();
  const addState = shallowReactive<{ type: 'add' | 'edit'; record: TagItem | undefined }>({
    type: 'add',
    record: undefined,
  });

  // 新增
  function handleAdd() {
    addState.type = 'add';
    addState.record = undefined;
    nextTick(() => {
      openModal();
    });
  }

  // 编辑
  function handleEdit(record: TagItem) {
    addState.type = 'edit';
    addState.record = record;
    nextTick(() => {
      openModal();
    });
  }

  return {
    registerAdd,
    handleAdd,
    handleEdit,
    addState,
  };
}
