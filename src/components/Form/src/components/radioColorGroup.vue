<!--
 * @LastEditTime: 2022-09-22 13:39:17
 * @Description: 表单颜色选择
-->
<template>
  <div
    ><div :class="prefixCls">
      <template v-for="color in colorList || []" :key="color">
        <span
          @click="handleClick(color)"
          :class="[
            `${prefixCls}__item`,
            {
              [`${prefixCls}__item--active`]: selectColorRef === color,
            },
          ]"
          :style="{
            background: hexToRGB(color, !isSolidRef),
            border: `1px solid ${color}`,
          }"
        >
          <CheckOutlined />
        </span>
      </template>
    </div>
    <RadioGroup
      style="margin-top: 10px"
      v-show="$props.showRadio"
      v-model:value="isSolidRef"
      :options="[
        { label: '实底', value: true },
        { label: '虚底', value: false },
      ]"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, watch } from 'vue';
  import { CheckOutlined } from '@ant-design/icons-vue';
  import { RadioGroup } from 'ant-design-vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { hexToRGB } from '/@/utils/color';

  export default defineComponent({
    name: 'RadioColorGroup',
    components: { CheckOutlined, RadioGroup },
    props: {
      colorList: {
        // 必须为16进制颜色列表
        type: Array as PropType<string[]>,
        default: () => [
          '#0960bd',
          '#0084f4',
          '#009688',
          '#536dfe',
          '#ff5c93',
          '#ee4f12',
          '#0096c7',
          '#9c27b0',
          '#ff9800',
        ],
      },
      defaultColor: {
        type: String,
        default: '',
      },
      showRadio: {
        type: Boolean,
        default: false,
      },
      isSolid: {
        type: Boolean,
        default: true,
      },
    },
    emits: ['change'],
    setup(props, { emit }) {
      const { prefixCls } = useDesign('form-color-picker');
      const selectColorRef = ref();
      const isSolidRef = ref(true);

      watch(
        () => props.defaultColor,
        (val) => {
          if (val) {
            selectColorRef.value = val;
            handleClick(val);
          }
        },
        { immediate: true },
      );

      watch(
        () => props.isSolid,
        (val) => {
          isSolidRef.value = val;
        },
      );

      watch(
        () => isSolidRef.value,
        () => {
          setTimeout(() => {
            handleClick(selectColorRef.value);
          }, 100);
        },
      );

      // 切换颜色
      function handleClick(color: string) {
        selectColorRef.value = color;
        // 拼接标签样式
        const style = `background: ${hexToRGB(
          color,
          !isSolidRef.value,
        )};border: 1px solid ${color};color:${
          isSolidRef.value ? 'white' : color
        };border-radius:5px;padding:5px 10px`;
        emit('change', JSON.stringify({ color, style, isSolid: isSolidRef.value }));
      }

      return {
        prefixCls,
        selectColorRef,
        isSolidRef,
        handleClick,
        hexToRGB,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-form-color-picker';

  .@{prefix-cls} {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &__item {
      width: 20px;
      height: 20px;
      cursor: pointer;
      border: 1px solid #ddd;
      border-radius: 2px;

      svg {
        display: none;
      }

      &--active {
        border: 1px solid lighten(@primary-color, 10%);

        svg {
          display: inline-block;
          margin: 0 0 3px 3px;
          font-size: 12px;
          fill: @white !important;
        }
      }
    }
  }
</style>
