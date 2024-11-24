import { categoriesMockHandlers } from '@/modules/admin/features/categories/api/mocks/categories.mock-handlers'
import { setupServer } from 'msw/node'

export const server = setupServer(...categoriesMockHandlers)
