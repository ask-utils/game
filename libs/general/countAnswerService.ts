import { AttributesManager } from 'ask-sdk'

// 連続正解カウンター
export class CountAnswerService {
  // 連続正解数管理
  protected attributesManager: AttributesManager

  // 連続正解数
  protected count = 0

  constructor (attributesManager: AttributesManager) {
    this.attributesManager = attributesManager
  }

  /**
   * セッションでの連続数正解を更新する
   * @param answerCount
   */
  private updateSessionAnswerCount (): this {
    this.attributesManager.setSessionAttributes({
      ...this.attributesManager.getSessionAttributes(),
      answerCount: this.count
    })
    return this
  }

  /**
   * 連続正解数を増加
   */
  public increase (): this {
    this.count = this.count + 1
    this.updateSessionAnswerCount()
    return this
  }

  /**
   * 連続正解数をリセット
   */
  public reset (): this {
    this.count = 0
    this.updateSessionAnswerCount()
    return this
  }

  /**
   * 現在の連続正解数
   */
  public getCurrentCount (): number {
    return this.count
  }
}
export default CountAnswerService
