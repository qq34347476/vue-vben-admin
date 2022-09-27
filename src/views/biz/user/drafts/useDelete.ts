/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-22 10:11:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-27 18:06:43
 * @FilePath: \knowledge-web\src\views\examples\page\useDelete.ts
 * @Description: 删除
 */
import { useMessage } from '/@/hooks/web/useMessage';
import { pageDeleteApi } from '/@/api/biz/user/drafts';
import { DraftItem } from '/@/api/biz/user/model/draftsModel';

export function useDelete(reload: Function) {
  // 删除
  const { createConfirm } = useMessage();
  function handleDelete(record: DraftItem) {
    createConfirm({
      iconType: 'warning',
      title: '确认操作',
      content: `确认删除草稿<span class="text-blue-500">【${record.pageTitle}】</span>吗，草稿删除后无法恢复。`,
      onOk: async () => {
        await pageDeleteApi([record.pageId]);
        reload({ page: 1 });
      },
    });
  }

  return { handleDelete };
}
