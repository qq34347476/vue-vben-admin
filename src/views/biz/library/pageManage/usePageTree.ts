import { useMessage } from '/@/hooks/web/useMessage';
import {
  deletePageTreeById,
  reductionPage,
  permanentlyDeleteByIds,
} from '/@/api/biz/library/pageManage';
import { PageRecyclingItem, CreateNodeEditPageParams } from '/@/api/biz/library/model/pageManage';
import { useLoading } from '/@/components/Loading';
import { PageTypeEnum, CorrespondSortEnum, PAGE_DEFAULT_TITLE } from '/@/enums/biz/libraryEnum';
import { createNodeEditPage } from '/@/api/biz/library/pageManage';
import { useRouter } from 'vue-router';

export function usePageTree(initTree: () => Promise<void>) {
  const { push } = useRouter();

  const { createConfirm } = useMessage();
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '加载中...',
  });
  // 新建子页面/上方新增/下方新增
  async function handleAddPage(spaceId: string, id: string, correspondSort?: CorrespondSortEnum) {
    try {
      openFullLoading();

      const params: CreateNodeEditPageParams = {
        pageType: PageTypeEnum.DRAFT,
        spaceId: spaceId,
        pageTitle: PAGE_DEFAULT_TITLE,
      };
      if (!correspondSort) {
        params.parentId = id;
      } else {
        params.correspondSort = correspondSort;
        params.correspondId = id;
      }
      const { pageId } = await createNodeEditPage(params);
      // 进入编辑页面
      push(`/library/pageEdit/${spaceId}/${pageId}`);
    } finally {
      closeFullLoading();
    }
  }
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
    handleAddPage,
  };
}
