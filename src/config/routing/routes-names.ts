export const routesNames = {
  authentication: {
    name: '/auth',
    childs: {
      register: {
        name: '/register',
        securedBy: 'none'
      },
      login: {
        name: '/login',
        securedBy: 'jwt'
      }
    }
  }
}
