import {
  PollyLanguage
} from '@ask-utils/core'
export type ConfigStatus = 'disable' | 'enable'
export type PollyConfig = {
  status: ConfigStatus;
  lang: PollyLanguage | '' | 'random';
}

// 有料版限定レベル
export type PremiumPlayQuizLevel = 'very_easy' | 'super_hard' | 'extra_hard' | 'extream'

// 無料版限定レベル
export type FreePlayQuizLevel = 'easy' | 'normal' | 'hard'
export type QuizLevel = PremiumPlayQuizLevel | FreePlayQuizLevel
export const premiumQuizLevels: PremiumPlayQuizLevel[] = ['very_easy', 'super_hard', 'extra_hard', 'extream']
export const freeQuizLevels: FreePlayQuizLevel[] = ['easy', 'normal', 'hard']

export type Lang = string
export interface Quiz<T> {
  answer: T;
  quiz: string;
}
export interface QuizConfig {
  isDebug?: boolean;
  // レベル
  level?: QuizLevel;
  // 言語
  lang?: Lang;
  // Polly SSML
  pollyConfig?: PollyConfig;
  // 正解時
  addPoint?: number;
  // 不正解時のマイナス
  reducePoint?: number;
  // レベル別のボーナス
  levelBonus?: number;
}
export type QuizLevelConfig = {
  levelBonus: number;
}
export type QuizLevelConfigs = {
  [key in QuizLevel]: QuizLevelConfig
}
