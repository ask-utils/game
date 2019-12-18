import {
  QuizConfig,
  Quiz,
  QuizLevel,
  QuizLevelConfig,
  PollyConfig
} from '../general/model'
export type CalcOperator = 'plus' | 'minus' | 'times' | 'dividedBy'
export interface MathQuiz extends Quiz<number> {
numbers: number[];
}

export type MathQuizLevel = QuizLevel
export type MathQuizLevelConfig = QuizLevelConfig & {
  max: number;
  min: number;
  quantity: number;
}
export type MathQuizLevelConfigs = {
  [key in QuizLevel]: MathQuizLevelConfig
}

export type MathQuizLevelSettings = {
  lang?: string;
  level?: QuizLevel;
  operator?: CalcOperator;
  // 正解時
  addPoint?: number;
  // 不正解時のマイナス
  reducePoint?: number;
  // 各レベルの設定値
  levelSettings?: MathQuizLevelConfigs;
  allowUnderZero?: boolean;
}

export interface MathQuizConfig extends QuizConfig {
  max?: number;
  min?: number;
  quantity?: number;
  operator?: CalcOperator;
  allowUnderZero?: boolean;
}

export const defaultPollyConfig: PollyConfig = {
  status: 'disable',
  lang: ''
}

export const defaultQuizConfig: Required<MathQuizConfig> = {
  isDebug: false,
  allowUnderZero: false,
  lang: 'ja-JP',
  pollyConfig: defaultPollyConfig,
  level: 'normal',
  operator: 'plus',
  max: 50,
  min: 1,
  quantity: 2,
  levelBonus: 1,
  addPoint: 5,
  reducePoint: -1
}
