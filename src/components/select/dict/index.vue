<!--
 * @description: 字典下拉框
 * @author: wenbin.chen
 * @Date: 2020-05-26 12:55:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-30 11:42:53
 * @email: 190848757@qq.com
-->

<script lang="tsx">
  import { Select } from 'ant-design-vue';
  import { defineComponent, computed, unref } from 'vue';
  import { componentMap } from '/@/components/Form/src/componentMap';
  import { getDictData } from '/@/store/dictUtil';
  // import { ComponentType } from '/@/components/Form/src/types/index';
  export default defineComponent({
    name: 'DictSelect',
    extends: Select,
    props: {
      value: [String, Number, Object, Array],
      options: Array,
      codeField: String,
      //   label也使用value值
      dictOnlyValue: Boolean,
      component: {
        type: String,
        default: 'Select',
      },
      // placeholder: {
      //   type: String,
      //   default: '请选择',
      // },
      optionsDisabled: Array,
    },
    setup(props, { listeners }) {
      const getOptions = computed(() => {
        //   接口返回晚于，页面渲染
        const { codeField, optionsDisabled, options, dictOnlyValue } = props;
        if (options && options.length > 0) {
          return options;
        }
        if (!codeField) {
          throw new Error('[DictSelect]缺少codeField');
        }
        const codeList = getDictData(codeField);
        // 转换数据字段
        const newCodeList =
          codeList &&
          codeList.map((item) => {
            const disabled =
              optionsDisabled && optionsDisabled.some((value) => value === item.dictItemCode);
            return {
              value: item.dictItemCode,
              label: dictOnlyValue ? item.dictItemCode : item.dictItemName,
              disabled: Boolean(disabled),
            };
          });
        return newCodeList;
      });

      const getProps = computed(() => {
        const options = unref(getOptions);
        const _props = {};
        Object.keys(props).forEach((key) => {
          const val = props[key];
          val && (_props[key] = props[key]);
        });
        return {
          ...(_props || {}),
          value: props.value,
          options,
        };
      });

      return () => {
        const { component = 'Select' as any } = props;
        const Comp = componentMap.get(component) as any;
        return (
          <Comp
            {...{
              ...unref(getProps),
              on: listeners,
            }}
          />
        );
      };
    },
  });
</script>
