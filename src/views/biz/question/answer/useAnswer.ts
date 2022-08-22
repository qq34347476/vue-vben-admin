import { ref } from 'vue';
import { QuestionListItem } from '/@/api/biz/question/model/listModel';
import { useModal } from '/@/components/Modal';

export function useAnswer() {
  const [registerAnswer, { openModal: openAnswer }] = useModal();
  // 详情
  const answerRef = ref<QuestionListItem>();
  function handleAnswer(record: QuestionListItem) {
    answerRef.value = record;
    openAnswer();
  }

  return {
    registerAnswer,
    answerRef,
    handleAnswer,
  };
}
