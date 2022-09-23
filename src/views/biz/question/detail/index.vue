<script lang="tsx">
  import { computed, defineComponent, reactive } from 'vue';
  import { getQuestionByIdApi } from '/@/api/biz/question/list';
  import { QuestionListItem, CommentTreeItem } from '/@/api/biz/question/model/listModel';
  import { Icon } from '/@/components/Icon/index';
  import { Skeleton, Avatar } from 'ant-design-vue';
  import Answer from '/@/views/biz/question/answer/index.vue';
  import { useAnswer } from '/@/views/biz/question/answer/useAnswer';
  import { listToTree } from '/@/utils/helper/treeHelper';
  // import { useRouter } from 'vue-router';
  // 删除
  import { useOperator } from './useOperator';
  export default defineComponent({
    name: 'QuestionDetail',
    props: {
      id: {
        type: String,
        required: true,
      },
      isManage: {
        type: Boolean,
        default: false,
      },
      immediate: {
        type: Boolean,
        default: true,
      },
    },
    setup(props, { expose, emit }) {
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
      // 页面打开立即请求，弹窗组件引用，每次打开，单独调用
      props.immediate && initData();
      expose({ initData });
      function emitSuccess() {
        emit('success');
      }
      const { handleDeleteComment, handleDelete } = useOperator(emitSuccess, initData);
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
            <div class="flex p-3">
              <div class="pr-2">
                <Avatar size={25} class="!text-xs !bg-primary/50 ">
                  {item.crter.slice(-1)}
                </Avatar>
              </div>
              <div class="flex-1">
                <div class="mb-2 ">
                  <span class="pr-2">{item.crter}</span>
                  {prntCommentCrter && (
                    <span class="pr-2">
                      <span class="pr-2 text-primary">回复</span>
                      {prntCommentCrter}
                    </span>
                  )}
                  <span class="pr-2 text-xs text-gray-500"> {item.crteTime}</span>
                </div>
                <div v-html-parser={item.content || ''}></div>
                <div>
                  {!props.isManage ? (
                    <a-button
                      type="text"
                      class="!hover:text-primary !px-1"
                      onClick={handleAnswer.bind(null, state.detail, item)}
                    >
                      <Icon icon="ant-design:message-outlined" />
                      回复
                    </a-button>
                  ) : (
                    <a-button
                      color="error"
                      type="link"
                      onClick={handleDeleteComment.bind(null, item)}
                    >
                      <Icon icon="ant-design:delete-outlined" />
                      删除回复
                    </a-button>
                  )}
                </div>
                <div>{children && children.length ? renderAnswer(children, item.crter) : ''}</div>
              </div>
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
                    <div style={JSON.parse(item?.cateDTO?.cateConfig).style}>
                      {item?.cateDTO?.cateName}
                    </div>
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
                  {!props.isManage && (
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
                  )}
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

            {item && props.isManage && (
              <div class="px-3 m-2 bg-whit">
                <a-button color="error" type="link" onClick={handleDelete.bind(null, item)}>
                  <Icon icon="ant-design:delete-outlined" />
                  删除问答
                </a-button>
              </div>
            )}

            <Answer onRegister={registerAnswer} {...answerState} onSuccess={initData} />
          </div>
        );
      };
    },
  });
</script>
