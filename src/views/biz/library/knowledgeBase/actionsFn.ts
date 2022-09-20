/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 16:12:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-20 15:49:13
 * @FilePath: \knowledge-web\src\views\biz\library\knowledgeBase\actionsFn.ts
 * @Description: 知识库表格操作列方法
 */
import { ref } from 'vue';
import { KnowledgeItem } from '/@/api/biz/library/model/knowledgeModel';
import { useMessage } from '/@/hooks/web/useMessage';
import { knowledgePigeonholeApi } from '/@/api/biz/library/knowledge';
import { knowledgeActiveApi, knowledgeDeleteApi } from '/@/api/biz/library/fileKnowledge';
import { knowledgePerpetualDeleteApi } from '/@/api/biz/library/recycleKnowledge';

const { createConfirm, createMessage } = useMessage();

export function actionsFn(openDetailDrawer: Function, openEditDrawer: Function, reload: Function) {
  const knowledgeRecordRef = ref<KnowledgeItem>();
  // 详情
  function handelDetail(record: KnowledgeItem) {
    knowledgeRecordRef.value = record;
    openDetailDrawer();
  }
  // 编辑
  const drawerTypeRef = ref('');
  function handleEdit(record: KnowledgeItem) {
    drawerTypeRef.value = 'edit';
    knowledgeRecordRef.value = record;
    openEditDrawer();
  }
  // 归档
  function handleFile(record: KnowledgeItem) {
    createConfirm({
      iconType: 'warning',
      title: '确认操作',
      content: `确认将<span style="color:#0960BD">【${record.name}】</span>归档，归档后可至归档知识库进行激活。`,
      onOk: async () => {
        await knowledgePigeonholeApi(record.spaceId);
        reload();
      },
    });
  }
  // 收藏
  function handleCollection(record: KnowledgeItem) {
    console.log(record);
  }
  // 激活
  async function handleActive(record: KnowledgeItem) {
    await knowledgeActiveApi(record.spaceId);
    reload();
  }
  // 删除
  function handleDelete(record: KnowledgeItem) {
    createConfirm({
      iconType: 'warning',
      title: '确认操作',
      content: `确认将<span class="text-blue-500">【${record.name}】</span>删除，删除后可至知识库回收站进行恢复。`,
      onOk: async () => {
        await knowledgeDeleteApi(record.spaceId);
        reload();
      },
    });
  }
  // 恢复
  async function handleRecover(record: KnowledgeItem) {
    await knowledgePigeonholeApi(record.spaceId);
    reload();
  }
  // 永久删除
  function handleForeverDelete(deleteIdArr: string[]) {
    if (deleteIdArr.length) {
      createConfirm({
        iconType: 'warning',
        title: '确认操作',
        content: `确认将所选知识库永久删除，删除后将无法恢复。`,
        onOk: async () => {
          await knowledgePerpetualDeleteApi(deleteIdArr);
          reload();
        },
      });
    } else {
      createMessage.warn('请先勾选要删除的知识库');
    }
  }

  return {
    knowledgeRecordRef,
    handelDetail,
    handleEdit,
    drawerTypeRef,
    handleFile,
    handleCollection,
    handleActive,
    handleDelete,
    handleRecover,
    handleForeverDelete,
  };
}
