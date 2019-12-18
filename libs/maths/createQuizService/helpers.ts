import {
  getRandomSpeaker,
  getRandomLanguage
} from '@ask-utils/core'
import { CalcOperator } from '../model'
import { PollyConfig } from '../../general'

/**
 * Get random number by specific range
 * @param min
 * @param max
 * @example
 * ```
 *  const num = getRandomNumber(1, 10)
 *  expect(num >= 1).toEqual(true)
 *  expect(num <= 10).toEqual(true)
 *```
 */
export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min)
}

/**
 * Get random calc operator
 * @param operators
 * @example
 * ```
 * const operator = getRandomOperator('plus', 'minus')
 * console.log(operator) // 'plus' or 'minus'
 * ```
 */
export const getRandomOperator = (...operators: CalcOperator[]): CalcOperator => {
  const key = Math.floor(Math.random() * operators.length)
  return operators[key]
}

/**
 * 喋る用の演算子
 * @example
 * ```
 * expect(getSpeechOperator('dividedBy', 'ja-JP')).toEqual('割る')
 * expect(getSpeechOperator('dividedBy', 'en-GB')).toEqual('divided by')
 * ```
 */
export const getSpeechOperator = (operator: CalcOperator, lang: string): string => {
  if (/ja/.test(lang)) {
    switch (operator) {
      case 'dividedBy':
        return '割る'
      case 'times':
        return 'かける'
      case 'plus':
        return '足す'
      case 'minus':
        return '引く'
      default:
        return operator
    }
  }
  if (/en/.test(lang)) {
    switch (operator) {
      case 'dividedBy':
        return 'divided by'
      case 'times':
      case 'plus':
      case 'minus':
      default:
        return operator
    }
  }
  if (/es/.test(lang)) {
    switch (operator) {
      case 'dividedBy':
        return 'entre'
      case 'times':
        return 'por'
      case 'plus':
        return 'más'
      case 'minus':
        return 'menos'
      default:
        return operator
    }
  }
  if (/de/.test(lang)) {
    switch (operator) {
      case 'dividedBy':
        return 'geteilt durch'
      case 'times':
        return 'mal'
      case 'plus':
      case 'minus':
      default:
        return operator
    }
  }
  if (/fr/.test(lang)) {
    switch (operator) {
      case 'dividedBy':
        return 'divisé par'
      case 'times':
        return 'fois'
      case 'minus':
        return 'moins'
      case 'plus':
      default:
        return operator
    }
  }
  if (/it/.test(lang)) {
    switch (operator) {
      case 'dividedBy':
        return 'diviso'
      case 'times':
        return 'per'
      case 'plus':
        return 'piu'
      case 'minus':
        return 'meno'
      default:
        return operator
    }
  }
  // if (lang === 'random')
  return operator
}

/**
 * 計算する
 * @example
 * const result = getCalculateResult('minus', [3, 2])
 * expect(result).toEqual(1)
 *
 * const result = getCalculateResult('minus', [2, 3])
 * expect(result).toEqual(-1)
 *
 * const result = getCalculateResult('plus', [1, 2])
 * expect(result).toEqual(3)
 *
 * const result = getCalculateResult('plus', [1, 2, 3, 4, 5])
 * expect(result).toEqual(15)
 *
 * const result = getCalculateResult('dividedBy', [1, 2])
 * expect(result).toEqual(0.5)
 *
 * const result = getCalculateResult('times', [1, 2])
 * expect(result).toEqual(2)
 */
export const getCalculateResult = (operator: CalcOperator, numbers: number[]): number => {
  const result = numbers.reduce((prev: number, current: number) => {
    switch (operator) {
      case 'dividedBy':
        return prev / current
      case 'times':
        return prev * current
      case 'plus':
        return prev + current
      case 'minus':
        return prev - current
      default:
        throw new Error(`Unsupported operator: ${operator}`)
    }
  })
  return result
}

export const getSpeechQuizText = (numbers: number[], operator: CalcOperator, pollyConfig: PollyConfig): string => {
  if (pollyConfig.lang === '') throw new Error('lang should not be empty')
  const lang = pollyConfig.lang === 'random' ? getRandomLanguage() : pollyConfig.lang
  const speechOperator = getSpeechOperator(operator, lang)
  const speaker = getRandomSpeaker(lang)
  return `<voice name="${speaker}"><lang xml:lang="${lang}">${numbers.join(`${speechOperator}`)}</lang></voice>`
}
