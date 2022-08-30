/*
 * @LastEditTime: 2022-08-30 14:47:52
 * @Description: 问答提取纯文本
 */

import type { Directive, App } from 'vue';
import { html2Str } from '../utils/other';

// v-html-parser:large="content"
// v-html-parser:small="content"
// v-html-parser="content"
const htmlParserDirective: Directive<HTMLElement, string> = {
  mounted(el, binding) {
    // console.log('v-md', binding.value);

    if (binding.arg) {
      // 提取纯文本
      const str = html2Str(binding.value);
      if (binding.arg === 'large') {
        el.innerHTML = str.substr(0, 600);
      } else {
        el.innerHTML = str.substr(0, 300);
      }
    } else {
      el.innerHTML = binding.value;
    }
  },
};
export function setupHtmlParserDirective(app: App) {
  app.directive('htmlParser', htmlParserDirective);
}

export default htmlParserDirective;
