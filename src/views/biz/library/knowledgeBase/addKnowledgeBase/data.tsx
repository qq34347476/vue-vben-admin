/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 15:02:37
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-17 14:35:18
 * @FilePath: \knowledge-web\src\views\biz\library\knowledgeBase\detailDrawer\data.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import { Switch, Radio } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';
import { numStrPattern } from '/@/utils/pattern';
export function createSchemas(): FormSchema[] {
  return [
    {
      field: 'knowName',
      label: '知识库名称',
      component: 'Input',
      componentProps: {
        showCount: true,
        maxlength: 50,
      },
      rules: [{ required: true, message: '请输入知识库名称' }],
    },
    {
      field: 'knowMark',
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
      field: 'knowAdmin',
      label: '知识库管理员',
      component: 'TreeSelect',
      rules: [{ required: true }],
    },
    {
      field: 'memo',
      label: '知识库描述',
      component: 'InputTextArea',
      componentProps: {
        showCount: true,
        maxlength: 200,
      },
      colProps: { span: 16 },
    },
    {
      field: 'switch',
      label: '审核开关',
      helpMessage: '开关开启时，所有页面<新增>时均需审核，<编辑>时是否需要审核可选',
      component: 'Switch',
      slot: 'switch',
    },
  ];
}

export function createBasicColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'group',
      title: '分组',
    },
    {
      dataIndex: 'userId',
      title: '用户名',
    },
    {
      dataIndex: 'userName',
      title: '姓名',
    },
  ];
}
