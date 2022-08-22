<script lang="tsx">
  import { defineComponent, reactive } from 'vue';
  import { getQuestionListApi } from '/@/api/biz/question/list';
  import { QuestionListItem } from '/@/api/biz/question/model/listModel';
  import { Icon } from '/@/components/Icon/index';
  import { Skeleton } from 'ant-design-vue';
  import Answer from '/@/views/biz/question/answer/index.vue';
  import { useAnswer } from '/@/views/biz/question/answer/useAnswer';
  // import { useRouter } from 'vue-router';
  export default defineComponent({
    name: 'QuestionDetail',
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const state = reactive<{ detail: QuestionListItem | null; answers: QuestionListItem[] }>({
        detail: null,
        answers: [],
      });
      // 初始化数据
      async function initData() {
        const { records } = await getQuestionListApi({ page: 1, pageSize: 10 });
        state.detail = records.find((item) => item.id === props.id) || null;
        state.answers = records;
      }
      initData();
      // 写回答
      const { registerAnswer, handleAnswer, answerRef } = useAnswer();
      // render回答
      function renderAnswer() {
        return state.answers.map((item) => {
          return (
            <div class="p-3 ">
              <div class=" mb-2">
                <img class="rounded-1/2 inline-block w-25px h-25px" src={item.avatar} />
                <span class="px-2">{item?.name}</span>
                <span class="px-2 text-gray-500 text-xs"> {item?.time}</span>
              </div>
              <div class="my-2">{item.content}</div>
              <div>
                <a-button
                  type="text"
                  class="!hover:text-primary"
                  onClick={handleAnswer.bind(null, item)}
                >
                  <Icon icon="ant-design:message-outlined" />
                  回复
                </a-button>
              </div>
            </div>
          );
        });
      }

      return () => {
        const item = state.detail;
        return (
          <div>
            {item ? (
              [
                <div class="bg-white m-2 p-4">
                  <div class="flex flex-row mb-2">
                    <div class="flex-1 font-bold text-base line-clamp-1 pr-2">{item?.title}</div>
                    <div> {item?.cateName}</div>
                  </div>
                  <div class="text-gray-500 text-xs mb-2">
                    <span class="px-2">
                      <Icon icon="ant-design:eye-outlined" />
                      {item?.look}
                    </span>
                    <span class="px-2">
                      <Icon icon="ant-design:user-outlined" />
                      {item?.name}
                    </span>
                    <span class="px-2">发布于 {item?.time}</span>
                  </div>
                  <div class="mb-2 h-45px line-clamp-2">{item?.content}</div>
                  <div>
                    <a-button
                      type="text"
                      class="ml-2 !hover:text-primary"
                      onClick={handleAnswer.bind(null, item)}
                    >
                      <Icon icon="ant-design:edit-outlined" />
                      写回答
                    </a-button>
                    <a-button type="text" class="ml-2 !hover:text-primary">
                      <Icon icon="ant-design:star-outlined" />
                      收藏
                    </a-button>
                  </div>
                </div>,
                <div class="bg-white m-2 divide-y px-3">
                  <div class="p-2">
                    <span class="font-bold text-lg"> {item?.answerCount}条回答</span>
                  </div>
                  {renderAnswer()}
                </div>,
              ]
            ) : (
              <Skeleton />
            )}

            <Answer onRegister={registerAnswer} record={answerRef.value} />
          </div>
        );
      };
    },
  });
</script>
