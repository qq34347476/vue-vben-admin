import { reactive } from 'vue';
import { getCateListApi, getQuestionListApi } from '/@/api/biz/question/list';
import { QuestionListItem } from '/@/api/biz/question/model/listModel';
import { CateTypeEnum } from '/@/enums/biz/questionEnum';
import { SorterColumnItem } from '/@/views/biz/public/component/BizSorter/index';

export enum questionTabsEnum {
  ALL,
  NEW,
  HOT,
  ME,
  ABOUT,
}
export const COLUMN_DATA: SorterColumnItem[] = [
  {
    dataIndex: 'title',
    title: '标题',
  },
  {
    dataIndex: 'crter',
    title: '发布人',
  },
  {
    dataIndex: 'crteTime',
    title: '发布时间',
  },
  {
    dataIndex: 'updtTime',
    title: '更新时间',
  },
];

export const ALL_CATE = 'ALL_CATE';
export const ALL_CATE_ITEM = { cateId: ALL_CATE, cateName: '全部分类' };
interface CateItem {
  cateId: string;
  cateName: string;
}
// 问答列表
export function useQuestionList() {
  const questionState = reactive<{
    data: QuestionListItem[];
    loading: boolean;
    page: number;
    isLast: boolean;
    activekey: questionTabsEnum;
    searchValue: string;
    catList: CateItem[];
    selectedCate: CateItem | null;
    orderBy: string;
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
    orderBy: '',
  });
  // 排序变换
  function handleSortChange(value: string) {
    console.log('handleSortChange', value);

    questionState.orderBy = value;
    fetchQuestionList(1);
  }
  // 加载分类列表
  async function initCateList() {
    const { records } =
      (await getCateListApi({ pageNo: 1, pageSize: -1, cateType: CateTypeEnum.question })) || [];
    questionState.catList = [
      ALL_CATE_ITEM,
      ...records.map((item) => {
        return { cateId: item.cateId, cateName: item.cateName };
      }),
    ];
    questionState.selectedCate = questionState.catList[0];
  }

  // 点击分类
  function handleSelectCate(item: CateItem) {
    questionState.selectedCate = item;
    fetchQuestionList(1);
  }
  // tab切换：请求第一页
  function handleTabsChange(activekey) {
    questionState.activekey = activekey;
    fetchQuestionList(1);
  }
  // 搜索：输入框变化
  function handlerSearchChange(e: ChangeEvent) {
    questionState.searchValue = e.target.value;
    // console.log('handlerSearchChange', value);
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
      const { cateId } = questionState.selectedCate || {};
      const { records, recordTotal } = await getQuestionListApi({
        pageNo: questionState.page,
        pageSize: 20,
        threadId: cateId === ALL_CATE ? '' : cateId,
        // TODO: 最新最热
        // status: questionState.activekey,
        content: questionState.searchValue,
        orderBy: questionState.orderBy,
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
  // 初始加载数据
  initCateList();
  fetchQuestionList(1);

  return {
    questionState,
    fetchQuestionList,
    handleTabsChange,
    handleSearch,
    handleScrollBottom,
    handleSelectCate,
    handlerSearchChange,
    handleSortChange,
  };
}
