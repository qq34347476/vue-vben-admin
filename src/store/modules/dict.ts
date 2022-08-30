/*
 * @LastEditTime: 2022-08-30 14:42:42
 * @Description:
 */
import type { GetSysCodeListResult, DictOptionItem } from '/@/api/sys/model/index';

import { defineStore } from 'pinia';
import { store } from '/@/store';
import { createStorage } from '/@/utils/cache/storageCache';
import { DICT_KEY } from '/@/enums/cacheEnum';
import { getDictCodeListApi } from '/@/api/sys/index';
import { decamelize, toCamelCase } from '/@/utils/index';
const storage = createStorage();
interface LocaleState {
  codeListState: GetSysCodeListResult;
}

// 防止重复请求
const loadMaster = {};
/**
 * 字典加载锁定
 * @param codeType
 */
export function doUnlockCodeLoad(codeType) {
  delete loadMaster[codeType];
}
/**
 * 字典加载解锁
 * @param codeType
 * @returns {boolean}
 */
function doLockCodeLoad(codeType) {
  // 后台请求锁定判断, 防止页面大量的重复请求
  if (loadMaster[codeType]) {
    return false;
  }
  // api 请求锁定, 防止重复请求
  loadMaster[codeType] = true;
  return true;
}

async function fetchCodeList(dictType: string) {
  const results = await getDictCodeListApi({
    dicTypeCode: decamelize(dictType, { type: 'LOWER' }),
  });

  const list: DictOptionItem[] = results.map((item) => {
    return {
      //   ...item,
      dictItemName: item.dicValName,
      dictItemCode: item.dicValCode,
      // dictItemDscr: item.memo,
      dicTypeCode: item.dicTypeCode,
      dicTypeName: item.dicTypeName,
      dataIndex: toCamelCase(item.dicTypeCode),
    };
  });

  return list;
}

export const useDictStore = defineStore({
  id: 'dict',
  state: (): LocaleState => ({
    codeListState: {},
  }),
  getters: {},
  actions: {
    async loadPayCodeItemAction({ dictType }: { dictType: string }): Promise<void> {
      const list = this.codeListState[dictType];
      if (list && list.length > 0) {
        return;
      }
      const dictData = storage!.get(DICT_KEY) || {};
      if (dictData && dictData[dictType]) {
        this.codeListState[dictType] = dictData[dictType];
        return;
      }
      try {
        if (!doLockCodeLoad(dictType)) return;
        const data = await fetchCodeList(dictType);

        if (!data || data.length === 0) {
          doUnlockCodeLoad(dictType);
        } else {
          this.codeListState[dictType] = data;
          storage!.set(DICT_KEY, { ...dictData, ...this.codeListState });
        }
      } catch (err) {
        doUnlockCodeLoad(dictType);
        throw err;
      }
    },
  },
});

// Need to be used outside the setup
export function useDictStoreWithOut() {
  return useDictStore(store);
}
