import {
  createQuizServiceInterceptor,
  createQuizService,
  getQuizService
} from '../../../libs/maths/createQuizService/adaptors'
import {
  createSimpleHandlerInput
} from '../../mock/JSONProviders'

describe('libs/maths/createQuizService/adaptors', () => {
  describe('createQuizServiceInterceptor', () => {
    it('should return requestInterceptor', () => {
      const interceptor = createQuizServiceInterceptor()
      expect(interceptor.process).not.toEqual(undefined)
    })
  })
  describe('createQuizService', () => {
    it('should return quiz Service object', () => {
      const handlerInput = createSimpleHandlerInput()
      expect(() => {
        createQuizService(handlerInput)
      }).not.toThrow()
    })
  })
  describe('getQuizService', () => {
    it('should return null when the service has not initialized', () => {
      const handlerInput = createSimpleHandlerInput()
      const service = getQuizService(handlerInput)
      expect(service).toEqual(undefined)
    })
    it('should return quiz Service object', () => {
      const handlerInput = createSimpleHandlerInput()
      createQuizService(handlerInput)
      const service = getQuizService(handlerInput)
      expect(service.constructor.name).toEqual('CreateMathQuizService')
    })
  })
})
