/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 15:02:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-26 10:35:05
 * @FilePath: \knowledge-web\src\views\biz\library\knowledgeBase\detailDrawer\data.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import { Switch, Radio } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';
import { numStrPattern } from '/@/utils/pattern';
import { getTeamMenberListApi } from '/@/api/biz/library/knowledge';
// import { useKonwledgeForm } from './useKonwledgeForm';
// import { TreeItem } from '/@/components/Tree';
// import { ref } from 'vue';

// const adminsSelectTree = ref<TreeItem[]>([]);
// const { departmentListToTree } = useKonwledgeForm();

async function getAdminTree() {
  const { records } = await getTeamMenberListApi({ pageNo: 1, pageSize: 9999 });
  // adminsSelectTree.value = departmentListToTree(records);
  return records;
}
export function createSchemas(nameBlur: Function, selectChange: Function): FormSchema[] {
  return [
    {
      field: 'name',
      label: '知识库名称',
      component: 'Input',
      componentProps: {
        showCount: true,
        maxlength: 50,
        onblur: nameBlur,
      },
      rules: [{ required: true, message: '请输入知识库名称' }],
    },
    {
      field: 'code',
      label: '知识库标志',
      component: 'Input',
      componentProps: {
        showCount: true,
        maxlength: 10,
      },
      helpMessage: '知识库唯一标识，只能为字母或数字',
      rules: [
        {
          required: true,
          message: '请输入知识库标识，仅支持字母和数字',
          pattern: numStrPattern.pattern,
        },
      ],
    },
    {
      field: 'admins',
      label: '知识库管理员',
      component: 'ApiSelect',
      componentProps: {
        api: getAdminTree,
        params: {
          pageNo: 1,
          pageSize: -1,
        },
        resultField: 'records',
        labelField: 'custNick',
        valueField: 'custId',
        mode: 'multiple',
        maxTagCount: 2,
        optionFilterProp: 'label',
        onChange: selectChange,
      },
      rules: [{ required: true }],
    },
    {
      field: 'contentDesc',
      label: '知识库描述',
      component: 'InputTextArea',
      componentProps: {
        showCount: true,
        maxlength: 200,
      },
      colProps: { span: 16 },
    },
    {
      field: 'needAudit',
      label: '审核开关',
      helpMessage: '开关开启时，所有页面<新增>时均需审核，<编辑>时是否需要审核可选',
      component: 'Switch',
      slot: 'switch',
    },
  ];
}

export function createUserSchemas(): FormSchema[] {
  return [
    {
      field: 'custNick',
      label: '姓名',
      component: 'Input',
    },
  ];
}
export function createBasicColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'custNick',
      title: '姓名',
    },
    {
      dataIndex: 'custCode',
      title: '用户名',
    },
  ];
}

export function createGroupSchemas(): FormSchema[] {
  return [
    {
      field: 'groupName',
      label: '分组名称',
      component: 'Input',
    },
  ];
}
export function createGroupColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'groupName',
      title: '分组名称',
    },
    {
      dataIndex: 'groupId',
      title: '分组ID',
    },
  ];
}
