/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-22 10:11:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-26 15:25:24
 * @FilePath: \knowledge-web\src\views\examples\page\useDelete.ts
 * @Description: 删除
 */
import { demoDetailApi } from '/@/api/demo/table';
import { useMessage } from '/@/hooks/web/useMessage';

export function useDelete(reload: Function, getSelectRowKeys: () => string[]) {
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
          await demoDetailApi({});
          reload({ page: 1 });
        },
      });
    } else {
      createMessage.warn('请先勾选要删除的知识库');
    }
  }
  function handleMultiDelete() {
    const rowKeys = getSelectRowKeys();
    handleDelete(rowKeys);
  }

  return { handleDelete, handleMultiDelete };
}
