import { RemoteSelectSetting } from './types';
import type { PropType } from 'vue';

export const remoteSelectProps = {
  getPopupContainer: {
    type: Function as PropType<Fn>,
    default: (triggerNode) => triggerNode.parentNode,
  },
  // 接口请求
  api: {
    type: Function as PropType<(...arg) => Promise<any>>,
    default: null,
  },
  //   labelInValue默认为true；设置值的时候必须{key,label}
  value: {
    type: [String, Object, Array, Number],
    default: '',
  },
  // 额外的请求参数
  searchInfo: {
    type: Object,
    default: () => {},
  },
  // 下拉框初始化是否请求接口
  immediate: {
    type: Boolean,
    default: true,
  },
  // 延迟时间(避免同一个页面请求同样接口2次，只有第二个有效)
  delay: {
    type: Number,
    default: 0,
  },
  // 是否返回这条下拉框选项的所有内容list
  allowList: {
    type: Boolean,
    default: false,
  },
  // 根据请求接口具体设置
  remoteSelectSetting: {
    type: Object as PropType<RemoteSelectSetting>,
    default: () => {
      return {
        listField: 'records', // 接口返回数据所取字段，默认取rows
        keyField: 'key', // 输入框搜索关键字的字段名
        valueField: 'value', // 下拉框内容value对应的字段
        labelField: 'label', // 下拉框内容label对应的字段
      };
    },
  },
  // 支持清除
  allowClear: {
    type: Boolean,
    default: true,
  },
  // 是否只读
  disabled: {
    type: Boolean,
    default: false,
  },
  // 使单选模式可搜索
  showSearch: {
    type: Boolean,
    default: false,
  },
  // 搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索
  optionFilterProp: {
    type: String,
    default: 'value',
  },
  // 是否默认高亮第一个选项
  defaultActiveFirstOption: {
    type: Boolean,
    default: false,
  },
  // 是否根据输入项进行筛选
  filterOption: {
    type: Boolean,
    default: false,
  },
  // 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 string 变为 {key: string, label: vNodes} 的格式
  labelInValue: {
    type: Boolean,
    default: false,
  },
  // 设置 Select 的模式为多选或标签
  mode: {
    type: String as PropType<'multiple' | 'tags' | 'combobox'>,
  },
  // 选择框默认文字
  placeholder: {
    type: String,
    default: '请选择或输入名称匹配',
  },
  //   校验通过后，才执行搜索
  validator: {
    type: Function as PropType<(value: string) => boolean>,
  },
};
