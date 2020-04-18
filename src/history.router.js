class HistoryRouter {
  constructor({
    base = '',
    routes = []
  } = {}) {
    this.base = base
    this.routes = routes
    this.current = {}

    this.init()
  }

  init() {
    const currentLocation = this.getCurrentLocation()
    this.transitionTo(currentLocation)

    window.addEventListener('popstate', () => {
      const currentLocation = this.getCurrentLocation()
      this.transitionTo(currentLocation)
    })
  }

  transitionTo(location) {
    const route = this.match(location)
    if (!route) return
    this.current = route
    this.render(route)
  }

  match(location) {
    const {path} = this.normalizePath(location)
    return this.routes.find(_ => _.path === path)
  }

  render(route) {
    if (!Reflect.has(route, 'component')) return
    document.body.innerHTML = route.component
  }

  getCurrentLocation() {
    return getLocation()
  }

  normalizePath(location) {
    const hashIndex = location.indexOf('#')
    let path = hashIndex > -1 ? location.slice(0, hashIndex) : location
    const queryIndex = location.indexOf('?')
    path = queryIndex > -1 ? location.slice(0, queryIndex) : location
    const query = {}

    return {
      path,
      query
    }
  }

  go(n) {
    window.history.go(n)
  }

  push(path) {
    window.history.pushState({}, '', path)
  }

  replace(path) {
    window.history.replaceState({}, '', path)
  }

  back() {
    window.history.back()
  }

  forward() {
    window.history.forward()
  }
}

function getLocation() {
  const {
    pathname,
    search,
    hash
  } = window.location
  const path = decodeURI(pathname)

  return path + search + hash
}

export {
  HistoryRouter
}
