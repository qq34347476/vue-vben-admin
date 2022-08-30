// 提取纯文本
export function html2Str(htmlText: string, len = 0) {
  const str: string = htmlText.replace(/<[^>]+>/g, '');
  console.log(str);

  if (len > 0) {
    return str.substr(0, len);
  }
  return str;
}
