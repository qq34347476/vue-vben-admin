/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-23 14:33:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-22 14:26:37
 * @FilePath: \knowledge-web\src\views\biz\system\classify\useTree.ts
 * @Description: 分类管理树
 */
import { h, nextTick, ref } from 'vue';
import { TreeActionItem } from '/@/components/Tree/index';
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons-vue';
import { getClassifyTreeListApi } from '/@/api/biz/system/classify';
import { ClassifyTreeItem } from '/@/api/biz/system/model/classifyModel';
import { TreeActionType } from '/@/components/Tree/index';
import { TypeEnum } from '/@/enums/biz/systeamEnum';

export function useTree(
  handelAdd: Function,
  handelEdit: Function,
  handleDelete: Function,
  reload: Function,
) {
  const treeLoadingRef = ref(false);
  const treeDataRef = ref<
    {
      title: string;
      cateId: string;
      key: '';
      lv: string;
      children: ClassifyTreeItem[];
    }[]
  >([]);
  const classifyTreeRef = ref<Nullable<TreeActionType>>(null);
  async function getTreeData() {
    treeLoadingRef.value = true;
    try {
      const data = await getClassifyTreeListApi();
      data.forEach((item) => {
        item.lv = '1';
        // 若在fieldNames，将title指向cateName，点击按钮时获取到的cateName是一个对象，所以这里重新赋值一个title
        item.title = item.cateName;
        item.children?.forEach((childItem) => {
          childItem.lv = '2';
          childItem.title = childItem.cateName;
        });
      });
      treeDataRef.value = [
        {
          title: '全部分类',
          cateId: '',
          key: '',
          lv: '0',
          children: data,
        },
      ];
      console.log(treeDataRef.value);
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
          // 新增按钮
          return h(PlusOutlined, {
            style: 'color:#55D187',
            class: 'ml-2 ',
            onClick: () => {
              handelAdd(node);
            },
          });
        }
      },
    },
    {
      render: (node) => {
        if (node.lv === '2' && node.cateName !== TypeEnum.defaultType) {
          // 编辑按钮
          return h(FormOutlined, {
            style: 'color:#0960bd',
            onClick: () => {
              handelEdit(node);
            },
          });
        }
      },
    },
    {
      render: (node) => {
        if (node.lv === '2' && node.cateName !== TypeEnum.defaultType) {
          // 删除按钮
          return h(DeleteOutlined, {
            style: 'color:red',
            onClick: () => {
              console.log(node.cateId);
              handleDelete([node.cateId]);
            },
          });
        }
      },
    },
  ];
  // selectTree
  function selectTree(val, { node }) {
    if (node.lv === '0') {
      reload({ page: 1 });
    } else if (node.lv === '1') {
      reload({ page: 1, searchInfo: { prntCateId: val[0] } });
    } else {
      reload({ page: 1, searchInfo: { cateId: val[0] } });
    }
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
