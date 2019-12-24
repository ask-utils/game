import {
  CreateMathQuizService
} from '../../../libs/maths/createQuizService/index'

describe('libs/maths/createQuizService/class', () => {
  describe('polly mode', () => {
    it('should mark en-CA when polly config enabled', () => {
      const service = new CreateMathQuizService({
        lang: 'ja-JP',
        pollyConfig: {
          status: 'enable',
          lang: 'en-CA'
        }
      }).enableDebugMode()
      const result = service.createQuiz()
      expect(result).toEqual({
        answer: expect.any(Number),
        numbers: expect.any(Array),
        quiz: expect.any(String)
      })
      expect(result.quiz).toContain('en-CA')
    })
    it('should NOT mark en-CA when polly config disabled', () => {
      const service = new CreateMathQuizService({
        lang: 'ja-JP',
        pollyConfig: {
          status: 'disable',
          lang: 'en-CA'
        }
      }).enableDebugMode()
      const result = service.createQuiz()
      expect(result).toEqual({
        answer: expect.any(Number),
        numbers: expect.any(Array),
        quiz: expect.any(String)
      })
      expect(result.quiz).not.toContain('en-CA')
    })
  })
  describe('CreateMathQuizService', () => {
    let service = new CreateMathQuizService().enableDebugMode()
    beforeEach(() => {
      service = new CreateMathQuizService().enableDebugMode()
    })
    it('should return valid quiz format', () => {
      const result = service.createQuiz()
      expect(result).toEqual({
        answer: expect.any(Number),
        numbers: expect.any(Array),
        quiz: expect.any(String)
      })
    })
    it('should return valid calc result [plus]', () => {
      service.updateMaximum(1).updateMinimum(1)
      expect(service.createQuiz()).toEqual({
        answer: 2,
        numbers: [1, 1],
        quiz: '1足す1'
      })
    })
    it('should return valid calc result [minus]', () => {
      service.updateConfig({
        max: 1,
        min: 1,
        operator: 'minus',
        allowUnderZero: true
      })
      expect(service.createQuiz()).toEqual({
        answer: 0,
        numbers: [1, 1],
        quiz: '1引く1'
      })
    })
    it('should return valid calc result [times]', () => {
      service.updateConfig({
        max: 1,
        min: 1,
        operator: 'times'
      })
      expect(service.createQuiz()).toEqual({
        answer: 1,
        numbers: [1, 1],
        quiz: '1かける1'
      })
    })
    it('should return valid calc result [dividedBy]', () => {
      service.updateConfig({
        max: 1,
        min: 1,
        operator: 'dividedBy',
        allowUnderZero: true
      })
      expect(service.createQuiz()).toEqual({
        answer: 1,
        numbers: [1, 1],
        quiz: '1割る1'
      })
    })
  })
})
