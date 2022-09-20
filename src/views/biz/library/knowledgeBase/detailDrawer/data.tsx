/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 15:02:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-20 17:21:20
 * @FilePath: \knowledge-web\src\views\biz\library\knowledgeBase\detailDrawer\data.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DescItem } from '/@/components/Description/index';
import { Switch, Checkbox } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';

export function createDesSchemas(): DescItem[] {
  return [
    {
      field: 'name',
      label: '知识库名称',
    },
    {
      field: 'code',
      label: '知识库标识',
    },
    {
      field: 'crter',
      label: '创建人',
    },
    {
      field: 'crteTime',
      label: '创建时间',
    },
    {
      field: 'crter',
      label: '更新人',
    },
    {
      field: 'updtTime',
      label: '更新时间',
    },
    {
      field: 'admins',
      label: '知识库管理员',
      render(val) {
        let text = '';
        val?.forEach((item, index) => {
          if (index === val.length - 1) {
            text += item.custNick;
          } else {
            text += item.custNick + '，';
          }
        });
        return text;
      },
    },
    {
      field: 'needAudit',
      label: '审核开关',
      render: (val, data) => {
        return (
          <div>
            <Switch
              checked={val}
              disabled={true}
              checked-children="开"
              un-checked-children="关"
            ></Switch>
            {val && (
              <span>
                <Checkbox
                  checked={data.needAuditOperate?.includes('edit')}
                  disabled={true}
                  style="float:right"
                >
                  编辑
                </Checkbox>
                <Checkbox
                  checked={data.needAuditOperate?.includes('add')}
                  disabled={true}
                  style="float:right"
                >
                  新增
                </Checkbox>
              </span>
            )}
          </div>
        );
      },
    },
    {
      field: 'contentDesc',
      label: '知识库描述',
    },
  ];
}

export function createUserSchemas(): FormSchema[] {
  return [
    {
      field: 'userName',
      label: '姓名',
      component: 'Input',
    },
  ];
}
export function createBasicColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'userName',
      title: '姓名',
    },
    {
      dataIndex: 'userId',
      title: '用户名',
    },
    {
      dataIndex: 'grpName',
      title: '所属分组',
    },
  ];
}

export function createGroupSchemas(): FormSchema[] {
  return [
    {
      field: 'grpName',
      label: '分组名称',
      component: 'Input',
    },
  ];
}
export function createGroupColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'grpName',
      title: '分组名称',
    },
    {
      dataIndex: 'teamId',
      title: '分组ID',
    },
  ];
}
