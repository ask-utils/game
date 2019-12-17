import bunyan from 'bunyan'
import {
  MathQuizConfig,
  CalcOperator,
  MathQuiz,
  defaultQuizConfig
} from '../model'
import logger from '../../logger'
import { getCalculateResult, getSpeechOperator, getRandomNumber } from './helpers'

export class CreateMathQuizService {
  /**
   * Logger
   */
  protected log: bunyan

  /**
   * execute logger
   */
  protected isDebug: boolean

  /**
   * 最大値
   */
  protected max: number;

  /**
   * 最小値
   */
  protected min: number;

  /**
   * 計算する数
   */
  protected quantity: number;

  /**
   * 演算子
   */
  protected operator: CalcOperator;

  /**
   * 言語
   */
  protected lang: string

  /**
   * ゼロ以下を許容するか
   */
  protected allowUnderZero: boolean

  /**
   * 小数点以下を許可するか
   */
  protected allowDecimal = false

  /**
   * 生成された数字のリスト
   */
  protected numbers: number[] = []

  /**
   * 一応設定そのものも入れておく
   */
  protected config: Required<MathQuizConfig>

  constructor (quizConfig: MathQuizConfig = defaultQuizConfig, log: bunyan = logger) {
    this.config = {
      ...defaultQuizConfig,
      ...quizConfig
    }
    this.max = this.config.max
    this.min = this.config.min
    this.quantity = this.config.quantity
    this.operator = this.config.operator
    this.lang = this.config.lang
    this.allowUnderZero = this.config.allowUnderZero
    this.isDebug = this.config.isDebug
    this.log = log.child({
      // eslint-disable-next-line @typescript-eslint/camelcase
      widget_type: this.constructor.name
    })
  }

  /**
   * 小数点以下を許可しない
   */
  public disallowDecimalNumber () {
    this.allowDecimal = false
    return this
  }

  /**
   * 小数点以下を許可
   */
  public allowDecimalNumber () {
    this.allowDecimal = true
    return this
  }

  /**
   * ゼロ以下の値を許可しない
   */
  public disllowUnderZeroNumber () {
    this.allowUnderZero = false
    return this
  }

  /**
   * ゼロ以下の値を許可する
   */
  public allowUnderZeroNumber () {
    this.allowUnderZero = true
    return this
  }

  public disableDebugMode () {
    this.isDebug = false
    return this
  }

  public enableDebugMode () {
    this.isDebug = true
    return this
  }

  /**
   * 設定を更新する
   * @param config
   */
  public updateConfig (config: MathQuizConfig): this {
    Object.assign(this, config)
    return this
  }

  /**
   * 最小値を更新する
   * @param min
   */
  public updateMinimum (min: number): this {
    this.min = min
    return this
  }

  /**
   * 最大値を更新する
   * @param max
   */
  public updateMaximum (max: number): this {
    this.max = max
    return this
  }

  /**
   * 言語を更新する
   * @param lang
   */
  public updateLanguage (lang: string): this {
    this.lang = lang
    return this
  }

  /**
   * 計算の数を変更する
   * @param quantity 2以上じゃないと計算できなくなる
   */
  public updateQuantity (quantity: number): this {
    if (quantity < 2) throw new Error('quantity must be grater than 2.')
    this.quantity = quantity
    return this
  }

  /**
   * ランダムな数字を生成する
   */
  private getRandomNumber (): number {
    const { min, max } = this
    return getRandomNumber(min, max)
  }

  /**
   * 喋る用の演算子
   */
  private getSpeechOperator (): string {
    const { operator, lang } = this
    return getSpeechOperator(operator, lang)
  }

  /**
   * 計算する
   */
  private getCalculateResult (): number {
    return getCalculateResult(this.operator, this.numbers)
  }

  /**
   * 計算問題を作成する
   */
  public createQuiz (): MathQuiz {
    const numbers: number[] = []
    for (let index = 0; index < this.quantity; index++) {
      numbers.push(this.getRandomNumber())
    }
    this.numbers = numbers.sort((a, b) => (a < b ? 1 : -1))
    if (this.numbers.length < 2) throw new Error('quiz number must be grater than two')
    const speechOperator = this.getSpeechOperator()
    const answer = this.getCalculateResult()
    if (this.isDebug) {
      this.log.info({
        numbers: this.numbers,
        quiz: this.numbers.join(`${speechOperator}`),
        answer,
        allowUnderZero: this.allowUnderZero,
        allowDecimal: this.allowDecimal,
        retryUnderZero: answer < 1 && !this.allowUnderZero,
        retryhasDecimal: answer !== Math.ceil(answer) && !this.allowDecimal
      })
    }
    // ゼロ以下が出たら再計算
    if (answer < 1 && !this.allowUnderZero) return this.createQuiz()
    // 小数点が発生しても再計算
    if (answer !== Math.ceil(answer)) {
      if (!this.allowDecimal) return this.createQuiz()
      return {
        numbers: this.numbers,
        quiz: this.numbers.join(`${speechOperator}`),
        answer: Math.ceil(answer * 100) / 100
      }
    }
    return {
      numbers: this.numbers,
      quiz: this.numbers.join(`${speechOperator}`),
      answer
    }
  }

  /**
   * クイズの設定を取得する
   */
  public getConfig (): MathQuizConfig {
    return this.config
  }
}
export default CreateMathQuizService
