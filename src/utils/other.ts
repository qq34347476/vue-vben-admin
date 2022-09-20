/*
 * @LastEditTime: 2022-09-20 16:22:58
 * @Description: 杂项的utils工具
 */
// 提取纯文本
export function html2Str(htmlText: string, len = 0) {
  const str: string = htmlText.replace(/<[^>]+>/g, '');
  if (len > 0) {
    return str.substr(0, len);
  }
  return str;
} //函数使用,本表收录的字符的Unicode编码范围为19968至40869, XDesigner 整理
