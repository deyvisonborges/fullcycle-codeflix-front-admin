// import { mocksHandlers } from '@/modules/admin/features/categories/mocks/handlers'
// import { setupWorker } from 'msw/browser'

// export async function isMockServiceEnabled() {
//   if (import.meta.env.VITE_API_MOCKING === 'true') {
//     if (typeof window === 'undefined') {
//       const { server } = await import('./node') // dont use in browser
//       console.log('Server worker started')
//       server.listen()
//     } else {
//       console.log('Browser worker started')
//       worker.start()
//     }
//   }
// }
