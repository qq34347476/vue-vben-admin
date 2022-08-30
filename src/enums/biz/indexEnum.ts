/*
 * @Author: crz 982544249@qq.com
 * @Date: 2022-08-22 11:08:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-30 16:48:16
 * @FilePath: \knowledge-web\src\enums\biz\indexEnum.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// form校验长度

export const TEXTAREA_LANGTH = 100;
export const INPUT_LANGTH = 50;

// 详情页面的状态标签分为四种：
// color: primary
// 1、待提交/未开始：

// color: warning
// 2、进行中（包括待审核，待执行，执行中等）：

// color: success
// 3、完成

// color: error
// 4、已拒绝（审核人审批拒绝的单据）
export enum ColorTypeEnum {
  primary = 'primary',
  success = 'success',
  warning = 'warning',
  error = 'error',
  invalid = 'invalid',
}

export const TagsColorTypeList = [
  {
    value:
      '已发布,已生效,生效,完成,已通过,审核结束,已邀请,已签到,审核通过,已启用,用户准入,已采纳,已续聘,续聘,已退出',
    type: ColorTypeEnum.success,
  },
  {
    value:
      '待提交,未开始,待确认,待初审,待分配,待医保确认,待回复,待完成/待签到,未生效,待处理,待用户确认',
    type: ColorTypeEnum.primary,
  },

  {
    value:
      '已拒绝,已驳回,驳回,取消审核,已取消,无法参与,已满员不邀请,已停用,需二次审核,已失效,已解聘,未采纳,解聘',
    type: ColorTypeEnum.error,
  },
  {
    value: '作废,草稿',
    type: ColorTypeEnum.invalid,
  },
  {
    value:
      '待审核,待执行,执行中,待复审,待加密处理,待分配,待专家审核,待结果复核,需要重新评审,待发布,参与中/已签到',
    type: ColorTypeEnum.warning,
  },
];

export enum OrderByEnum {
  // "orderBy": "totalConsumed desc"
  ASC = 'asc',
  DESC = 'desc',
}
