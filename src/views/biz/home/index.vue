<!--
 * @LastEditTime: 2022-09-24 19:47:04
 * @Description: 
-->
<template>
  <div class="p-4 text-right bg-white">
    <Button type="primary" class="mr-2">创建页面</Button>
    <Button class="mr-2" @click="handlePageManage">我的知识库</Button>
  </div>
  <Row>
    <Col :span="14" class="p-4">
      <div class="grid grid-cols-2 gap-4 p-4 bg-white">
        <div>
          <div class="text-xl font-bold text-blue-500">
            您好，{{ userStore.userInfo?.realName }}
          </div>
          <div>欢迎来到保睿通企业知识库，请开始你的知识之旅~</div>
        </div>
        <img src="/src/assets/images/home.png" style="height: 254px" />
      </div>
    </Col>
    <Col :span="10" class="py-4 pr-4">
      <div class="p-4 mb-0 bg-white common-title">数据统计</div>
      <div class="bg-white h-fill" ref="chartRef" style="height: 237px"></div>
    </Col>
    <Col :span="8" class="px-4">
      <div
        ref="wrapperRef"
        class="p-4 bg-white"
        :style="'height:' + (heightRef - 16) + 'px;min-height:250px'"
      >
        <div class="mb-0 common-title">最近更新</div>
        <div class="flex flex-wrap items-start h-full">
          <div class="w-full px-2 pt-4" v-for="(item, index) in listData.update" :key="index">
            <div>
              <Icon icon="akar-icons:file" style="color: #3b82f6" />
              <a>{{ item.pageName }}</a>
              <span class="float-right">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </Col>
    <Col :span="8" class="pr-4">
      <div
        ref="wrapperRef"
        class="p-4 bg-white"
        :style="'height:' + (heightRef - 16) + 'px;min-height:250px'"
      >
        <div class="mb-0 common-title">最近访问</div>
        <div class="flex flex-wrap items-start h-full">
          <div class="w-full px-2 pt-4" v-for="(item, index) in listData.visit" :key="index">
            <div>
              <Icon icon="akar-icons:file" style="color: #3b82f6" />
              <a>{{ item.pageName }}</a>
            </div>
          </div>
        </div>
      </div>
    </Col>
    <Col :span="8" class="pr-4">
      <div
        ref="wrapperRef"
        class="p-4 bg-white"
        :style="'height:' + (heightRef - 16) + 'px;min-height:250px'"
      >
        <div class="mb-0 common-title">知识贡献排名</div>
        <div class="flex flex-wrap items-start h-full">
          <div class="w-full px-2 pt-4" v-for="(item, index) in listData.contribution" :key="index">
            <div>
              <span>{{ item.userName }}</span>
              <Tag color="blue" style="margin-left: 16px">{{ item.department }}</Tag>
              <span class="float-right">{{ item.count }} 篇</span>
            </div>
          </div>
        </div>
      </div>
    </Col>
  </Row>
</template>
<script lang="ts" setup>
  import { onBeforeMount, reactive, ref } from 'vue';
  import { Button, Row, Col, Tag } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';
  import { useCreatOption } from './useCreateOption';
  import { Icon } from '/@/components/Icon';
  import { useCalcHeight } from '/@/hooks/web/useCalcHeight';
  import { useRouter } from 'vue-router';

  // api
  import { getHomeUpdate, getHomeContribution, getHomeVisit } from '/@/api/biz/home/index';
  import { HomeUpdateItem, HomeContributionItem } from '/@/api/biz/home/model/indexModel';

  // 获取用户名
  const userStore = useUserStore();

  // 创建图表
  const { chartRef, getEchartData } = useCreatOption();

  const listData = reactive<{
    update: HomeUpdateItem[];
    visit: HomeUpdateItem[];
    contribution: HomeContributionItem[];
  }>({
    update: [],
    visit: [],
    contribution: [],
  });
  onBeforeMount(async () => {
    getEchartData();
    listData.update = await getHomeUpdate();
    listData.visit = await getHomeVisit();
    listData.contribution = await getHomeContribution();
  });

  // 计算高度
  const wrapperRef = ref<HTMLDivElement | null>(null);
  const { heightRef } = useCalcHeight(wrapperRef);
  const { push } = useRouter();
  function handlePageManage() {
    // 进入有效知识库
    push('/library/knowledge/effective');
  }
</script>
