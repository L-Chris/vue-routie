import {
  HashRouter,
  HistoryRouter
} from '../src'

const routes = [
  {
    path: '/user',
    component: '<div>user</div>'
  },
  {
    path: '/center',
    component: '<div>center</div>'
  }
]

function initRouter(mode = 'hash') {
  let router
  if (mode === 'hash') {
    router = new HashRouter({
      routes
    })
  } else {
    router = new HistoryRouter({
      routes
    })
  }

  window.router = router
}


window.initRouter = initRouter
