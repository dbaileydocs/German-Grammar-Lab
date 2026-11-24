export type CategoryKey = 'prepositions' | 'separable' | 'conjunctions';
export type CategoryFilter = 'all' | CategoryKey;

export interface QuestionItem {
  id: number;
  cat: CategoryKey;
  rule: string;
  prompt: string;
  answer: string;
  options: string[];
  en: string;
  why: string;
}

export interface AppState {
  filter: CategoryFilter;
  answeredIds: number[];
  correctCount: number;
  totalAnswered: number;
  streak: number;
  bestStreak: number;
  activeRefTab: CategoryKey;
}

export const CATEGORY_LABELS: Record<CategoryFilter, string> = {
  all: 'All Categories',
  prepositions: 'Prepositions & Contractions',
  separable: 'Separable Verbs',
  conjunctions: 'Conjunctions & Word Order',
};
