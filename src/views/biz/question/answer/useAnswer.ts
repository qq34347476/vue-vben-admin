import { shallowReactive, nextTick } from 'vue';
import { ForumCommentDTOItem, QuestionListItem } from '/@/api/biz/question/model/listModel';
import { useModal } from '/@/components/Modal';

export function useAnswer() {
  const [registerAnswer, { openModal: openAnswer }] = useModal();
  // 详情
  const answerState = shallowReactive<{
    record: QuestionListItem | undefined;
    comment: ForumCommentDTOItem | undefined;
  }>({
    record: undefined,
    comment: undefined,
  });
  function handleAnswer(record: QuestionListItem, comment?: ForumCommentDTOItem) {
    answerState.record = record;
    answerState.comment = comment;
    nextTick(() => {
      openAnswer();
    });
  }

  return {
    registerAnswer,
    answerState,
    handleAnswer,
  };
}
