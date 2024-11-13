import { RouteObject } from 'react-router-dom'
import { LisCastMembersPage } from './pages/list-cast-members.page'
import { CreateCastMemberPage } from './pages/create-cast-member.page'

export const castMembersRoutes: RouteObject = {
  path: 'cast-members',
  children: [
    { index: true, element: <LisCastMembersPage /> },
    { path: 'create', element: <CreateCastMemberPage /> }
    // { path: 'edit/:id', element: <EditCategoryPage /> }
  ]
}
