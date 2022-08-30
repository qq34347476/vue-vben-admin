/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-19 16:11:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-26 16:20:08
 * @FilePath: \knowledge-web\src\views\examples\page\useAdd.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useModal } from '/@/components/Modal';
import { shallowReactive, nextTick } from 'vue';
import { DemoListItem } from '/@/api/demo/model/tableModel';

export function useAdd() {
  const [registerAdd, { openModal }] = useModal();
  const addState = shallowReactive<{ type: 'add' | 'edit'; record: DemoListItem | undefined }>({
    type: 'add',
    record: undefined,
  });

  // 新增
  function handleAdd() {
    addState.type = 'add';
    addState.record = undefined;
    nextTick(() => {
      openModal();
    });
  }

  // 编辑
  function handleEdit(record: DemoListItem) {
    addState.type = 'edit';
    addState.record = record;
    nextTick(() => {
      openModal();
    });
  }

  return {
    registerAdd,
    handleAdd,
    handleEdit,
    addState,
  };
}
