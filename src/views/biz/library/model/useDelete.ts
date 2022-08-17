/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-22 10:11:51
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-22 10:17:53
 * @FilePath: \knowledge-web\src\views\examples\page\useDelete.ts
 * @Description: 删除
 */
import { useMessage } from '/@/hooks/web/useMessage';

export function useDelete(reload) {
  // 删除
  const { createConfirm, createMessage } = useMessage();
  function handleDelete(rowKeys: String[]) {
    if (rowKeys.length) {
      createConfirm({
        iconType: 'warning',
        title: '确认操作',
        content: `确认将所选知识库永久删除，删除后将无法恢复。`,
        onOk: async () => {
          console.log('删除接口', rowKeys);
          reload({ page: 1 });
        },
      });
    } else {
      createMessage.warn('请先勾选要删除的知识库');
    }
  }

  return { handleDelete };
}
