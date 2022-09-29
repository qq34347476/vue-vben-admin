<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { Input, Tabs, Skeleton, Empty, TypographyParagraph } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon/index';
  import { VScroll } from '/@/components/VirtualScroll/index';
  import { useCalcHeight } from '/@/hooks/web/useCalcHeight';
  import { QuestionListItem } from '/@/api/biz/question/model/listModel';
  import { ScrollContainer } from '/@/components/Container/index';
  import { BizSorter } from '/@/views/biz/public/component/BizSorter/index';

  import { questionTabsEnum, useQuestionList, COLUMN_DATA } from './useActions';
  import { useRouter } from 'vue-router';
  import { html2Str } from '/@/utils/other';
  export default defineComponent({
    name: 'QuestionList',
    setup() {
      const {
        questionState,
        handleSearch,
        handleTabsChange,
        handleScrollBottom,
        handleSelectCate,
        handlerSearchChange,
        handleSortChange,
      } = useQuestionList();
      const { push } = useRouter();
      // 发起提问
      function handleAsk() {
        push('/question/ask');
      }
      // 问答管理
      function handleManage() {
        push('/question/manage');
      }
      // 问答详情页
      function handleGoDetail(item: QuestionListItem) {
        push(`/question/detail/${item.themeId}`);
      }
      //   获得scroll高度
      const wrapperRef = ref<HTMLDivElement | null>(null);
      const { heightRef } = useCalcHeight(wrapperRef);
      return () => {
        return (
          <div class="flex flex-col h-full">
            {
              // 头部
            }
            <div class="flex flex-row p-3 bg-white">
              <div class="flex-1">
                <Input.Search
                  style="width: 300px"
                  placeholder="请输入关键字搜索"
                  onSearch={handleSearch}
                  onChange={handlerSearchChange}
                />
              </div>
              <div>
                <a-button type="primary" class="mr-2" onClick={handleAsk}>
                  <Icon icon="ant-design:form-outlined" />
                  发起提问
                </a-button>
                <a-button onClick={handleManage}> 问答管理 </a-button>
              </div>
            </div>
            {
              // 内容
            }
            <div class="flex flex-row flex-1 m-3">
              {
                // 分类
              }
              <div
                class="mr-3 text-center bg-white w-180px"
                style={{ height: heightRef.value + 64 - 14 + 'px' }}
              >
                <ScrollContainer>
                  {questionState.catList.map((item, index) => {
                    return (
                      <div
                        class={[
                          'cursor-pointer h-40px leading-40px ',
                          questionState.selectedCate?.cateId === item.cateId
                            ? 'bg-primary text-white '
                            : 'hover:text-primary',
                          index === 0 ? 'border-b-1' : '',
                        ]}
                        onClick={handleSelectCate.bind(null, item)}
                        key={item.cateId}
                      >
                        {item.cateName}
                      </div>
                    );
                  })}
                </ScrollContainer>
              </div>
              {
                // 问答tabs
              }
              <div class="relative flex-1 bg-white">
                <Tabs onChange={handleTabsChange}>
                  <Tabs.TabPane key={questionTabsEnum.ALL}>
                    {{
                      tab: () => <span class="px-5">全部问答</span>,
                    }}
                  </Tabs.TabPane>
                  <Tabs.TabPane key={questionTabsEnum.NEW}>
                    {{
                      tab: () => (
                        <span class="pl-5">
                          最新问答
                          <Icon icon="clarity:new-solid" class="!text-green-500" size={20} />
                        </span>
                      ),
                    }}
                  </Tabs.TabPane>
                  {
                    // TODO: 二期
                    // <Tabs.TabPane key={questionTabsEnum.HOT}>
                    //   {{
                    //     tab: () => (
                    //       <span class="pl-5">
                    //         最热问答
                    //         <Icon icon="ant-design:fire-filled" class="!text-red-500" size={20} />
                    //       </span>
                    //     ),
                    //   }}
                    // </Tabs.TabPane>
                  }
                  <Tabs.TabPane key={questionTabsEnum.ME}>
                    {{
                      tab: () => <span class="px-5">我的问答</span>,
                    }}
                  </Tabs.TabPane>
                  <Tabs.TabPane key={questionTabsEnum.ABOUT}>
                    {{
                      tab: () => <span class="px-5">我参与的</span>,
                    }}
                  </Tabs.TabPane>
                </Tabs>
                {
                  // 排序
                }
                <BizSorter
                  columnData={COLUMN_DATA}
                  class="absolute right-3 top-12px"
                  onChange={handleSortChange}
                />

                {
                  // 问答列表滚动区
                }
                <div ref={wrapperRef}>
                  {questionState.loading && questionState.page === 1 ? (
                    <Skeleton />
                  ) : questionState.data && questionState.data.length ? (
                    <VScroll
                      itemHeight={200}
                      items={questionState.data}
                      height={heightRef.value - 14}
                      onScrollBottom={handleScrollBottom}
                      bench={10}
                    >
                      {{
                        default: ({ item }: { item: QuestionListItem }) => (
                          <div class="px-4 ">
                            <div
                              class="p-4 shadow-md  border-1 hover:bg-gray-500/4"
                              onClick={handleGoDetail.bind(null, item)}
                            >
                              <div class="flex flex-row mb-2">
                                <div class="flex-1 pr-2 text-base font-bold line-clamp-1">
                                  {item.title}
                                </div>
                                <div style={JSON.parse(item.cateDTO.cateConfig).style}>
                                  {item.cateDTO.cateName}
                                </div>
                              </div>
                              <div class="mb-2 text-xs text-gray-500">
                                {
                                  //   <span class="px-2">
                                  //   <Icon icon="ant-design:eye-outlined" />
                                  //   {item.look}
                                  // </span>
                                }
                                <span class="pr-3">
                                  <Icon icon="ant-design:user-outlined" />
                                  {item.crter}
                                </span>
                                <span class="pr-2">发布于 {item.crteTime}</span>
                              </div>
                              {
                                // <div
                                //   class="mb-2 h-45px line-clamp-2"
                                //   v-html-parser:small={item.forumThemeInstDTO?.content || ''}
                                // ></div>
                                // {{ ellipsisSymbol: () => '查看更多' }}
                                <TypographyParagraph
                                  class="cursor-pointer"
                                  ellipsis={{
                                    rows: 2,
                                  }}
                                  content={html2Str(item.forumThemeInstDTO?.content || '', 300)}
                                ></TypographyParagraph>
                              }
                              <div>
                                <a-button type="text" class="mr-2 !hover:text-primary">
                                  <Icon icon="ant-design:edit-outlined" />
                                  写回答
                                </a-button>
                                {
                                  // <a-button type="text" class="ml-2 !hover:text-primary">
                                  //   <Icon icon="ant-design:star-outlined" />
                                  //   收藏
                                  // </a-button>
                                }
                                <a-button type="text" class="mr-2 !hover:text-primary">
                                  <Icon icon="ant-design:message-outlined" />
                                  {item.count || 0}条回答
                                </a-button>
                              </div>
                            </div>
                          </div>
                        ),
                      }}
                    </VScroll>
                  ) : (
                    <Empty />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      };
    },
  });
</script>
