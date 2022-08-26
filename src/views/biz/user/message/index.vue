<!--
 * @LastEditTime: 2022-08-26 14:18:12
 * @Description: 
-->
<template>
  <div class="bg-white m-4 p-4 relative">
    <span class="common-title">我的消息</span>
    <Select
      class="top-3 right-4"
      style="position: absolute"
      :options="MessageTypeList"
      default-value=""
      @change="handleSelectCate"
    />
  </div>
  <div class="h-full bg-white m-4" ref="wrapperRef">
    <Skeleton v-if="messageState.loading && messageState.page === 1" />
    <div class="virtual-scroll-demo-wrap p-4" v-else>
      <VScroll
        :itemHeight="56"
        :items="messageState.data"
        :height="heightRef - 50"
        :bench="10"
        :show-no-more="messageState.isLast"
        @scroll-bottom="handleScrollBottom"
      >
        <template #default="{ item }">
          <div
            class="virtual-scroll-demo__item border-b p-1 cursor-pointer"
            @click="handleMessage(item)"
          >
            <div>
              <span class="text-blue-500">{{ item.userName }}</span>
              <span v-if="item.type === 'answer'">
                回复了你发布的回答 <span class="text-blue-500">{{ item.questionName }}</span>
              </span>
              <span v-else>
                在页面 <span class="text-blue-500">{{ item.pageName }}</span> 中提及你
              </span>
            </div>
            <div class="mt-1">{{ item.time }}</div>
          </div>
        </template>
      </VScroll>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeMount, ref } from 'vue';
  import { MessageTypeList } from '/@/enums/biz/userEnum';
  import { useCalcHeight } from '/@/hooks/web/useCalcHeight';
  import { useQuestionList } from './useActions';
  // component
  import { Select, Skeleton } from 'ant-design-vue';
  import { VScroll } from '/@/components/VirtualScroll/index';

  //   获得scroll高度
  const wrapperRef = ref<HTMLDivElement | null>(null);
  const { heightRef } = useCalcHeight(wrapperRef);

  const { messageState, handleScrollBottom, handleSelectCate, handleMessage } = useQuestionList();

  // 获取消息数据
  onBeforeMount(async () => {
    handleScrollBottom();
  });
</script>
