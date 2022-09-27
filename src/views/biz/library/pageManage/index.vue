<!--
 * @LastEditTime: 2022-09-27 15:33:26
 * @Description: 页面管理
-->
<script lang="tsx">
  import { defineComponent, shallowReactive } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';

  import { Layout, LayoutSider, LayoutContent, Tree, Dropdown, Menu } from 'ant-design-vue';
  import type {
    // AntTreeNodeDragEnterEvent,
    AntTreeNodeDropEvent,
    // TreeProps,
  } from 'ant-design-vue/es/tree';

  import { Icon } from '/@/components/Icon/index';
  import { getPageTreeListData, getRecyclingList } from '/@/api/biz/library/pageManage';
  import { PageRecyclingItem, PageTreeItem } from '/@/api/biz/library/model/pageManage';
  import Add from './add/index.vue';
  import { useAdd } from './add/useAdd';
  import { getKnowledgeListDataApi } from '/@/api/biz/library/knowledge';
  import { KnowledgeItem } from '/@/api/biz/library/model/knowledgeModel';
  import {
    TreeMenuKeyEnum,
    TREE_MENU,
    TreeMenuItem,
    RECYCLING_ROOT,
    PageRecyclingPublicTree,
  } from './types';
  import { useRouter } from 'vue-router';
  import { CorrespondSortEnum } from '/@/enums/biz/libraryEnum';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { useLoading } from '/@/components/Loading';
  import { usePageTree } from './usePageTree';
  import PageContent from './content/index.vue';
  import { findPath } from '/@/utils/helper/treeHelper';
  import Move from './move/index.vue';
  import { useModal } from '/@/components/Modal';
  import Copy from './copy/index.vue';

  export default defineComponent({
    name: 'PageManage',
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('page-manage');

      const { push } = useRouter();
      const { createMessage } = useMessage();
      const [openFullLoading, closeFullLoading] = useLoading({
        tip: '加载中...',
      });
      const state = shallowReactive<{
        // 收缩
        collapsed: boolean;
        // 页面树
        treeData: PageTreeItem[];
        // 回收站列表
        recyclings: PageRecyclingPublicTree[];
        // 菜页面树选中key
        selectedPageKeys: string[];
        // 页面树选中：节点信息
        selectedPage: PageRecyclingPublicTree | undefined;
        // 页面树选中：路径
        selectedPagePath: string;
        // 选中资料库Id
        selectedSpaceId: string;
        selectedSpaceItem: KnowledgeItem | undefined;
        // 资料库列表
        knowledges: KnowledgeItem[];
      }>({
        collapsed: false,
        treeData: [],
        recyclings: [],
        selectedPageKeys: [],
        selectedPage: undefined,
        selectedPagePath: '',
        selectedSpaceId: props.id,
        selectedSpaceItem: undefined,
        knowledges: [],
      });
      // 新增/编辑弹窗
      const { registerAdd, handleAdd, addState, handleEdit } = useAdd();
      // 移动
      const [registerMove, { openModal: openMove }] = useModal();
      function handleMove() {
        openMove();
      }
      // 复制
      const [registerCopy, { openModal: openCopy }] = useModal();
      function handleCopy() {
        openCopy();
      }
      // 编辑
      function handleEditPage() {
        push(`/library/pageEdit/${state.selectedSpaceId}/${state.selectedPageKeys[0]}`);
      }
      // 加载有效知识库列表
      async function initKnowledge() {
        const { records } = await getKnowledgeListDataApi({});
        state.knowledges = records;
        state.selectedSpaceItem = state.knowledges.find((item) => item.spaceId === props.id);
      }
      // 加载页面树
      async function initTree(loadKnowledge = false) {
        try {
          openFullLoading();
          const [list, recyclings] = await Promise.all([
            getPageTreeListData({ spaceId: state.selectedSpaceId }),
            getRecyclingList({ spaceId: state.selectedSpaceId }),
            loadKnowledge ? initKnowledge() : Promise.resolve(),
          ]);
          state.treeData = list;
          if (list.length) {
            const temp = list[0];
            handleSelectTree([temp.pageId], { selectedNodes: [temp] });
          } else {
            state.selectedPage = undefined;
            state.selectedPagePath = '';
          }
          state.recyclings = [{ ...RECYCLING_ROOT, children: recyclings }];

          // console.log(data);
        } finally {
          closeFullLoading();
        }
      }
      initTree(true);
      // 删除等操作
      const { handleDelete, handlePermanentDelete, handleRecover } = usePageTree(initTree);
      // 页面树的选中
      function handleSelectTree(
        selectedKeys: string[],
        { selectedNodes }: { selectedNodes: PageTreeItem[] },
      ) {
        // console.log(selectedKeys, selectedPages[0]);
        state.selectedPage = { ...selectedNodes[0], children: [] };
        state.selectedPageKeys = selectedKeys;

        const list =
          findPath<PageTreeItem>(state.treeData, (item) => item.pageId === selectedKeys[0])?.map(
            (item) => item.pageTitle,
          ) || [];
        list.length ? list.pop() : list.push('回收站');

        state.selectedSpaceItem && list.unshift(state.selectedSpaceItem.name);
        state.selectedPagePath = list.join(' / ') || '';
      }

      // 页面树：右键选择
      function handleTreeMenuClick(treeKey: string, data: PageTreeItem, menuKey: TreeMenuKeyEnum) {
        console.log(treeKey, menuKey);
        if (menuKey === TreeMenuKeyEnum.RENAME) {
          handleEdit(state.selectedSpaceId, data);
        } else if (menuKey === TreeMenuKeyEnum.DELETE) {
          handleDelete(data);
        } else if (menuKey === TreeMenuKeyEnum.SUB) {
          handleAdd(state.selectedSpaceId, data);
        } else if (menuKey === TreeMenuKeyEnum.UP) {
          handleAdd(state.selectedSpaceId, data, CorrespondSortEnum.UP);
        } else if (menuKey === TreeMenuKeyEnum.DOWN) {
          handleAdd(state.selectedSpaceId, data, CorrespondSortEnum.DOWN);
        }
      }
      const onDrop = (info: AntTreeNodeDropEvent) => {
        console.log(info);
        // const dropKey = info.node.key;
        // const dragKey = info.dragNode.key;
        // const dropPos = info.node.pos.split('-');
        // const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
      };
      function renderTreeMenu(item: TreeMenuItem) {
        const { children, key, title } = item;
        return children && children.length ? (
          <Menu.SubMenu key={key} title={title}>
            {children.map(renderTreeMenu)}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={key}>
            <span style="width: 100px;display: inline-block;"> {title}</span>
          </Menu.Item>
        );
      }
      // 渲染页面树
      function renderTree() {
        return !state.collapsed && state.treeData.length ? (
          <Tree
            blockNode={true}
            draggable={true}
            onDrop={onDrop}
            treeData={state.treeData}
            defaultExpandAll={true}
            fieldNames={{ children: 'children', title: 'pageTitle', key: 'pageId' }}
            onSelect={handleSelectTree}
            selectedKeys={state.selectedPageKeys}
          >
            {{
              title: (item) => {
                const { pageId: treeKey, pageTitle, data } = item;
                return (
                  <Dropdown trigger={['contextmenu']}>
                    {{
                      default: () => <div>{pageTitle}</div>,
                      overlay: () => (
                        <Menu
                          mode="vertical"
                          onClick={({ key: menuKey }) =>
                            handleTreeMenuClick(treeKey, data, menuKey as TreeMenuKeyEnum)
                          }
                        >
                          {TREE_MENU.map(renderTreeMenu)}
                        </Menu>
                      ),
                    }}
                  </Dropdown>
                );
              },
            }}
          </Tree>
        ) : (
          ''
        );
      }

      // 回收站：右键选择
      async function handleRecyclingTreeMenuClick(
        treeKey: string,
        data: PageRecyclingItem,
        menuKey: TreeMenuKeyEnum,
      ) {
        console.log(treeKey, menuKey);

        if (menuKey === TreeMenuKeyEnum.RECYCLING_RECOVER) {
          try {
            openFullLoading();
            await handleRecover(data);
          } finally {
            closeFullLoading();
          }
        } else if (menuKey === TreeMenuKeyEnum.RECYCLING_DELETE_PERMANENT) {
          if (treeKey === TreeMenuKeyEnum.RECYCLING_ROOT) {
            const temp = state.recyclings.length ? state.recyclings[0] : null;

            if (temp && temp.children && temp.children.length) {
              handlePermanentDelete(
                temp.children.map((item) => item.pageId),
                '',
              );
            } else {
              createMessage.info('没有需要永久删除的页面');
            }
          } else {
            handlePermanentDelete([data.pageId], data.pageTitle);
          }
        }
      }
      // 渲染回收站
      function renderRecyclingTree() {
        return (
          !state.collapsed &&
          state.recyclings.length && (
            <Tree
              blockNode={true}
              treeData={state.recyclings}
              defaultExpandAll={true}
              fieldNames={{ children: 'children', title: 'pageTitle', key: 'pageId' }}
              onSelect={handleSelectTree}
              selectedKeys={state.selectedPageKeys}
            >
              {{
                title: (item) => {
                  const { pageId: treeKey, pageTitle, data } = item;
                  return (
                    <Dropdown trigger={['contextmenu']}>
                      {{
                        default: () => <div>{pageTitle}</div>,
                        overlay: () => (
                          <Menu
                            mode="inline"
                            onClick={({ key: menuKey }) =>
                              handleRecyclingTreeMenuClick(
                                treeKey,
                                data,
                                menuKey as TreeMenuKeyEnum,
                              )
                            }
                          >
                            {treeKey !== TreeMenuKeyEnum.RECYCLING_ROOT && (
                              <Menu.Item key={TreeMenuKeyEnum.RECYCLING_RECOVER}>还原</Menu.Item>
                            )}
                            <Menu.Item key={TreeMenuKeyEnum.RECYCLING_DELETE_PERMANENT}>
                              永久删除
                            </Menu.Item>
                          </Menu>
                        ),
                      }}
                    </Dropdown>
                  );
                },
              }}
            </Tree>
          )
        );
      }

      // 选中有效知识库
      function handleKnowledgeClick({ key }) {
        // console.log(key);

        if (key === TreeMenuKeyEnum.KNOWLEDGE_ALL) {
          // 进入有效知识库
          push('/library/knowledge/effective');
        } else {
          state.selectedSpaceId = key;
          state.selectedSpaceItem = state.knowledges.find((item) => item.spaceId === key);
          initTree();
        }
      }
      // 渲染有效知识库
      function renderKnowledgeDropdown() {
        const { name } = state.selectedSpaceItem || {};
        return (
          <Dropdown trigger={['click']}>
            {{
              default: () => (
                <div class="flex p-2 cursor-pointer hover:text-primary">
                  <div class="flex-1">
                    <Icon icon="ant-design:database-outlined" />
                    {!state.collapsed && <span class="px-2">{name || ''}</span>}
                  </div>
                  {!state.collapsed && (
                    <div>
                      <Icon icon="ant-design:down-outlined" />
                    </div>
                  )}
                </div>
              ),
              overlay: () => (
                <Menu onClick={handleKnowledgeClick} selectedKeys={[state.selectedSpaceId]}>
                  {state.knowledges.map((item) => {
                    return <Menu.Item key={item.spaceId}>{item.name}</Menu.Item>;
                  })}
                  <Menu.Divider />
                  <Menu.Item key={TreeMenuKeyEnum.KNOWLEDGE_ALL}>查看全部</Menu.Item>
                </Menu>
              ),
            }}
          </Dropdown>
        );
      }

      return () => {
        return (
          <Layout class={['h-full', prefixCls]}>
            <LayoutSider v-model:collapsed={state.collapsed} collapsible>
              <div class="text-white">
                <div class="flex p-2 cursor-pointer hover:text-primary">
                  <div
                    class="flex-1"
                    onClick={handleAdd.bind(
                      null,
                      state.selectedSpaceId,
                      state.selectedPage,
                      undefined,
                    )}
                  >
                    <Icon icon="ant-design:plus-circle-outlined" />
                    {!state.collapsed && <span class="px-2">新建页面</span>}
                  </div>
                  {!state.collapsed && (
                    <div>
                      <Icon icon="ant-design:appstore-outlined" />
                    </div>
                  )}
                </div>
                {renderKnowledgeDropdown()}
                <div class="flex p-2 cursor-pointer hover:text-primary">
                  <div class="flex-1">
                    <Icon icon="ant-design:home-outlined" />
                    {!state.collapsed && <span class="px-2">主页</span>}
                  </div>
                </div>
                <div class="flex p-2 cursor-pointer hover:text-primary">
                  <div class="flex-1">
                    <Icon icon="ant-design:apartment-outlined" />
                    {!state.collapsed && <span class="px-2">页面树</span>}
                  </div>
                </div>
              </div>
              {renderTree()}
              {renderRecyclingTree()}
            </LayoutSider>
            <LayoutContent>
              {state.selectedPage && (
                <PageContent
                  spaceId={state.selectedSpaceId}
                  page={state.selectedPage}
                  path={state.selectedPagePath}
                  onDelete={handleDelete}
                  onMove={handleMove}
                  onCopy={handleCopy}
                  onEdit={handleEditPage}
                />
              )}
            </LayoutContent>
            <Add onRegister={registerAdd} {...addState} onSuccess={initTree} />
            <Move
              onRegister={registerMove}
              selectedPage={state.selectedPage}
              selectedSpaceItem={state.selectedSpaceItem}
              knowledges={state.knowledges}
              onSuccess={initTree}
              path={state.selectedPagePath}
            />
            <Copy
              onRegister={registerCopy}
              selectedPage={state.selectedPage}
              selectedSpaceItem={state.selectedSpaceItem}
              knowledges={state.knowledges}
              onSuccess={initTree}
              path={state.selectedPagePath}
            />
          </Layout>
        );
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-page-manage';

  .@{prefix-cls} {
    .ant-tree {
      background-color: transparent;
      color: white;

      .ant-tree-node-content-wrapper:hover {
        background-color: transparent;
        color: @primary-color;
      }

      .ant-tree-node-content-wrapper.ant-tree-node-selected {
        background-color: transparent;
        color: @primary-color;
      }
    }
  }
</style>
