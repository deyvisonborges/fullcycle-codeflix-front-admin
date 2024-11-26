import { RouteObject } from 'react-router-dom'
import { VideoListPage } from './pages/video-list.page'
import { VideoCreationPage } from './pages/video-creation.page'
import { VideoEditPage } from './pages/video-edit.page'

export const VIDEOS_ENDPOINT = '/videos'

export const videosRoutes: RouteObject = {
  path: 'videos',
  children: [
    { index: true, element: <VideoListPage /> },
    { path: 'create', element: <VideoCreationPage /> },
    { path: 'edit/:id', element: <VideoEditPage /> }
  ]
}
