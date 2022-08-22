import { reactive } from 'vue';
import { getCateListApi, getQuestionListApi } from '/@/api/biz/question/list';
import { CateListItem, QuestionListItem } from '/@/api/biz/question/model/listModel';

export enum questionTabsEnum {
  ALL,
  NEW,
  HOT,
  ME,
  ABOUT,
}
export const ALL_CATE = 'ALL_CATE';
export const ALL_CATE_ITEM = { id: ALL_CATE, cateName: '全部分类' };
// 问答列表
export function useQuestionList() {
  const questionState = reactive<{
    data: QuestionListItem[];
    loading: boolean;
    page: number;
    isLast: boolean;
    activekey: questionTabsEnum;
    searchValue: string;
    catList: CateListItem[];
    selectedCate: CateListItem | null;
  }>({
    data: [],
    loading: false,
    page: 1,
    // 是否最后一页
    isLast: false,
    activekey: questionTabsEnum.ALL,
    // 搜索
    searchValue: '',
    // 分类
    catList: [],
    selectedCate: null,
  });
  // 加载分类列表
  async function initCateList() {
    const data = (await getCateListApi({})) || [];
    questionState.catList = [ALL_CATE_ITEM, ...data];
    questionState.selectedCate = questionState.catList[0];
  }
  initCateList();
  // 点击分类
  function handleSelectCate(item: CateListItem) {
    questionState.selectedCate = item;
    fetchQuestionList(1);
  }
  // tab切换：请求第一页
  function handleTabsChange(activekey) {
    questionState.activekey = activekey;
    fetchQuestionList(1);
  }
  // 搜索：请求第一页
  function handleSearch(value) {
    questionState.searchValue = value;
    fetchQuestionList(1);
  }
  // 滚动到底部：加载下一页
  function handleScrollBottom() {
    // 接口未请求结束，不重新请求
    if (questionState.loading) {
      return;
    }
    // 已加载了最后一页
    if (questionState.isLast) {
      return;
    }
    fetchQuestionList();
  }
  async function fetchQuestionList(initPage = 0) {
    try {
      questionState.isLast = false;
      questionState.loading = true;
      questionState.page = initPage || questionState.page;
      // 第一页：重置数据
      if (questionState.page === 1) {
        questionState.data = [];
      }
      const { cateName } = questionState.selectedCate || {};
      const { records, recordTotal } = await getQuestionListApi({
        page: questionState.page,
        pageSize: 20,
        status: questionState.activekey,
        name: questionState.searchValue,
        cateName: cateName === ALL_CATE ? '' : cateName,
      });
      questionState.data = [...questionState.data, ...records];
      // 判断是否最后一页
      if (questionState.data.length === recordTotal) {
        questionState.isLast = true;
      }
      questionState.page += 1;
    } finally {
      questionState.loading = false;
    }
  }

  return {
    questionState,
    fetchQuestionList,
    handleTabsChange,
    handleSearch,
    handleScrollBottom,
    handleSelectCate,
  };
}

// 分类列表
export function useCatList() {}
