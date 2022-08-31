/**
 * @description: 删除等其他操作
 * @return {*}
 */
import { demoDetailApi } from '/@/api/demo/table';
import { useMessage } from '/@/hooks/web/useMessage';

export function useDelete(reload: Function, getSelectRowKeys: () => string[]) {
  // 删除
  const { createConfirm, createMessage } = useMessage();
  function handleDelete(rowKeys: string[]) {
    if (rowKeys.length) {
      createConfirm({
        iconType: 'warning',
        title: '确认操作',
        content: `确认将所选数据删除，删除后将无法恢复。`,
        onOk: async () => {
          console.log('删除接口', rowKeys);
          await demoDetailApi({});
          reload({ page: 1 });
        },
      });
    } else {
      createMessage.warn('请先勾选要删除的数据');
    }
  }
  function handleMultiDelete() {
    const rowKeys = getSelectRowKeys();
    handleDelete(rowKeys);
  }

  return { handleDelete, handleMultiDelete };
}
