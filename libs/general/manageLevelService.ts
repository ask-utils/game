import { AttributesManager } from 'ask-sdk'
import {
  QuizConfig,
  QuizLevel,
  QuizLevelConfig,
  QuizLevelConfigs
} from './model'

// Settings
export const levelSettings: QuizLevelConfigs = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  very_easy: {
    levelBonus: 0.5
  },
  easy: {
    levelBonus: 0.8
  },
  normal: {
    levelBonus: 1
  },
  hard: {
    levelBonus: 1.2
  },
  // eslint-disable-next-line @typescript-eslint/camelcase
  super_hard: {
    levelBonus: 1.4
  },
  // eslint-disable-next-line @typescript-eslint/camelcase
  extra_hard: {
    levelBonus: 1.6
  },
  extream: {
    levelBonus: 1.8
  }
}
export type QuizLevelSettings = {
  lang?: string;
  level?: QuizLevel;
  // 正解時
  addPoint?: number;
  // 不正解時のマイナス
  reducePoint?: number;
  // 各レベルの設定値
  levelSettings?: QuizLevelConfigs;
}
export const defaultQuizLevelSettings: Required<QuizLevelSettings> = {
  lang: 'ja-JP',
  level: 'normal',
  addPoint: 5,
  reducePoint: -1,
  levelSettings: levelSettings
}

export class ManageLevelService {
  protected attributesManager: AttributesManager
  // 正解時
  protected addPoint: number;
  // 不正解時のマイナス
  protected reducePoint: number;

  /**
   * 言語
   */
  protected lang: string;

  /**
   * レベル
   */
  protected level: QuizLevel;

  /**
   * 各レベルの設定値
   */
  protected levelSettings: QuizLevelConfigs

  constructor (attributesManager: AttributesManager, settings?: QuizLevelSettings) {
    const config = {
      ...defaultQuizLevelSettings,
      ...settings
    }
    this.level = config.level
    this.lang = config.lang
    this.addPoint = config.addPoint
    this.reducePoint = config.reducePoint
    this.levelSettings = config.levelSettings
    this.attributesManager = attributesManager
  }

  /**
   * 言語を変更する
   * @param lang
   */
  public updateQuizLang (lang: string) {
    this.lang = lang
    return this
  }

  /**
   * クイズのレベル設定を取得する
   */
  public async getLastQuizLevel () {
    const { level } = await this.attributesManager.getPersistentAttributes()
    this.level = level
    return this.level
  }

  /**
   * クイズのレベルを変更する
   * @param level
   */
  public async updateQuizLevel (level: QuizLevel) {
    // プレミアムプランの判定などはここでやらず、interceptorで事前処理する
    if (this.level !== level) {
      this.attributesManager.setPersistentAttributes({
        ...await this.attributesManager.getPersistentAttributes(),
        level
      })
      await this.attributesManager.savePersistentAttributes()
    }
    this.level = level
    this.attributesManager.setSessionAttributes({
      ...this.attributesManager.getSessionAttributes(),
      level
    })
    return this
  }

  /**
   * クイズのレベル別設定を取得する
   */
  public getLevelConfig (level: QuizLevel): QuizLevelConfig {
    const config = this.levelSettings[level]
    return config
  }

  /**
   * クイズの設定を取得する
   */
  public getConfig (): QuizConfig {
    const { level, lang, addPoint, reducePoint } = this
    const config = this.levelSettings[level]
    return {
      ...config,
      lang,
      level,
      addPoint,
      reducePoint
    }
  }
}
export default ManageLevelService
