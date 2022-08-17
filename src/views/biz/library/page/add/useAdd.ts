/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-19 16:11:50
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-23 11:05:37
 * @FilePath: \knowledge-web\src\views\examples\page\useAdd.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useModal } from '/@/components/Modal';
import { ref } from 'vue';
import { useMessage } from '/@/hooks/web/useMessage';

const { createMessage } = useMessage();
export function useAdd() {
  const [registerModal, { openModal, closeModal }] = useModal();

  // 新增
  const reviewIdRef = ref<string[]>();
  function openAddModal(rowKeys) {
    if (rowKeys.length) {
      reviewIdRef.value = rowKeys;
      openModal();
    } else {
      createMessage.warn('请先勾选要审核的页面');
    }
  }

  // success
  function closeAddModal(reload) {
    closeModal();
    reload({ page: 1 });
  }

  return {
    registerModal,
    reviewIdRef,
    openAddModal,
    closeAddModal,
  };
}
