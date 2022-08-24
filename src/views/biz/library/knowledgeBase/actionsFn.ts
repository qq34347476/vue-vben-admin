/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 16:12:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-24 15:29:17
 * @FilePath: \knowledge-web\src\views\biz\library\knowledgeBase\actionsFn.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ref } from 'vue';
import { KnowledgeItem } from '/@/api/biz/library/model/knowledgeModel';
import { useMessage } from '/@/hooks/web/useMessage';
import { PageEnum } from '/@/enums/pageEnum';
import { useRouter } from 'vue-router';
const { createConfirm, createMessage } = useMessage();

export function actionsFn(openDetailDrawer: Function, openEditDrawer: Function) {
  const knowledgeRecordRef = ref<KnowledgeItem>();
  // 详情
  function handelDetail(record) {
    knowledgeRecordRef.value = record;
    openDetailDrawer();
  }
  // 编辑
  const drawerTypeRef = ref('');
  function handleEdit(record) {
    drawerTypeRef.value = 'edit';
    knowledgeRecordRef.value = record;
    openEditDrawer();
  }
  // 归档
  function handleFile(record) {
    createConfirm({
      iconType: 'warning',
      title: '确认操作',
      content: `确认将<span style="color:#0960BD">【${record.knowName}】</span>归档，归档后可至归档知识库进行激活。`,
      onOk: async () => {
        console.log('确认归档');
      },
    });
  }
  // 收藏
  function handleCollection(record) {
    console.log(record);
  }
  // 激活
  function handleActive(record) {
    console.log(record);
  }
  // 删除
  function handleDelete(record) {
    createConfirm({
      iconType: 'warning',
      title: '确认操作',
      content: `确认将<span style="color:#0960BD">【${record.knowName}】</span>删除，删除后可至知识库回收站进行恢复。`,
      onOk: async () => {
        console.log('确认删除');
      },
    });
  }
  // 恢复
  function handleRecover(record) {
    console.log(record);
  }
  // 永久删除
  function handleForeverDelete(deleteIdArr: string[]) {
    if (deleteIdArr.length) {
      createConfirm({
        iconType: 'warning',
        title: '确认操作',
        content: `确认将所选知识库永久删除，删除后将无法恢复。`,
        onOk: async () => {
          console.log('确认删除', deleteIdArr);
        },
      });
    } else {
      createMessage.warn('请先勾选要删除的知识库');
    }
  }

  // 点击名称
  const { push } = useRouter();
  function handleName() {
    // 页面跳转
    push(PageEnum.BASE_HOME);
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
    handleName,
  };
}
