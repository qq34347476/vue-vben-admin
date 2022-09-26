<!--
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-15 10:59:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-26 11:23:25
 * @FilePath: \knowledge-web\src\views\biz\library\knowledgeBase\detailDrawer\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="type === 'add' ? '新增知识库' : '编辑知识库'"
    width="90%"
    :is-detail="true"
    @visible-change="handleVisibleChange"
    showFooter
    @ok="handleOk"
    :destroy-on-close="true"
  >
    <Spin :spinning="loadingRef">
      <div class="mb-2 common-title">基本信息</div>
      <BasicForm @register="registerForm">
        <template #switch>
          <FormItem>
            <Switch
              :checked="switchValRef"
              @change="handelSwitchChange"
              checked-children="开"
              un-checked-children="关"
            />
            <span class="ml-10" v-show="unref(switchValRef)">
              <Checkbox :checked="true" disabled>新增</Checkbox>
              <Checkbox v-model:checked="editCheckedRef">编辑</Checkbox>
            </span>
          </FormItem>
        </template>
      </BasicForm>
      <div class="common-title">用户权限</div>
      <Tabs class="bg-white p-0" style="margin: 16px; padding: 0" type="card">
        <TabPane :key="1" tab="分组">
          <BasicTable @register="registerGroupTable" style="padding: 0" />
        </TabPane>
        <TabPane :key="2" tab="用户" forceRender>
          <BasicTable @register="registerUserTable" style="padding: 0" />
        </TabPane>
      </Tabs>
    </Spin>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, unref, nextTick } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable } from '/@/components/Table';
  import { BasicForm } from '/@/components/Form';
  import { Switch, Checkbox, Spin, Tabs, TabPane, FormItem } from 'ant-design-vue';
  import { useKonwledgeForm } from './useKonwledgeForm';
  import { useUserTable } from './useUserTable';
  // api
  import { getKnowledgeDetailApi, knowledgeSaveApi } from '/@/api/biz/library/knowledge';
  import { KnowledgeItem } from '/@/api/biz/library/model/knowledgeModel';

  const props = defineProps<{
    knowledgeRecord: KnowledgeItem | undefined;
    type: String;
  }>();

  const emit = defineEmits(['success', 'register']);

  // form
  const {
    registerForm,
    setFieldsValue,
    // getFieldsValue,
    switchValRef,
    editCheckedRef,
    handelSwitchChange,
    validateFields,
    clearValidate,
    selectDataRef,
  } = useKonwledgeForm();

  // table
  const {
    registerGroupTable,
    groupSetSelectedRowKeys,
    registerUserTable,
    userSetSelectedRowKeys,
    groupSelectArr,
    userSelectArr,
  } = useUserTable();

  // drawer
  const loadingRef = ref(false);
  const [registerDrawer, { setDrawerProps }] = useDrawerInner();
  async function handleVisibleChange(visibel) {
    if (visibel) {
      if (props.type === 'edit') {
        loadingRef.value = true;
        try {
          const data = await getKnowledgeDetailApi(props.knowledgeRecord?.spaceId || '');
          const adminsSelect = data.admins?.map((item) => {
            return item.custId;
          });
          setFieldsValue({
            ...data,
            admins: adminsSelect,
          });
          switchValRef.value = data.needAudit;
          editCheckedRef.value = data.needAuditOperate?.includes('edit');
          nextTick(() => {
            clearValidate();
            const groupSelect = data.groupAuthList.map((item) => {
              return item.objId;
            });
            const userSelect = data.userAuthList.map((item) => {
              return item.objId;
            });
            groupSetSelectedRowKeys(groupSelect);
            userSetSelectedRowKeys(userSelect);
            groupSelectArr.push(...groupSelect);
            userSelectArr.push(...userSelect);
            selectDataRef.value = adminsSelect;
          });
        } finally {
          loadingRef.value = false;
        }
      }
    } else {
      switchValRef.value = false;
      editCheckedRef.value = false;
    }
  }

  // handleOk
  async function handleOk() {
    if (selectDataRef.value.length) {
      setDrawerProps({ confirmLoading: true });
      try {
        const res = await validateFields(['name', 'code', 'contentDesc']);
        const params = {
          ...res,
          needAudit: switchValRef.value,
          needAuditOperate: switchValRef.value
            ? editCheckedRef.value
              ? ['add', 'edit']
              : ['add']
            : [],
          admins: selectDataRef.value.map((item) => {
            return { custId: item };
          }),
          userAuthSave: {
            saveGroupAuths: groupSelectArr.map((item) => {
              return {
                objId: item,
                authType: '1',
              };
            }),
            saveUserAuths: userSelectArr.map((item) => {
              return {
                objId: item,
                authType: '1',
              };
            }),
          },
        };
        if (props.type === 'edit') {
          params.spaceId = props.knowledgeRecord?.spaceId;
        }
        await knowledgeSaveApi(params);
        emit('success');
      } finally {
        setDrawerProps({ confirmLoading: false });
      }
    } else {
      validateFields();
    }
  }
</script>
