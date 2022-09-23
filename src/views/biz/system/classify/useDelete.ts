/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-22 10:11:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-23 16:53:44
 * @FilePath: \knowledge-web\src\views\examples\page\useDelete.ts
 * @Description: 删除
 */
import { useMessage } from '/@/hooks/web/useMessage';
import { cateDeleteApi } from '/@/api/biz/system/classify';
export function useDelete(reload: Function) {
  // 删除
  const { createConfirm } = useMessage();
  function handleDelete(val: { cateId: string; cateType: number }) {
    event?.stopPropagation();
    // if (rowKeys?.length) {
    createConfirm({
      iconType: 'warning',
      title: '确认操作',
      content: `分类删除后，原有该分类下内容将被归入为【默认分类】，确定删除分类？`,
      onOk: async () => {
        await cateDeleteApi(val);
        reload();
      },
    });
    // } else {
    //   createMessage.warn('请先勾选要删除的知识库');
    // }
  }

  return { handleDelete };
}
