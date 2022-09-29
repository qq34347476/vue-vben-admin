<script lang="tsx">
  import { computed, defineComponent, shallowReactive, watch } from 'vue';
  import { PageRecyclingItem, PageRecyclingPublicItem } from '/@/api/biz/library/model/pageManage';
  import Iframe from '/@/views/sys/iframe/index.vue';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useLoading } from '/@/components/Loading';
  import { getPageByID } from '/@/api/biz/library/pageManage';
  import { Icon } from '/@/components/Icon/index';
  import { Dropdown, Menu, Tag } from 'ant-design-vue';
  import { MORE_MENUS, TreeMenuKeyEnum } from '../types';
  import { PAGE_TYPE_LIST } from '/@/enums/biz/libraryEnum';

  export default defineComponent({
    name: 'PageContent',
    props: {
      spaceId: {
        type: String,
        required: true,
      },
      path: {
        type: String,
      },
      page: { type: Object as PropType<PageRecyclingPublicItem> },
    },
    emits: ['delete', 'move', 'copy', 'edit', 'auth'],
    setup(props, { emit }) {
      const state = shallowReactive<{ page: PageRecyclingItem | undefined }>({ page: undefined });
      const globSetting = useGlobSetting();
      const [openFullLoading, closeFullLoading] = useLoading({
        tip: '加载中...',
      });
      watch(
        () => props.page,
        (value) => {
          if (!value) {
            state.page = undefined;
          } else {
            initPage();
          }
        },
        { immediate: true },
      );
      async function initPage() {
        try {
          const { pageId = '' } = props.page || {};
          if (!pageId) {
            return;
          }
          openFullLoading();
          const data = await getPageByID(pageId);
          state.page = data;
        } finally {
          closeFullLoading();
        }
      }
      function handleMoreClick({ key }) {
        const { pageId, pageTitle } = state.page || {};
        if (key === TreeMenuKeyEnum.MORE_DELETE) {
          emit('delete', { pageId, pageTitle });
        } else if (key === TreeMenuKeyEnum.MORE_MOVE) {
          emit('move');
        } else if (key === TreeMenuKeyEnum.MORE_COPY) {
          emit('copy');
        } else if (key === TreeMenuKeyEnum.MORE_AUDIT) {
          emit('auth');
        }
      }
      function handleEdit() {
        emit('edit');
      }
      const pageTypeComputed = computed(() => {
        const { pageType } = state.page || {};
        if (!pageType) {
          return null;
        }

        return PAGE_TYPE_LIST.find((item) => item.value === pageType);
      });

      return () => {
        const { pageTitle, onlyReadUrl } = props.page || {};
        const { crter, crteTime, updtTime, cateDTO } = state.page || {};

        return (
          <div class="divide-y ">
            <div class="px-4 py-2 bg-white">
              <div class="flex">
                <div class="flex-1 text-primary">{props.path}</div>
                <div>
                  {pageTypeComputed.value && (
                    <Tag color={pageTypeComputed.value.type}>{pageTypeComputed.value.label}</Tag>
                  )}
                  <a-button
                    type="text"
                    size="small"
                    class="mr-2 !hover:text-primary"
                    onClick={handleEdit}
                  >
                    <Icon icon="ant-design:edit-outlined" />
                    编辑
                  </a-button>
                  <a-button type="text" size="small" class="mr-2 !hover:text-primary">
                    <Icon icon="ant-design:star-outlined" />
                    收藏
                  </a-button>
                  <Dropdown trigger={['click']}>
                    {{
                      default: () => (
                        <a-button type="text" size="small" class="mr-2 !hover:text-primary">
                          <Icon icon="ant-design:edit-outlined" />
                          更多
                        </a-button>
                      ),
                      overlay: () => (
                        <Menu onClick={handleMoreClick}>
                          {MORE_MENUS.map((item) => {
                            return <Menu.Item key={item.key}>{item.title}</Menu.Item>;
                          })}
                        </Menu>
                      ),
                    }}
                  </Dropdown>
                </div>
              </div>
              <div class="my-2 ">
                <span class="text-2xl">{pageTitle}</span>
                {cateDTO && (
                  <span class="ml-4" style={JSON.parse(cateDTO.cateConfig).style}>
                    {cateDTO.cateName}
                  </span>
                )}
              </div>
              <div class="flex text-xs text-gray-500 divide-x">
                <div class="pr-2">
                  <Icon icon="ant-design:user-outlined" />
                  <span class="pr-2">{crter}</span>
                  <span class="pr-1">创建于 {crteTime}</span>
                </div>
                <div class="pl-2">
                  <Icon icon="ant-design:user-outlined" />
                  <span class="pr-2">{crter}</span>
                  <span class="pr-1">修改于 {updtTime}</span>
                </div>
              </div>
            </div>
            {onlyReadUrl && <Iframe frameSrc={globSetting.etherpadUrl + onlyReadUrl} />}
          </div>
        );
      };
    },
  });
</script>
