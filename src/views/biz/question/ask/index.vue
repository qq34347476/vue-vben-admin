<!--
 * @LastEditTime: 2022-08-30 11:26:58
 * @Description: 发起提问
-->
<template>
  <div class="mx-2" v-loading="state.loading">
    <div class="flex flex-row items-center my-4">
      <div class="flex-1 mr-2">
        <Input
          class="border-t-0 h-40px border-x-0"
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
        <!-- <Checkbox v-model:checked="state.isAnonymous">匿名提问</Checkbox> -->
        <a-button type="primary" class="mr-2" @click="handleRelease"> 发布 </a-button>
        <a-button @click="handleCancel"> 取消 </a-button>
      </div>
    </div>
    <div ref="wrapperRef">
      <Tinymce v-if="heightRef" v-model="state.content" width="100%" :height="heightRef" />
    </div>
  </div>
</template>
<script lang="ts" setup name="Ask">
  import { nextTick, onMounted, reactive, ref } from 'vue';
  import { Tinymce } from '/@/components/Tinymce/index';
  import {
    Input,
    Select,
    // TODO:匿名提问:二期
    // Checkbox,
  } from 'ant-design-vue';
  import { getCateListApi, questionSaveApi } from '/@/api/biz/question/list';
  import { CateListItem } from '/@/api/biz/question/model/listModel';
  import { useRouter } from 'vue-router';
  import { useCalcHeight } from '/@/hooks/web/useCalcHeight';
  import { CateTypeEnum } from '/@/enums/biz/questionEnum';

  const { go } = useRouter();
  const state = reactive<{
    content: string;
    title: string;
    selectedCate: string;
    // isAnonymous: boolean;
    catList: ({ value: string; label: string } & CateListItem)[];
    loading: boolean;
  }>({
    content: '',
    title: '',
    selectedCate: '',
    // isAnonymous: false,
    catList: [],
    loading: false,
  });
  //   获得scroll高度
  const wrapperRef = ref<HTMLDivElement | null>(null);
  const { heightRef } = useCalcHeight(wrapperRef);
  // 加载分类列表
  async function initCateList() {
    const { records } =
      (await getCateListApi({ pageNo: 1, pageSize: -1, cateType: CateTypeEnum.question })) || [];
    state.catList = records.map((item) => {
      return {
        value: item.cateId,
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
  async function handleRelease() {
    // console.log(state.title, state.content, state.selectedCate);
    try {
      state.loading = true;
      await questionSaveApi({
        title: state.title,
        threadId: state.selectedCate,
        forumThemeInstDTO: { content: state.content },
      });
    } finally {
      state.loading = false;
    }
  }
  // 取消
  function handleCancel() {
    go(-1);
  }
</script>
