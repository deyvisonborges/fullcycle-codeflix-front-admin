import { categoriesMockHandlers } from '@/modules/admin/features/categories/api/mocks/categories.mock-handlers'
import { videosMockHandlers } from '@/modules/admin/features/videos/api/mocks/videos.mock-handler'
import { setupServer } from 'msw/node'

export const server = setupServer(
  ...categoriesMockHandlers,
  ...videosMockHandlers
)
