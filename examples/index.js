import {
  HashRouter
} from '../src/hash.router'

const router = new HashRouter({
  routes: [
    {
      path: '/user',
      component: '<div>user</div>'
    },
    {
      path: '/center',
      component: '<div>center</div>'
    }
  ]
})

window.router = router
