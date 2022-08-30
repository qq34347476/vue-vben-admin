<script lang="tsx">
  import { computed, defineComponent, reactive } from 'vue';
  import { getQuestionByIdApi } from '/@/api/biz/question/list';
  import { QuestionListItem, CommentTreeItem } from '/@/api/biz/question/model/listModel';
  import { Icon } from '/@/components/Icon/index';
  import { Skeleton } from 'ant-design-vue';
  import Answer from '/@/views/biz/question/answer/index.vue';
  import { useAnswer } from '/@/views/biz/question/answer/useAnswer';
  import { listToTree } from '/@/utils/helper/treeHelper';
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
      const state = reactive<{ detail: QuestionListItem | null }>({
        detail: null,
      });
      // 初始化数据
      async function initData() {
        state.detail = null;
        const data = await getQuestionByIdApi(props.id);
        state.detail = data;
        // state.answers = records;
      }
      initData();
      const commentsComputed = computed<CommentTreeItem[]>(() => {
        const answers = state.detail?.forumCommentDTOS || [];
        if (answers && answers.length) {
          return listToTree(answers, {
            id: 'commentId',
            children: 'children',
            pid: 'prntCommentId',
          });
        } else {
          return [];
        }
      });
      // 写回答
      const { registerAnswer, handleAnswer, answerState } = useAnswer();
      // render回答
      function renderAnswer(list: CommentTreeItem[], prntCommentCrter?: string) {
        return list.map((item) => {
          const { children } = item;
          return (
            <div class="p-3 ">
              <div class="mb-2 ">
                {
                  // <img class="inline-block rounded-1/2 w-25px h-25px" src={item.avatar} />
                }
                <span class="pr-2">{item?.crter} </span>
                {prntCommentCrter && (
                  <span>
                    <span class="px-2 text-blue">回复</span>
                    {prntCommentCrter}
                  </span>
                )}
                <span class="px-2 text-xs text-gray-500"> {item?.crteTime}</span>
              </div>
              <div class="my-2" v-html-parser={item.content || ''}></div>
              <div>
                <a-button
                  type="text"
                  class="!hover:text-primary"
                  onClick={handleAnswer.bind(null, state.detail, item)}
                >
                  <Icon icon="ant-design:message-outlined" />
                  回复
                </a-button>
              </div>
              <div>{children && children.length ? renderAnswer(children, item?.crter) : ''}</div>
            </div>
          );
        });
      }
      // function renderComment(list: CommentTreeItem[]) {
      //   return list.map((item) => {
      //     const { children } = item;
      //     return (
      //       <Comment>
      //         {{
      //           actions: () => (
      //             <a-button
      //               type="text"
      //               class="!hover:text-primary"
      //               onClick={handleAnswer.bind(null, state.detail, item)}
      //             >
      //               <Icon icon="ant-design:message-outlined" />
      //               回复
      //             </a-button>
      //           ),
      //           author: () => (
      //             <div class="mb-2 ">
      //               {
      //                 // <img class="inline-block rounded-1/2 w-25px h-25px" src={item.avatar} />
      //               }
      //               <span class="px-2">{item?.crter}</span>
      //               <span class="px-2 text-xs text-gray-500"> {item?.crteTime}</span>
      //             </div>
      //           ),
      //           // avatar: () => (
      //           //   <img class="inline-block rounded-1/2 w-25px h-25px" src={item.avatar} />
      //           // ),
      //           content: () => <div class="my-2">{item.content}</div>,
      //           default: () => (children && children.length ? renderComment(children) : ''),
      //         }}
      //       </Comment>
      //     );
      //   });
      // }

      return () => {
        const item = state.detail;
        return (
          <div>
            {item ? (
              [
                <div class="p-4 m-2 bg-white">
                  <div class="flex flex-row mb-2">
                    <div class="flex-1 pr-2 text-base font-bold line-clamp-1">{item?.title}</div>
                    <div> {item?.threadId}</div>
                  </div>
                  <div class="mb-2 text-xs text-gray-500">
                    {
                      // <span class="px-2">
                      //   <Icon icon="ant-design:eye-outlined" />
                      //   {item?.look}
                      // </span>
                    }
                    <span class="px-2">
                      <Icon icon="ant-design:user-outlined" />
                      {item?.crter}
                    </span>
                    <span class="px-2">发布于 {item?.crteTime}</span>
                  </div>
                  <div class="mb-2" v-html-parser={item.forumThemeInstDTO?.content || ''}></div>
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
                <div class="px-3 m-2 bg-white divide-y">
                  <div class="p-2">
                    <span class="text-lg font-bold">
                      {commentsComputed.value?.length || 0}条回答
                    </span>
                  </div>
                  {renderAnswer(commentsComputed.value)}
                </div>,
              ]
            ) : (
              <Skeleton />
            )}

            <Answer onRegister={registerAnswer} {...answerState} onSuccess={initData} />
          </div>
        );
      };
    },
  });
</script>
