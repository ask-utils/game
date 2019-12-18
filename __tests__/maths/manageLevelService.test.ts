import ManageLevelService from '../../libs/maths/manageLevelService'
import { createRequestEnvelope } from '../mock/JSONProviders'
import { AttributesManagerFactory } from 'ask-sdk'
import { MockPersistenceAdapter } from '../mock/MockPersistenceAdapter'

const createManageLevelService = () => {
  const request = createRequestEnvelope()
  const attribetusManager = AttributesManagerFactory.init({
    requestEnvelope: request,
    persistenceAdapter: new MockPersistenceAdapter()
  })
  const service = new ManageLevelService(attribetusManager)
  return service
}
describe('libs/maths/manageLevelService', () => {
  let service = createManageLevelService()
  beforeEach(() => service = createManageLevelService())
  it('should return undefined by default', async () => {
    expect(await service.getLastQuizLevel()).toEqual(undefined)
  })
  it('should return easy when given level', async () => {
    await service.updateQuizLevel('easy')
    expect(await service.getLastQuizLevel()).toEqual('easy')
  })
})
