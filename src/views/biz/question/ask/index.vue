<!--
 * @LastEditTime: 2022-08-23 14:49:19
 * @Description: 发起提问
-->
<template>
  <div class="mx-2">
    <div class="flex flex-row my-4 items-center">
      <div class="flex-1 mr-2">
        <Input
          class="h-40px border-t-0 border-x-0"
          v-model:value="state.title"
          placeholder="问答标题"
        />
      </div>
      <div class="mr-4">
        <Select
          size="large"
          :options="state.catList"
          v-model:value="state.selectedCate"
          style="width: 200px"
        />
      </div>
      <div>
        <Checkbox v-model:checked="state.isAnonymous">匿名提问</Checkbox>
        <a-button type="primary" class="mr-2" @click="handleRelease"> 发布 </a-button>
        <a-button @click="handleCancel"> 取消 </a-button>
      </div>
    </div>
    <div ref="wrapperRef">
      <Tinymce v-if="heightRef" v-model="state.content" width="100%" :height="heightRef" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { nextTick, onMounted, reactive, ref } from 'vue';
  import { Tinymce } from '/@/components/Tinymce/index';
  import { Input, Select, Checkbox } from 'ant-design-vue';
  import { getCateListApi } from '/@/api/biz/question/list';
  import { CateListItem } from '/@/api/biz/question/model/listModel';
  import { useRouter } from 'vue-router';
  import { useCalcHeight } from '/@/hooks/web/useCalcHeight';

  const { go } = useRouter();
  const state = reactive<{
    content: string;
    title: string;
    selectedCate: string;
    isAnonymous: boolean;
    catList: ({ value: string; label: string } & CateListItem)[];
  }>({
    content: '',
    title: '',
    selectedCate: '',
    isAnonymous: false,
    catList: [],
  });
  //   获得scroll高度
  const wrapperRef = ref<HTMLDivElement | null>(null);
  const { heightRef } = useCalcHeight(wrapperRef);
  // 加载分类列表
  async function initCateList() {
    const data = (await getCateListApi({})) || [];
    state.catList = data.map((item) => {
      return {
        value: item.id,
        label: item.cateName,
        ...item,
      };
    });
    await nextTick();
    state.catList && state.catList.length && (state.selectedCate = state.catList[0].value);
  }

  onMounted(() => {
    initCateList();
  });
  // function handleChange(value: string) {
  //   console.log(value);
  // }
  // 发布
  function handleRelease() {
    console.log(state.title, state.content, state.selectedCate);
  }
  // 取消
  function handleCancel() {
    go(-1);
  }
</script>
