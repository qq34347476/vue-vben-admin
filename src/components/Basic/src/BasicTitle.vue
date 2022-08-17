<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-17 14:41:39
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-19 17:29:21
 * @FilePath: \knowledge-web\src\components\Basic\src\BasicTitle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <span :class="getClass">
    <slot></slot>
    <BasicHelp :class="`${prefixCls}-help`" v-if="helpMessage" :text="helpMessage" />
  </span>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { useSlots, computed } from 'vue';
  import BasicHelp from './BasicHelp.vue';
  import { useDesign } from '/@/hooks/web/useDesign';

  const props = defineProps({
    /**
     * Help text list or string
     * @default: ''
     */
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
    /**
     * Whether the color block on the left side of the title
     * @default: false
     */
    span: { type: Boolean },
    /**
     * Whether to default the text, that is, not bold
     * @default: false
     */
    normal: { type: Boolean },
  });

  const { prefixCls } = useDesign('basic-title');
  const slots = useSlots();
  const getClass = computed(() => [
    prefixCls,
    { [`${prefixCls}-show-span`]: props.span && slots.default },
    { [`${prefixCls}-normal`]: props.normal },
  ]);
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-basic-title';

  .@{prefix-cls} {
    position: relative;
    display: flex;
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
    color: @text-color-base;
    cursor: pointer;
    user-select: none;

    &-normal {
      font-size: 14px;
      font-weight: 500;
    }

    &-show-span::before {
      float: left;
      width: 4px;
      height: 16px;
      margin: auto 4px auto 0;
      background-color: @primary-color;
      content: '';
    }

    &-help {
      margin-left: 10px;
    }
  }
</style>
