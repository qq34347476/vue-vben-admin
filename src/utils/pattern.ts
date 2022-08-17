/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-17 10:02:11
 * @LastEditors: crz 982544249@qq.com
 * @LastEditTime: 2022-08-19 10:31:19
 * @FilePath: \knowledge-web\src\utils\pattern.ts
 * @Description: 表单校验规则
 */
interface Rule {
  pattern: RegExp;
  message: string;
}

// import { countStrToBytes } from './sizeUtils';
/**
 * 正整数
 */
export const intPattern: Rule = {
  pattern: /^(0|\+?[1-9][0-9]*)$/,
  message: '只能输入数值',
};
/**
 * 6位正整数
 */
export const intSixPattern: Rule = {
  pattern: /^[0-9]{6}$/,
  message: '只能输入6位数字',
};
/**
 * @description: 正数
 */
export const floatPattern: Rule = {
  pattern: /^(\+)?\d+(\.\d+)?$/,
  message: '只能输入正数',
};
/**
 * @description: 自然数：（含零、正负实数）
 */
export const numberPattern: Rule = {
  pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
  message: '请输入数字',
};
/**
 * @description: 数值
 */
export const numPattern: Rule = {
  pattern: /(^(\+)?\d+(\.\d+)?$)|(^(100|[1-9]?\d(\.\d\d?)?)%$)/,
  message: '请输入数值',
};

/**
 * 金额
 */
export const moneyPattern: Rule = {
  pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
  message: '请输入正确的金额',
};
/**
 * 手机
 */
export const mobilePattern: Rule = {
  pattern: /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/,
  message: '手机号码格式错误',
  // required: true,
};
// 办公电话 /0\d{2,3}-\d{7,8}/
// 区号：0开头的3或4位的数字
// 号码：7或8位的数字
// 校验手机和固定电话号码
export const telPattern: Rule = {
  pattern: /^((0\d{2,3}-?\d{7,8})|([1][2,3,4,5,6,7,8,9][0-9]{9}))$/,
  message: '电话号码格式错误',
};
// 用户的办公电话、活动的联系电话
// 1.支持数字和英文横杆;
// 2.长度范围0`20
export const telTelPattern: Rule = {
  pattern: /^[0-9-]{0,20}$/,
  message: '请输入最多20个字符，支持数字、-',
};
export const emailPattern: Rule = {
  pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  message: '请输入正确的邮箱',
  // required: true,
};
/**
 * 手机
 */
export const idCardPattern: Rule = {
  pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  message: '请输入正确的证件号码',
};
export const urlPattern: Rule = {
  pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'*+,;=.]+$/,
  message: '请输入合法的URL地址',
};
/**
 * 字母和数字组合
 */
export const numStrPattern: Rule = {
  pattern: /^[0-9a-zA-Z]*$/,
  message: '请输入字母和数字组合',
};

/**
 * @description: 必须字母，数字和符号
 * @Date: 2020-08-11 10:12:44
 */
export const numStrSymPattern: Rule = {
  pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/,
  message: '请输入不少于6位的字母、数字和特殊符号(@$!%*#?&)组合',
};

/**
 * 0-100，可以为小数
 */
export const percentPattern: Rule = {
  pattern: /^([0-9]{1,2}$)|(^[0-9]{1,2}\.[0-9]{1,2}$)|100$/,
  message: '请输入正确的百分比值',
};

/**
 * 时间区间校验
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const dateBetweenValid = (rule, value, callback) => {
  const { startTime, endTime } = value;
  if (startTime < endTime) {
    callback();
    return;
  }
  /* eslint-disable-next-line */
  callback('开始时间不能大于结束时间!');
};

/**
 * @description: 地区选择校验
 */
export const areaValidator = (level = 2) => {
  return (rule, value, callback) => {
    if (!rule.required) {
      callback();
    }
    if (!value || !Array.isArray(value) || value.length !== level + 1) {
      callback(new Error('请选择地区'));
    }
    callback();
  };
};

/**
 * @description: 富文本大小校验；必填校验请另外加 {required: true,message: '请输入',}
 * @param {*} maxSizeByte
 * @param {*} maxSizeText
 * @return {*}
 */
export const richContentValidator = (maxSizeByte = 64 * 1024, maxSizeText = '64KB') => {
  return (rule, value = '', callback) => {
    // if (!value) {
    //   callback(new Error('请输入'));
    // }
    // const contentSize = countStrToBytes(value);
    // 计算的大小不完全准确，当达到64kb时，浏览器显示67kb
    const contentSize = new Blob([value]).size;
    // console.log(contentSize, maxSizeByte);
    if (contentSize < maxSizeByte) {
      callback();
    }
    callback(new Error(`内容应小于${maxSizeText},是否所选图片过大`));
  };
};
