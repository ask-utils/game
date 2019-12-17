import { CalcOperator } from '../model'

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min)
}

/**
 * 喋る用の演算子
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
  return operator
}

/**
 * 計算する
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
