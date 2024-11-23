import { mocksHandlers } from '@/modules/admin/features/categories/mocks/handlers'
import { setupWorker } from 'msw/browser'
import { setupServer } from 'msw/node'

export const worker = setupWorker(...mocksHandlers)
export const server = setupServer(...mocksHandlers)
