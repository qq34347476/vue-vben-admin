<script lang="tsx">
  import { Select } from 'ant-design-vue';
  import { Loading } from '/@/components/Loading';

  import { defineComponent, reactive, watch } from 'vue';

  import { remoteSelectProps } from './props';
  import { OptionsItem, LabelInValueItem } from './types';
  import { isArray, isFunction } from '/@/utils/is';
  import { useDebounceFn } from '@vueuse/core';

  export default defineComponent({
    name: 'RemoteSelect',
    props: remoteSelectProps,
    setup(props, { attrs, emit }) {
      const state = reactive<{
        optionsData: OptionsItem[];
        keywords: string;
        currentValue: any;
        loading: boolean;
      }>({
        optionsData: [],
        keywords: '',
        currentValue: undefined,
        loading: false,
      });

      // 防抖
      const handler = useDebounceFn(fetch, 500);

      // change事件
      function handleChange(obj: LabelInValueItem) {
        const { key = '' } = obj || {};
        const { allowList = false } = props;
        if (allowList) {
          // 返回整条list数据
          const {
            remoteSelectSetting = {
              valueField: 'value',
            },
          } = props || {};
          // 过滤获取该条数据的具体信息
          const curObj = state.optionsData.find(
            (item) => item[remoteSelectSetting.valueField] === key,
          );
          emit('change', curObj);
        } else {
          emit('change', obj);
        }
      }

      // search事件
      function handleSearch(value: string) {
        state.keywords = value;
        handler();
        emit('search', value);
      }

      // 接口请求
      function fetch() {
        const {
          api,
          searchInfo = {},
          remoteSelectSetting,
          delay,
          validator,
          showSearch,
        } = props || {};
        const {
          keyField,
          listField = 'records',
          labelField = 'label',
          valueField = 'value',
        } = remoteSelectSetting || {};
        if (!api && !isFunction(api)) {
          throw new Error('RemoteSelect props: api必须配置');
        }
        if (!keyField && showSearch) {
          throw new Error('RemoteSelect props: showSearch为true时，keyField必须配置');
        }
        if (validator && isFunction(validator)) {
          // 校验不通过，则不执行远程搜索
          if (!validator(state.keywords)) {
            return;
          }
        }
        setTimeout(async () => {
          try {
            state.loading = true;
            showSearch && keyField && (searchInfo[keyField] = state.keywords);
            const res = await api(searchInfo);
            // console.log(res);
            const listData = isArray(res) ? res : res[listField];

            if (listData && listData.length !== 0) {
              const resultOptions = listData.map((item) => {
                return {
                  ...item,
                  label: item[labelField],
                  value: item[valueField],
                };
              });
              state.optionsData = resultOptions;
            } else {
              state.optionsData = [];
            }
          } catch (error) {
            state.optionsData = [];
          } finally {
            state.loading = false;
          }
        }, delay);
      }

      // function getPopupContainer() {
      //   return document.body;
      // }

      watch(
        () => props.value,
        (val) => {
          state.currentValue = val;
        },
        {
          immediate: true,
        },
      ); // 支持搜索：在打开下拉框时去请求
      function handleDropdownVisibleChange(open) {
        if (open) {
          !props.immediate && !state.optionsData.length && handler();
        }
      }

      props.immediate && handler();

      return () => {
        const { optionsData, currentValue, loading } = state;

        return (
          <Select
            {...{
              ...attrs,
              ...props,
              value: currentValue,
            }}
            on={{
              search: handleSearch,
              change: handleChange,
              dropdownVisibleChange: handleDropdownVisibleChange,
            }}
          >
            {{
              notFoundContent: () => loading && <Loading loading={loading} />,
              default: () =>
                optionsData.map((item) => {
                  return <Select.Option key={item.value}>{item.label}</Select.Option>;
                }),
            }}
          </Select>
        );
      };
    },
  });
</script>
