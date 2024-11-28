import videosStub from './videos-stub.json'
import { delay, http, HttpResponse } from 'msw'

export const VIDEOS_MOCK_ENDPOINT = 'http://localhost:4000/videos'

export const videosMockHandlers = [
  http.get(VIDEOS_MOCK_ENDPOINT, async () => {
    await delay()
    return HttpResponse.json({ data: videosStub })
  })
]
