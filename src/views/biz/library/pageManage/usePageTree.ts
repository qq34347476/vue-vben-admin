import { useMessage } from '/@/hooks/web/useMessage';
import {
  deletePageTreeById,
  reductionPage,
  permanentlyDeleteByIds,
} from '/@/api/biz/library/pageManage';
import { PageRecyclingItem } from '/@/api/biz/library/model/pageManage';
export function usePageTree(initTree: () => Promise<void>) {
  const { createConfirm } = useMessage();
  // 页面树：删除
  function handleDelete(record: { pageId: string; pageTitle: string }) {
    createConfirm({
      iconType: 'warning',
      title: '确认操作',
      content: `确认删除页面<span class="text-blue-500">【${record.pageTitle}】</span>吗，删除页面将连同子页面一起删除？<p class="text-sm">页面删除后若想找回页面，可通过回收站进行恢复</p>`,
      onOk: async () => {
        await deletePageTreeById(record.pageId);
        initTree();
      },
    });
  }
  // 回收站：还原
  async function handleRecover(data: PageRecyclingItem) {
    await reductionPage(data);
    await initTree();
  }
  // 回收站：永久删除
  async function handlePermanentDelete(ids: string[], pageTitle: string) {
    createConfirm({
      iconType: 'warning',
      title: '确认操作',
      content: `确认永久删除【${!pageTitle ? '所有页面' : pageTitle}】，删除后将无法恢复。`,
      onOk: async () => {
        await permanentlyDeleteByIds(ids);
        initTree();
      },
    });
  }
  return {
    handleDelete,
    handleRecover,
    handlePermanentDelete,
  };
}
