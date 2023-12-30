export enum Category {
  Productivity = 'productivity',
  Personal = 'personal',
}

export interface FormValues {
  title: string;
  category: string;
  content: string;
}
