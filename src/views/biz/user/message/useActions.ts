/*
 * @LastEditTime: 2022-09-16 09:58:58
 * @Description:
 */
import { reactive } from 'vue';
import { getUserMessageList } from '/@/api/biz/user/message';
import { MessageListItem } from '/@/api/biz/user/model/messageModel';
import { MessageType } from '/@/enums/biz/userEnum';
import { useRouter } from 'vue-router';
import { PageEnum } from '/@/enums/pageEnum';

// 问答列表
export function useQuestionList() {
  const messageState = reactive<{
    data: MessageListItem[];
    loading: boolean;
    page: number;
    isLast: boolean;
    type: string;
  }>({
    data: [],
    loading: false,
    page: 1,
    // 是否最后一页
    isLast: false,
    type: MessageType.ALL,
  });
  // 点击分类
  function handleSelectCate(item: MessageType) {
    messageState.type = item;
    fetchQuestionList(1);
  }
  // 滚动到底部：加载下一页
  function handleScrollBottom() {
    // 接口未请求结束，不重新请求
    if (messageState.loading) {
      return;
    }
    // 已加载了最后一页
    if (messageState.isLast) {
      return;
    }
    fetchQuestionList();
  }
  async function fetchQuestionList(initPage = 0) {
    try {
      messageState.isLast = false;
      messageState.loading = true;
      messageState.page = initPage || messageState.page;
      // 第一页：重置数据
      if (messageState.page === 1) {
        messageState.data = [];
      }
      const { records, recordTotal } = await getUserMessageList({
        pageNo: messageState.page,
        pageSize: 20,
        type: messageState.type,
      });
      messageState.data = [...messageState.data, ...records];
      // 判断是否最后一页
      if (messageState.data.length === recordTotal) {
        messageState.isLast = true;
      }
      messageState.page += 1;
    } finally {
      messageState.loading = false;
    }
  }

  // 点击信息
  const { push } = useRouter();
  function handleMessage(val: MessageListItem) {
    if (val.newType === 'answer') {
      push(PageEnum.QUESTION_PAGE);
    } else {
      push(PageEnum.BASE_HOME);
    }
  }
  return {
    messageState,
    handleScrollBottom,
    handleSelectCate,
    handleMessage,
  };
}
