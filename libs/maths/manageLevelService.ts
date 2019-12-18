import { AttributesManager } from 'ask-sdk'
import ManageLevelService from '../general/manageLevelService'
import {
  MathQuizLevelConfigs,
  CalcOperator,
  MathQuizLevelSettings,
  MathQuizConfig
} from './model'

export const levelSettings: MathQuizLevelConfigs = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  very_easy: {
    max: 10,
    min: 1,
    quantity: 2,
    levelBonus: 0.5
  },
  easy: {
    max: 10,
    min: 1,
    quantity: 3,
    levelBonus: 0.8
  },
  normal: {
    max: 50,
    min: 1,
    quantity: 2,
    levelBonus: 1
  },
  hard: {
    max: 100,
    min: 1,
    quantity: 2,
    levelBonus: 1.2
  },
  // eslint-disable-next-line @typescript-eslint/camelcase
  super_hard: {
    max: 50,
    min: 1,
    quantity: 3,
    levelBonus: 1.4
  },
  // eslint-disable-next-line @typescript-eslint/camelcase
  extra_hard: {
    max: 100,
    min: 1,
    quantity: 3,
    levelBonus: 1.6
  },
  extream: {
    max: 100,
    min: 50,
    quantity: 3,
    levelBonus: 1.8
  }
}
export const defaultQuizSettings: Required<MathQuizLevelSettings> = {
  lang: 'ja-JP',
  level: 'normal',
  operator: 'plus',
  addPoint: 5,
  reducePoint: -1,
  levelSettings: levelSettings,
  allowUnderZero: false
}

export class ManageMathQuizLevelService extends ManageLevelService {
  /**
   * 計算の演算子
   */
  protected operator: CalcOperator;

  /**
   * 各レベルの設定値
   */
  protected levelSettings: MathQuizLevelConfigs

  /**
   * ゼロ以下を許容するか
   */
  protected allowUnderZero: boolean

  constructor (attributesManager: AttributesManager, settings?: MathQuizLevelSettings) {
    super(attributesManager, settings)
    this.operator = settings && settings.operator ? settings.operator : defaultQuizSettings.operator
    this.levelSettings = settings && settings.levelSettings ? settings.levelSettings : defaultQuizSettings.levelSettings
    this.allowUnderZero = settings && settings.allowUnderZero ? settings.allowUnderZero : defaultQuizSettings.allowUnderZero
  }

  /**
   * 計算クイズの演算子を更新する
   * @param operator
   */
  public updateQuizOperator (operator: CalcOperator) {
    this.operator = operator
    return this
  }

  /**
   * クイズの設定を取得する
   */
  public getConfig (): MathQuizConfig {
    const { level, lang, operator, addPoint, reducePoint, allowUnderZero } = this
    const config = this.levelSettings[level]
    return {
      ...config,
      level,
      lang,
      operator,
      addPoint,
      reducePoint,
      allowUnderZero
    }
  }
}
export default ManageMathQuizLevelService
