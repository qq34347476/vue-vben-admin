<!--
 * @LastEditTime: 2022-08-30 17:44:20
 * @Description: 排序
-->

<template>
  <div>
    <Popover v-model:visible="state.visible" trigger="click">
      <template #title>
        <a-button @click="reset" block size="small" type="text" class="!hover:text-primary">
          重置
        </a-button>
      </template>

      <template #content>
        <div>
          <div class="mb-2">
            <div
              v-for="item in props.columnData"
              :class="[
                'cursor-pointer h-30px leading-30px text-sm px-2',
                state.columnValue === item.dataIndex
                  ? 'bg-primary text-white '
                  : 'hover:text-primary',
              ]"
              :key="item.dataIndex"
              @click="handleChange(item)"
              >{{ item.title }}
            </div>
          </div>
          <RadioGroup
            @change="handleSortChange"
            v-model:value="state.sortValue"
            :options="state.options"
          />
          <!-- <div class="mt-2">
            <a-button type="link" block size="small"> 重置 </a-button>
          </div> -->
        </div>
      </template>
      <Icon icon="bx:sort" class="!hover:text-primary px-2" />
    </Popover>
  </div>
</template>
<script lang="ts" setup name="BizSorter">
  import { shallowReactive } from 'vue';
  import { Icon } from '/@/components/Icon/index';
  import { Popover, RadioGroup } from 'ant-design-vue';
  import { OrderByEnum } from '/@/enums/biz/indexEnum';
  import { SorterColumnItem } from './types';
  // emit
  const emit = defineEmits<{
    (e: 'change', orderBy: string): void;
  }>();

  const props = defineProps({
    columnData: { type: Array as PropType<SorterColumnItem[]>, required: true },
  });
  const state = shallowReactive({
    columnValue: '',
    sortValue: '',
    options: [
      {
        value: OrderByEnum.ASC,
        label: '正序',
      },
      {
        value: OrderByEnum.DESC,
        label: '倒序',
      },
    ],
    visible: false,
  });

  function handleChange(item: SorterColumnItem) {
    state.columnValue = item.dataIndex;
    trigger();
  }
  function handleSortChange() {
    trigger();
  }
  function trigger() {
    // console.log('trigger', state.columnValue, state.sortValue);

    if (state.columnValue && state.sortValue) {
      emit('change', `${state.columnValue} ${state.sortValue}`);
      state.visible = false;
    }
  }
  function reset() {
    state.columnValue = '';
    state.sortValue = '';
    emit('change', '');
    state.visible = false;
  }
</script>
