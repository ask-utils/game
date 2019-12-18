import { Context } from 'aws-lambda'
import { RequestEnvelope, services } from 'ask-sdk-model'
import {
  HandlerInput, AttributesManager, ResponseBuilder,
  AttributesManagerFactory, ResponseFactory, PersistenceAdapter
} from 'ask-sdk'
import {
  MockPersistenceAdapter
} from './MockPersistenceAdapter'
import ServiceClientFactory = services.ServiceClientFactory

export const createRequestEnvelope = (request?: Partial<RequestEnvelope>): RequestEnvelope => {
  const obj: RequestEnvelope = {
    context: {
      AudioPlayer: undefined,
      Display: undefined,
      System: {
        apiAccessToken: undefined,
        apiEndpoint: '',
        application: {
          applicationId: ''
        },
        device: {
          deviceId: '',
          supportedInterfaces: {}
        },
        user: {
          userId: ''
        }
      }
    },
    request: {
      type: 'LaunchRequest',
      requestId: '',
      timestamp: '',
      locale: undefined

    },
    session: {
      application: {
        applicationId: ''
      },
      attributes: undefined,
      new: true,
      sessionId: '',
      user: {
        accessToken: undefined,
        permissions: {
          consentToken: undefined
        },
        userId: ''
      }
    },
    version: '1.0'
  }
  if (!request) return obj
  return Object.assign({}, obj, request)
}

export const createAttributesManager = (requestEnvelope: RequestEnvelope, persistenceAdapter?: PersistenceAdapter) => {
  return AttributesManagerFactory.init({
    requestEnvelope: requestEnvelope,
    persistenceAdapter: persistenceAdapter || new MockPersistenceAdapter()
  })
}

class HandlerInputFactory {
  protected requestEnvelope: RequestEnvelope
  protected lambdaContext: Context
  protected attributesManager?: AttributesManager
  protected persistenceAdapter?: PersistenceAdapter;
  protected responseBuilder: ResponseBuilder
  protected serviceClientFactory?: ServiceClientFactory

  constructor (requestEnvelope: RequestEnvelope, lambdaContext: Context) {
    this.requestEnvelope = requestEnvelope
    this.lambdaContext = lambdaContext
    this.responseBuilder = ResponseFactory.init()
  }

  public updatePersistanceAdapter (persistenceAdapter: PersistenceAdapter) {
    this.persistenceAdapter = persistenceAdapter
    return this
  }

  public getPersistanceAdapter (): PersistenceAdapter {
    if (this.persistenceAdapter) return this.persistenceAdapter
    return new MockPersistenceAdapter()
  }

  public getAttributesManager (): AttributesManager {
    if (this.attributesManager) return this.attributesManager
    return AttributesManagerFactory.init({
      requestEnvelope: this.requestEnvelope,
      persistenceAdapter: this.getPersistanceAdapter()
    })
  }

  public updateServiceClientFactory (serviceClientFactory: ServiceClientFactory) {
    this.serviceClientFactory = serviceClientFactory
    return this
  }

  public getServiceClientFactory (): ServiceClientFactory | undefined {
    return this.serviceClientFactory
  }

  public create (): HandlerInput {
    return {
      requestEnvelope: this.requestEnvelope,
      context: this.lambdaContext,
      attributesManager: this.getAttributesManager(),
      responseBuilder: this.responseBuilder,
      serviceClientFactory: this.getServiceClientFactory()
    }
  }
}

export const createSimpleHandlerInput = (requestEnvelope: RequestEnvelope = createRequestEnvelope()): HandlerInput => {
  const factory = new HandlerInputFactory(requestEnvelope, {} as Context)
  return factory.create()
}
