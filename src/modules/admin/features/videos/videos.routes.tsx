import { RouteObject } from 'react-router-dom'
import { VideoListPage } from './pages/video-list.page'
import { VideoCreationPage } from './pages/video-creation.page'
import { VideoEditPage } from './pages/video-edit.page'

export const VIDEOS_ENDPOINT = '/videos'

export const videosRoutes: RouteObject = {
  path: 'videos',
  children: [
    // https://medium.com/@iamatulbansal/what-is-a-index-routes-in-react-router-dom-6-82f5f3ba88a
    { index: true, element: <VideoListPage /> },
    { path: 'create', element: <VideoCreationPage /> },
    { path: 'edit/:id', element: <VideoEditPage /> }
  ]
}
