/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-19 16:11:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-24 17:31:32
 * @FilePath: \knowledge-web\src\views\examples\page\useAdd.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useModal } from '/@/components/Modal';
import { ref } from 'vue';
import { ClassifyItem } from '/@/api/biz/system/model/classifyModel';

export function useAdd() {
  const [registerModal, { openModal, closeModal }] = useModal();
  const modalTypeRef = ref<'add' | 'edit'>('add');

  // 新增
  const addRecordRef = ref<ClassifyItem>();
  function openAddModal(record) {
    modalTypeRef.value = 'add';
    addRecordRef.value = record;
    openModal();
  }

  // 编辑
  function handleEdit(record: ClassifyItem) {
    event?.stopPropagation();
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
