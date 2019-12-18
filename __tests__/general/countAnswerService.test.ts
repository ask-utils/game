import AnswerCountService from '../../libs/general/countAnswerService'
import { createAttributesManager, createRequestEnvelope } from '../mock/JSONProviders'

describe('libs/general/countAnswerService', () => {
  it('should return 0 by default', () => {
    const request = createRequestEnvelope()
    const attributesManager = createAttributesManager(request)
    const service = new AnswerCountService(attributesManager)
    expect(service.getCurrentCount()).toEqual(0)
  })
  it('should return 2 when increase counter by twice', () => {
    const request = createRequestEnvelope()
    const attributesManager = createAttributesManager(request)
    const service = new AnswerCountService(attributesManager)
    service.increase().increase()
    expect(service.getCurrentCount()).toEqual(2)
  })
  it('should return 0 when reset the counter', () => {
    const request = createRequestEnvelope()
    const attributesManager = createAttributesManager(request)
    const service = new AnswerCountService(attributesManager)
    service.increase().increase()
    expect(service.getCurrentCount()).toEqual(2)
    expect(service.reset().getCurrentCount()).toEqual(0)
  })
  it('should set 1 in session attributes', () => {
    const request = createRequestEnvelope()
    const attributesManager = createAttributesManager(request)
    const service = new AnswerCountService(attributesManager)
    service.increase()
    const { answerCount } = attributesManager.getSessionAttributes()
    expect(answerCount).toEqual(1)
  })
})
