import { createMockHandlers } from '@/mocks/generic-mock-handlers'
import videosStub from './videos-stub.json'
import { VideoAPIModel } from '../video.api-model'

export const VIDEOS_MOCK_ENDPOINT = 'http://localhost:4000/videos'

export const videosMockHandlers = createMockHandlers<VideoAPIModel>({
  endpoint: VIDEOS_MOCK_ENDPOINT,
  stubData: videosStub
})
