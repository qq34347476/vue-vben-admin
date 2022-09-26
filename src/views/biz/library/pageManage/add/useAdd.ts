import { useModal } from '/@/components/Modal';
import { shallowReactive, nextTick } from 'vue';
import { PageTreeItem } from '/@/api/biz/library/model/pageManage';
import { CorrespondSortEnum } from '/@/enums/biz/libraryEnum';

export function useAdd() {
  const [registerAdd, { openModal }] = useModal();
  const addState = shallowReactive<{
    type: 'add' | 'edit';
    record: PageTreeItem | undefined;
    spaceId: string;
    correspondSort: CorrespondSortEnum | undefined;
  }>({
    type: 'add',
    record: undefined,
    spaceId: '',
    correspondSort: undefined,
  });

  // 新增
  function handleAdd(spaceId: string, record?: PageTreeItem, correspondSort?: CorrespondSortEnum) {
    addState.spaceId = spaceId;
    addState.type = 'add';
    addState.record = record;
    addState.correspondSort = correspondSort;
    nextTick(() => {
      openModal();
    });
  }

  // 编辑
  function handleEdit(spaceId: string, record: PageTreeItem) {
    addState.spaceId = spaceId;
    addState.type = 'edit';
    addState.record = record;
    addState.correspondSort = undefined;
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
