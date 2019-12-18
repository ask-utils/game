import {
  getCalculateResult,
  getRandomNumber,
  getSpeechOperator,
  getRandomOperator
} from '../../../libs/maths/createQuizService/helpers'
import {
  CalcOperator
} from '../../../libs/maths/model'

describe('libs/maths/createQuizService/helpers', () => {
  describe('getRandomNumber', () => {
    it('should return 1', () => {
      expect(getRandomNumber(1, 1)).toEqual(1)
    })
    it('should return any random number', () => {
      const num = getRandomNumber(1, 10)
      expect(num >= 1).toEqual(true)
      expect(num <= 10).toEqual(true)
    })
  })
  describe('getCalculateResult', () => {
    it('3 - 2 = 1', () => {
      const result = getCalculateResult('minus', [3, 2])
      expect(result).toEqual(1)
    })
    it('2 - 3 = -1', () => {
      const result = getCalculateResult('minus', [2, 3])
      expect(result).toEqual(-1)
    })
    it('1 + 2 = 3', () => {
      const result = getCalculateResult('plus', [1, 2])
      expect(result).toEqual(3)
    })
    it('1 + 2 + 3 + 4 + 5 = 15', () => {
      const result = getCalculateResult('plus', [1, 2, 3, 4, 5])
      expect(result).toEqual(15)
    })
    it('1 / 2 = 0.5', () => {
      const result = getCalculateResult('dividedBy', [1, 2])
      expect(result).toEqual(0.5)
    })
    it('1 * 2 = 2', () => {
      const result = getCalculateResult('times', [1, 2])
      expect(result).toEqual(2)
    })
  })
  describe('getSpeechOperator', () => {
    it('should say "割る" in Japanese', () => {
      expect(getSpeechOperator('dividedBy', 'ja-JP')).toEqual('割る')
    })
    it('should say "divided by" in English', () => {
      expect(getSpeechOperator('dividedBy', 'en-GB')).toEqual('divided by')
    })
  })
  describe('getRandomOperator', () => {
    it('should return plus', () => {
      expect(getRandomOperator('plus')).toEqual('plus')
    })
    it('should return plus or minus', () => {
      const targets: CalcOperator[] = ['plus', 'minus']
      const results = getRandomOperator(targets[0], targets[1])
      expect(targets.includes(results)).toEqual(true)
    })
  })
})
