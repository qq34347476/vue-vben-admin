/**
 * @description: 静态数据
 * @return {*}
 */
import { DescItem } from '/@/components/Description/index';
import { Switch, Checkbox } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table';

export function createDesSchemas(): DescItem[] {
  return [
    {
      field: 'name',
      label: '知识库名称',
    },
    {
      field: 'gender',
      label: '性别（数据字典）',
      type: 'dict',
    },
    {
      field: 'name1',
      label: '知识库标识',
    },
    {
      field: 'name2',
      label: '创建人',
    },
    {
      field: 'beginTime',
      label: '创建时间',
    },
    {
      field: 'name3',
      label: '更新人',
    },
    {
      field: 'endTime',
      label: '更新时间',
    },
    {
      field: 'name4',
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
      field: 'address',
      label: '知识库描述',
    },
  ];
}

export function createBasicColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'name1',
      title: '分组',
    },
    {
      dataIndex: 'name2',
      title: '用户名',
    },
    {
      dataIndex: 'name',
      title: '姓名',
    },
  ];
}
