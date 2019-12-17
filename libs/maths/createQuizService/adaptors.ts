import {
  HandlerInput,
  RequestInterceptor
} from 'ask-sdk-core'
import { isSkillEvent } from '@ask-utils/core'
import CreateMathQuizService from './class'
import {
  MathQuizConfig
} from '../model'
/**
 * QuizServiceクラスを作成し、requestAttributesに保存する
 * @param handlerInput
 * @param config
 */
export const createQuizService = (handlerInput: HandlerInput, config?: MathQuizConfig): void => {
  const service = new CreateMathQuizService(config)
  const attributes = handlerInput.attributesManager.getRequestAttributes()
  handlerInput.attributesManager.setRequestAttributes({
    ...attributes,
    quizService: service
  })
}

/**
 * QuizServiceをrequestAttributesから取得する
 * @param handlerInput
 */
export const getQuizService = (handlerInput: HandlerInput): CreateMathQuizService => {
  const { quizService } = handlerInput.attributesManager.getRequestAttributes()
  return quizService
}

export const createQuizServiceInterceptor = (config?: MathQuizConfig): RequestInterceptor => {
  return {
    process (handlerInput) {
      if (isSkillEvent(handlerInput.requestEnvelope)) return
      createQuizService(handlerInput, config)
    }
  }
}
