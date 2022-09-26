/*
 * @LastEditTime: 2022-09-26 10:37:46
 * @Description:新增知识库表单
 */
import { ref } from 'vue';
import { useForm } from '/@/components/Form';
import { createSchemas } from './data';
import { GroupItem } from '/@/api/biz/library/model/knowledgeModel';
import { TreeItem } from '/@/components/Tree';
import { useMessage } from '/@/hooks/web/useMessage';
import { makePy } from '/@/utils/initial';

export function useKonwledgeForm() {
  const { createMessage } = useMessage();
  // form
  const [registerForm, { setFieldsValue, clearValidate, validateFields, getFieldsValue }] = useForm(
    {
      schemas: createSchemas(nameBlur, selectChange),
      baseColProps: { span: 8 },
      labelWidth: 120,
      showActionButtonGroup: false,
    },
  );

  // 知识库名称失焦，自动生成知识库标志
  function nameBlur(val) {
    const code = makePy(val.target.value)[0];
    const reg = /^[0-9a-zA-Z]*$/;
    setFieldsValue({ code: code.slice(0, 10) });
    if (reg.test(code.slice(0, 10))) {
      clearValidate(['code']);
    }
  }
  // 知识库管理员勾选
  let beforeSelect: string[] = [];
  const selectDataRef = ref<string[]>([]);
  function selectChange(val: string[]) {
    if (val.length) {
      // val.forEach((item) => {
      //   if (item.split('-').length > 1 && item.split('-')[0] === 'team') {
      //     adminsSelectTree.forEach((treeItem) => {
      //       if (treeItem.value === item) {
      //         treeItem.children?.forEach((chilItem) => {
      //           selectDataRef.value.push(chilItem.value);
      //         });
      //       }
      //     });
      //   } else {
      //     selectDataRef.value.push(item);
      //   }
      // });
      if (val.length > 5) {
        createMessage.warning('管理员人数不得超过5人!');
        setFieldsValue({ admins: beforeSelect });
      } else {
        beforeSelect = val;
        selectDataRef.value = val;
      }
      clearValidate('admins');
    } else {
      beforeSelect = [];
    }
  }
  // 审核开关
  const switchValRef = ref(false);
  const editCheckedRef = ref(false);
  function handelSwitchChange(val) {
    switchValRef.value = val;
  }
  // 用户list转成树形结构
  function departmentListToTree(arr: GroupItem[]): TreeItem[] {
    const treeData = new Map<string, TreeItem>();
    const result: TreeItem[] = [];
    arr.forEach((item) => {
      const parent = treeData.get(item.teamId);
      if (!parent) {
        const children: any = [];
        arr.forEach((chaldrenItem) => {
          if (chaldrenItem.teamId === item.teamId) {
            children.push({
              key: chaldrenItem.uactId,
              value: chaldrenItem.uactId,
              title: chaldrenItem.userName,
            });
          }
        });
        treeData.set(item.teamId, {
          key: 'team-' + children.length + '-' + item.teamId,
          value: 'team-' + children.length + '-' + item.teamId,
          title: item.grpName,
          children,
        });
      }
    });
    for (const item of treeData) {
      result.push(item[1]);
    }
    return result;
  }
  return {
    registerForm,
    setFieldsValue,
    getFieldsValue,
    validateFields,
    clearValidate,
    switchValRef,
    editCheckedRef,
    handelSwitchChange,
    departmentListToTree,
    selectDataRef,
  };
}
