/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-19 16:11:50
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-23 11:23:05
 * @FilePath: \knowledge-web\src\views\examples\page\useAdd.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useModal } from '/@/components/Modal';
import { ref } from 'vue';
import { KnowledgeItem } from '/@/api/biz/library/model/knowledgeModel';

export function useAdd() {
  const [registerModal, { openModal, closeModal }] = useModal();
  const modalTypeRef = ref<'add' | 'edit'>('add');

  // 新增
  function openAddModal() {
    modalTypeRef.value = 'add';
    openModal();
  }

  // 编辑
  const addRecordRef = ref<KnowledgeItem>();
  function handleEdit(record: KnowledgeItem) {
    modalTypeRef.value = 'edit';
    addRecordRef.value = record;
    openModal();
  }

  // success
  function closeAddModal(reload: Function) {
    closeModal();
    reload({ page: 1 });
  }

  return {
    registerModal,
    openAddModal,
    modalTypeRef,
    handleEdit,
    addRecordRef,
    closeAddModal,
  };
}
