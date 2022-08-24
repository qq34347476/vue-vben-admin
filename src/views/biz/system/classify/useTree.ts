/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-23 14:33:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-24 17:32:15
 * @FilePath: \knowledge-web\src\views\biz\system\classify\useTree.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { h, nextTick, ref } from 'vue';
import { TreeActionItem } from '/@/components/Tree/index';
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons-vue';
import { getClassifyTreeList } from '/@/api/biz/system/classify';
import type { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
import { TreeActionType } from '/@/components/Tree/index';

export function useTree(handelAdd: Function, handelEdit: Function, handleDelete: Function) {
  const treeLoadingRef = ref(false);
  const treeDataRef = ref<TreeDataItem[]>([]);
  const classifyTreeRef = ref<Nullable<TreeActionType>>(null);
  async function getTreeData() {
    treeLoadingRef.value = true;
    try {
      treeDataRef.value = await getClassifyTreeList();
    } finally {
      treeLoadingRef.value = false;
      nextTick(() => {
        classifyTreeRef.value?.expandAll(true);
      });
    }
  }

  const actionList: TreeActionItem[] = [
    {
      render: (node) => {
        if (node.lv === '1') {
          return h(PlusOutlined, {
            class: 'ml-2',
            onClick: () => {
              handelAdd(node);
            },
          });
        }
      },
    },
    {
      render: (node) => {
        if (node.lv === '2' && node.classifyName !== '默认分类') {
          return h(FormOutlined, {
            onClick: () => {
              handelEdit(node);
            },
          });
        }
      },
    },
    {
      render: (node) => {
        if (node.lv === '2' && node.classifyName !== '默认分类') {
          return h(DeleteOutlined, {
            onClick: () => {
              handleDelete([node.key]);
            },
          });
        }
      },
    },
  ];
  // selectTree
  function selectTree(val) {
    console.log(val);
  }

  return {
    treeLoadingRef,
    treeDataRef,
    classifyTreeRef,
    getTreeData,
    actionList,
    selectTree,
  };
}
