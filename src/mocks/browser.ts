import { categoriesMockHandlers } from '@/modules/admin/features/categories/api/mocks/categories.mock-handlers'
import { videosMockHandlers } from '@/modules/admin/features/videos/api/mocks/videos.mock-handler'
import { setupWorker } from 'msw/browser'

export const worker = setupWorker(
  ...categoriesMockHandlers,
  ...videosMockHandlers
)
