export interface QuestionListItem {
  id: string;
  time: string;
  title: string;
  content: string;
  look: number;
  address: string;
  name: string;
  no: number;
  status: number;
  answerCount: number;
  cateName: string;
  avatar: string;
}

export interface CateListItem {
  id: string;
  cateName: string;
}
