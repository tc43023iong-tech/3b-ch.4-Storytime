
export interface Word {
  id: number;
  english: string;
  chinese: string;
  pronunciation: string;
  emoji: string;
  syllables: string;
  breakdown: string;
  etymology: string;
  funFact: string;
  sentence: string;
  realityInfo: string;
}

export enum GameMode {
  MENU = 'MENU',
  REVIEW = 'REVIEW',
  DIARY = 'DIARY',
  DETECTIVE = 'DETECTIVE',
  MATCHING = 'MATCHING',
  SPELLING = 'SPELLING',
  FILL_BLANKS = 'FILL_BLANKS',
  BUBBLE_POP = 'BUBBLE_POP',
  WORD_SEARCH = 'WORD_SEARCH',
  BATTLE = 'BATTLE',
  MEMORY = 'MEMORY'
}
