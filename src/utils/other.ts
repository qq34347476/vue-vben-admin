/*
 * @LastEditTime: 2022-08-30 16:03:49
 * @Description: 杂项的utils工具
 */
// 提取纯文本
export function html2Str(htmlText: string, len = 0) {
  const str: string = htmlText.replace(/<[^>]+>/g, '');
  if (len > 0) {
    return str.substr(0, len);
  }
  return str;
}
