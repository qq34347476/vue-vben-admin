/*
 * @LastEditTime: 2022-08-26 18:17:11
 * @Description:
 */
export interface UserContribution {
  knowledgeCount: number;
  pageCount: number;
  questionCount: number;
}

export interface HomeUpdateItem {
  id: string;
  pageName: string;
  time: string;
}

export interface HomeContributionItem {
  id: string;
  userName: string;
  count: string;
  department: string;
}
