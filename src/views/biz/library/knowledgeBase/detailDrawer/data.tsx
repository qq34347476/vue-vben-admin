/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 15:02:37
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-16 16:28:10
 * @FilePath: \knowledge-web\src\views\biz\library\knowledgeBase\detailDrawer\data.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DescItem } from '/@/components/Description/index';
import { Switch, Checkbox } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table';

export function createDesSchemas(): DescItem[] {
  return [
    {
      field: 'knowName',
      label: '知识库名称',
    },
    {
      field: 'knowMark',
      label: '知识库标识',
    },
    {
      field: 'createPsn',
      label: '创建人',
    },
    {
      field: 'createTime',
      label: '创建时间',
    },
    {
      field: 'updatePsn',
      label: '更新人',
    },
    {
      field: 'updateTime',
      label: '更新时间',
    },
    {
      field: 'knowAdmin',
      label: '知识库管理员',
    },
    {
      field: 'switch',
      label: '审核开关',
      render: (val, data) => {
        return (
          <div>
            <Switch
              checked={val === '1'}
              disabled={true}
              checked-children="开"
              un-checked-children="关"
            ></Switch>
            <Checkbox checked={data.edit === '1'} disabled={true} style="float:right">
              编辑
            </Checkbox>
            <Checkbox checked={data.add === '1'} disabled={true} style="float:right">
              新增
            </Checkbox>
          </div>
        );
      },
    },
    {
      field: 'memo',
      label: '知识库描述',
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
