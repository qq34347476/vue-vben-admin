<!--
 * @LastEditTime: 2022-09-16 10:00:07
 * @Description: 个人信息
-->
<template>
  <div class="p-4 h-full">
    <CollapseContainer title="基本设置" :canExpan="false">
      <Row>
        <Col :span="6" class="text-center py-4">
          <CropperAvatar
            :uploadApi="uploadAvatar"
            :value="avatar"
            btnText="更换头像"
            :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
            @change="updateAvatar"
            width="150"
          />
        </Col>
        <Col :span="16" class="pt-8">
          <Description :column="2" :schema="createDesSchemas()" :data="userInfoRef" />
        </Col>
      </Row>
    </CollapseContainer>
    <CollapseContainer class="mt-4" title="个人贡献" :canExpan="false">
      <Row>
        <Col
          :span="8"
          class="text-center my-10"
          v-for="(item, index) in contributionData"
          :key="index"
        >
          <div class="grid grid-cols-4">
            <div class="col-start-2 col-span-1 ...">
              <img :src="item.img" class="float-right" />
            </div>
            <div class="col-start-3 col-span-1 ... grid grid-rows-2 grid-flow-col">
              <div class="row-span-1 ... font-bold text-3xl">{{ item.count }}</div>
              <div class="row-span-1 ...">{{ item.title }}</div>
            </div>
          </div>
        </Col>
      </Row>
    </CollapseContainer>
  </div>
</template>
<script lang="ts" setup>
  import { computed, reactive, onBeforeMount, ref } from 'vue';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';
  import { Row, Col } from 'ant-design-vue';
  import headerImg from '/@/assets/images/header.jpg';
  import { useUserStore } from '/@/store/modules/user';
  import { uploadAvatar } from '/@/api/biz/user/info';
  import { createDesSchemas } from './data';
  import { Description } from '/@/components/Description/index';
  // api
  import { getUserInfoApi, getUserContribution } from '/@/api/biz/user/info';
  import { UserInfo } from '/@/api/biz/user/model/infoModel';

  const userStore = useUserStore();
  // 头像
  const avatar = computed(() => {
    const { avatar } = userStore.getUserInfo;
    console.log(userStore.getUserInfo);
    return avatar || headerImg;
  });
  // 上传头像
  function updateAvatar(src: string) {
    const userinfo = userStore.getUserInfo;
    userinfo.avatar = src;
    userStore.setUserInfo(userinfo);
  }

  // 个人信息
  const userInfoRef = ref<UserInfo>();
  onBeforeMount(async () => {
    const { userId } = userStore.getUserInfo;
    userInfoRef.value = await getUserInfoApi(userId);
  });

  // 个人贡献list
  const contributionData = reactive<
    {
      img: string;
      count: number;
      title: string;
    }[]
  >([
    { img: '/src/assets/images/knowledge.png', count: 0, title: '我的知识库' },
    { img: '/src/assets/images/page.png', count: 0, title: '创建的页面' },
    { img: '/src/assets/images/question.png', count: 0, title: '创建的问答' },
  ]);
  onBeforeMount(async () => {
    const { userId } = userStore.getUserInfo;
    const { spaceCount, pageCount, commentCount } = await getUserContribution(userId);
    contributionData[0].count = spaceCount;
    contributionData[1].count = pageCount;
    contributionData[2].count = commentCount;
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
