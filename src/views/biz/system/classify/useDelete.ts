/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-22 10:11:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-24 16:35:57
 * @FilePath: \knowledge-web\src\views\examples\page\useDelete.ts
 * @Description: 删除
 */
import { useMessage } from '/@/hooks/web/useMessage';

export function useDelete(reload: Function) {
  // 删除
  const { createConfirm, createMessage } = useMessage();
  function handleDelete(rowKeys: String[]) {
    event?.stopPropagation();
    if (rowKeys?.length) {
      createConfirm({
        iconType: 'warning',
        title: '确认操作',
        content: `分类删除后，原有该分类下内容将被归入为【默认分类】，确定删除分类？`,
        onOk: async () => {
          console.log('删除接口', rowKeys);
          reload();
        },
      });
    } else {
      createMessage.warn('请先勾选要删除的知识库');
    }
  }

  return { handleDelete };
}
