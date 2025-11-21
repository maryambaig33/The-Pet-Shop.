export enum ViewState {
  HOME = 'HOME',
  ADOPT = 'ADOPT',
  MATCHER = 'MATCHER',
  CARE = 'CARE'
}

export interface Pet {
  id: number;
  name: string;
  breed: string;
  age: string;
  type: 'dog' | 'cat' | 'other';
  image: string;
  description: string;
  tags: string[];
}

export interface AIRecommendation {
  breed: string;
  reason: string;
  careLevel: string;
  matchPercentage: number;
}