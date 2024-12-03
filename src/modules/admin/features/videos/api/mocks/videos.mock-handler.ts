import { createMockHandlers } from '@/mocks/generic-mock-handlers'
import videosStub from './videos-stub.json'
import { VideoAPIModel } from '../video.api-model'
import { delay, http, HttpResponse } from 'msw'

export const VIDEOS_MOCK_ENDPOINT = 'http://localhost:4000/videos'

export const videosMockHandlers = createMockHandlers<VideoAPIModel>({
  endpoint: VIDEOS_MOCK_ENDPOINT,
  stubData: videosStub,
  customHandlers: [
    http.post(VIDEOS_MOCK_ENDPOINT, async ({ request }) => {
      await delay(1000)
      const data = await request.formData()
      const file = data.get('file')

      if (!file) {
        return new HttpResponse('Missing document', { status: 400 })
      }
      if (!(file instanceof File)) {
        return new HttpResponse('Uploaded document is not a File', {
          status: 400
        })
      }

      await delay(2000)
      return HttpResponse.json(null)
    })
  ]
})
