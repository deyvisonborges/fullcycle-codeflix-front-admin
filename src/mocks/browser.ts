import { mocksHandlers } from '@/modules/admin/features/categories/mocks/handlers'
import { setupWorker } from 'msw/browser'

export async function isMockServiceEnabled() {
  if (!process.env.MOCK_SERVICE_WORKER) {
    return
  }

  const worker = setupWorker(...mocksHandlers)
  return worker.start()
}
