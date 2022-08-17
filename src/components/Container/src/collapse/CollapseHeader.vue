<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-10 13:39:51
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-19 17:35:34
 * @FilePath: \knowledge-web\src\components\Container\src\collapse\CollapseHeader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div :class="['px-2', $attrs.class]">
    <BasicTitle :helpMessage="helpMessage" :span="true">
      <template v-if="title">
        {{ title }}
      </template>
      <template v-else>
        <slot name="title"></slot>
      </template>
    </BasicTitle>
    <div :class="`${prefixCls}__action`">
      <slot name="action"></slot>
      <BasicArrow v-if="canExpan" up :expand="show" @click="$emit('expand')" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicArrow, BasicTitle } from '/@/components/Basic';

  const props = {
    prefixCls: { type: String },
    helpMessage: {
      type: [Array, String] as PropType<string[] | string>,
      default: '',
    },
    title: { type: String },
    show: { type: Boolean },
    canExpan: { type: Boolean },
  };

  export default defineComponent({
    components: { BasicArrow, BasicTitle },
    inheritAttrs: false,
    props,
    emits: ['expand'],
  });
</script>
