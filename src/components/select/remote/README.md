# RemoteSelect

## 远程请求下拉数据，不带搜索，默认立即请求

```js
    {
      field: 'businessId',
      label: '业务名称',
      helpMessage: '下拉列表只包括未配置的业务',
      component: 'RemoteSelect',
      defaultValue: id,
      componentProps: {
        api: businessListApi,
        searchInfo: {
          pageNo: 1,
          pageSize: 999,
          // 可以筛选出未配置的业务
          selectUnConf: true,
        },
        remoteSelectSetting: {
          valueField: 'businessId',
          labelField: 'businessName',
        },
      },
      rules: [{ required: true }],
    }
```

## 远程请求下拉数据，带搜索

```js
    {
      field: 'businessId',
      label: '业务名称',
      helpMessage: '下拉列表只包括未配置的业务',
      component: 'RemoteSelect',
      defaultValue: id,
      componentProps: {
        api: businessListApi,
        showSearch: false,
        searchInfo: {
          pageNo: 1,
          pageSize: 999,
          // 可以筛选出未配置的业务
          selectUnConf: true,
        },
        remoteSelectSetting: {
            // showSearch: false;不设置keyField
          keyField: 'businessId',
          valueField: 'businessId',
          labelField: 'businessName',
        },
      },
      rules: [{ required: true }],
    }
```

## allowList: true 返回这条下拉框选项的所有内容 list

```js
    {
      field: 'businessId',
      label: '业务名称',
      helpMessage: '下拉列表只包括未配置的业务',
      component: 'RemoteSelect',
      defaultValue: id,
      componentProps: {
        api: businessListApi,
        allowList: true,
        labelInValue: true,
        searchInfo: {
          pageNo: 1,
          pageSize: 999,
          // 可以筛选出未配置的业务
          selectUnConf: true,
        },
        remoteSelectSetting: {
          valueField: 'businessId',
          labelField: 'businessName',
        },
      },
      rules: [{ required: true }],
    }
```
