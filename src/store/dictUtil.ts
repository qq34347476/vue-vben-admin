import { DictOptionItem } from '/@/api/sys/model/index';
import { useDictStoreWithOut } from './modules/dict';

export function getDictData(dictType: string, filter?: string, isReverse?: boolean) {
  const store = useDictStoreWithOut();
  store.loadPayCodeItemAction({ dictType });
  return doCodeFilter(store.codeListState[dictType], filter, isReverse);
}

export function getDictLabel(dictType: string, value: string, dictSplit?: string) {
  const store = useDictStoreWithOut();
  store.loadPayCodeItemAction({ dictType });
  const list = store.codeListState[dictType] || [];
  if (dictSplit) {
    return value
      .split(dictSplit)
      .map((str) => {
        return list.find((item) => item.dictItemCode === str)?.dictItemName || str;
      })
      .join(dictSplit);
  }
  return list.find((item) => item.dictItemCode === value)?.dictItemName || value;
}

/**
 * 字典列表过滤
 * @param codeList
 * @param filter
 * @param isReverse
 * @returns {*}
 */
export function doCodeFilter(codeList: DictOptionItem[], filter?: string, isReverse = false) {
  // 数据过滤
  if (filter && codeList) {
    const filterArray = filter.split(',');
    codeList = codeList.filter((item) => {
      return isReverse
        ? !!filterArray.includes(item.dictItemCode + '')
        : !filterArray.includes(item.dictItemCode + '');
    });
  }
  return codeList;
}
