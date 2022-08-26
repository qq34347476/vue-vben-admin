/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-22 10:11:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-25 16:01:02
 * @FilePath: \knowledge-web\src\views\examples\page\useDelete.ts
 * @Description: 删除
 */
import { useMessage } from '/@/hooks/web/useMessage';

export function useDelete(reload: Function) {
  // 删除
  const { createConfirm } = useMessage();
  function handleDelete(record) {
    createConfirm({
      iconType: 'warning',
      title: '确认操作',
      content: `确认删除草稿<span class="text-blue-500">【${record.pageName}】</span>吗，草稿删除后无法恢复。`,
      onOk: async () => {
        console.log('删除接口', record);
        reload({ page: 1 });
      },
    });
  }

  return { handleDelete };
}
