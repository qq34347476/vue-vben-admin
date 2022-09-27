import { useModal } from '/@/components/Modal';
import { shallowReactive, nextTick } from 'vue';
import { KnowledgeItem } from '/@/api/biz/library/model/knowledgeModel';
import { PageRecyclingPublicTree } from '../types';

export function useMove() {
  const [registerMove, { openModal }] = useModal();
  const moveState = shallowReactive<{
    selectedPage: PageRecyclingPublicTree | undefined;
    selectedSpaceItem: KnowledgeItem | undefined;
    // 资料库列表
    knowledges: KnowledgeItem[];
  }>({
    selectedPage: undefined,
    selectedSpaceItem: undefined,
    knowledges: [],
  });

  function handleMove(
    selectedPage: PageRecyclingPublicTree,
    selectedSpaceItem: KnowledgeItem,
    knowledges: KnowledgeItem[],
  ) {
    moveState.selectedPage = selectedPage;
    moveState.selectedSpaceItem = selectedSpaceItem;
    moveState.knowledges = knowledges;
    nextTick(() => {
      openModal();
    });
  }

  return {
    registerMove,
    handleMove,
    moveState,
  };
}
