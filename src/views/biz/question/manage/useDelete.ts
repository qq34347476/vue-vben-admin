/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-22 10:11:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-31 11:19:28
 * @FilePath: \knowledge-web\src\views\examples\page\useDelete.ts
 * @Description: 删除
 */
import { questionManageDeletesApi, questionManageHideApi } from '/@/api/biz/question/list';
import { QuestionListItem } from '/@/api/biz/question/model/listModel';
import { useMessage } from '/@/hooks/web/useMessage';

export function useDelete(reload: Function, getSelectRowKeys: () => string[]) {
  // 删除
  const { createConfirm, createMessage } = useMessage();
  function _delete(rowKeys: string[]) {
    if (rowKeys.length) {
      createConfirm({
        iconType: 'warning',
        title: '确认操作',
        content: '确认删除所选问答，删除后该问答的评论也将同时删除',
        onOk: async () => {
          console.log('删除接口', rowKeys);
          await questionManageDeletesApi(rowKeys);
          reload({ page: 1 });
        },
      });
    } else {
      createMessage.warn('请先勾选要删除数据');
    }
  }
  function handleMultiDelete() {
    const rowKeys = getSelectRowKeys();
    _delete(rowKeys);
  }
  function handleDelete(record: QuestionListItem) {
    _delete([record.themeId]);
  }

  function handleHide(record: QuestionListItem) {
    // console.log(record);
    createConfirm({
      iconType: 'warning',
      title: '确认操作',
      content: '确认切换？',
      onOk: async () => {
        // console.log('删除接口', rowKeys);
        await questionManageHideApi(record.themeId);
        reload({ page: 1 });
      },
    });
  }

  return { handleDelete, handleMultiDelete, handleHide };
}
