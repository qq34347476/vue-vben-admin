<!--
 * @LastEditTime: 2022-09-28 16:59:37
 * @Description: 新增/编辑页面
-->
<script lang="tsx">
  import { defineComponent, shallowReactive } from 'vue';
  import Iframe from '/@/views/sys/iframe/index.vue';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useLoading } from '/@/components/Loading';
  import { getPageByID, pageSave } from '/@/api/biz/library/pageManage';
  import { Icon } from '/@/components/Icon/index';
  import { Input, Select } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import { getPageTreeListData } from '/@/api/biz/library/pageManage';
  import { PageTreeItem, PageRecyclingItem } from '/@/api/biz/library/model/pageManage';
  import { findPath } from '/@/utils/helper/treeHelper';
  import { getCateListApi } from '/@/api/biz/question/list';
  import { CateListItem } from '/@/api/biz/question/model/listModel';
  import { CateTypeEnum } from '/@/enums/biz/questionEnum';
  import { getKnowledgeDetailApi } from '/@/api/biz/library/knowledge';
  import { PAGE_DEFAULT_TITLE } from '/@/enums/biz/libraryEnum';
  import { useDebounceFn } from '@vueuse/core';

  export default defineComponent({
    name: 'EditPage',
    props: {
      spaceId: {
        type: String,
        required: true,
      },
      pageId: {
        type: String,
        required: true,
      },
    },
    emits: ['success'],

    setup(props, { emit }) {
      const state = shallowReactive<{
        page: PageRecyclingItem | undefined;
        // tree: PageTreeItem[];
        pageTitle: string;
        path: string;
        cates: CateListItem[];
        selectedCate: string;
      }>({
        page: undefined,
        pageTitle: '',
        path: '',
        // tree: [],
        cates: [],
        selectedCate: '',
      });
      const { push } = useRouter();

      const globSetting = useGlobSetting();
      const [openFullLoading, closeFullLoading] = useLoading({
        tip: '加载中...',
      });

      async function initPage() {
        console.log(props.spaceId, props.pageId);
        try {
          const { pageId = '', spaceId } = props || {};
          if (!pageId) {
            return;
          }
          openFullLoading();
          const [data, tree, knowledge, cates] = await Promise.all([
            getPageByID(pageId),
            getPageTreeListData({ spaceId }),
            getKnowledgeDetailApi(spaceId),
            getCateListApi({ pageNo: 1, pageSize: -1, cateType: CateTypeEnum.knowledge }),
          ]);
          const { pageTitle, cateId } = data;
          state.pageTitle = pageTitle === PAGE_DEFAULT_TITLE ? '' : pageTitle;
          state.selectedCate = cateId;

          state.page = data;
          // state.tree = tree;
          state.cates = cates.records.map((item) => {
            return {
              value: item.cateId,
              label: item.cateName,
              ...item,
            };
          });

          const list =
            findPath<PageTreeItem>(tree, (item) => item.pageId === pageId)?.map(
              (item) => item.pageTitle,
            ) || [];
          list.pop();

          knowledge && list.unshift(knowledge.name);
          state.path = list.join(' / ') || '';
        } finally {
          closeFullLoading();
        }
      }
      initPage();
      // 分类修改
      function handleCateChange() {
        const { pageId = '' } = props || {};
        pageSave({ pageId, cateId: state.selectedCate });
      }
      function handlePressEnter() {
        const { pageId = '' } = props || {};
        // console.log(state.pageTitle);
        if (!state.pageTitle) {
          return;
        }
        pageSave({ pageId, pageTitle: state.pageTitle || PAGE_DEFAULT_TITLE });
      }
      const handleTitleChange = useDebounceFn(handlePressEnter, 1000);
      function handleRelease() {
        emit('success');
      }

      function handleCancel() {
        // back();
        const { spaceId = '' } = props || {};
        push('/library/pageManage/' + spaceId);
      }
      return () => {
        const { externalUrl } = state.page || {};

        return (
          <div class="divide-y ">
            <div class="px-4 py-2 bg-white">
              <div class="flex">
                <div class="flex-1 ">
                  <span class="text-primary pr-3">{state.path}</span>
                  <Icon icon="ant-design:tag-filled" />
                </div>
                <div>
                  <a-button type="primary" size="small" class="mr-3 !px-3" onClick={handleRelease}>
                    发布
                  </a-button>
                  <a-button size="small" class="!px-3" onClick={handleCancel}>
                    返回
                  </a-button>
                </div>
              </div>
              <div class="flex pt-2">
                <div class="flex-1 pr-2">
                  <Input
                    v-model:value={state.pageTitle}
                    placeholder={PAGE_DEFAULT_TITLE}
                    onChange={handleTitleChange}
                  />
                </div>
                <div>
                  <Select
                    options={state.cates}
                    v-model:value={state.selectedCate}
                    style="width: 200px"
                    onChange={handleCateChange}
                  />
                </div>
              </div>
            </div>
            {externalUrl && <Iframe frameSrc={globSetting.etherpadUrl + externalUrl} />}
          </div>
        );
      };
    },
  });
</script>
