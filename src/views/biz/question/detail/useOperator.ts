import { commentDeletesApi, questionManageDeletesApi } from '/@/api/biz/question/list';
import { CommentTreeItem, QuestionListItem } from '/@/api/biz/question/model/listModel';
import { useMessage } from '/@/hooks/web/useMessage';

export function useOperator(emitSuccess: () => void, initData: () => Promise<void>) {
  // 删除
  const { createConfirm } = useMessage();
  function handleDelete(record: QuestionListItem) {
    createConfirm({
      iconType: 'warning',
      title: '确认操作',
      content: '确认删除该问答，删除后该问答的评论也将同时删除？',
      onOk: async () => {
        await questionManageDeletesApi([record.themeId]);
        emitSuccess();
      },
    });
  }

  function handleDeleteComment(record: CommentTreeItem) {
    // console.log(record);
    createConfirm({
      iconType: 'warning',
      title: '确认操作',
      content: '确认删除该回复？',
      onOk: async () => {
        // console.log('删除接口', rowKeys);
        await commentDeletesApi([record.commentId]);
        initData();
      },
    });
  }

  return { handleDelete, handleDeleteComment };
}
