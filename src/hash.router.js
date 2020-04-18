class HashRouter {
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
    console.log(currentLocation)
    this.transitionTo(currentLocation)

    window.addEventListener('hashchange', () => {
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
    return getHash()
  }

  normalizePath(path) {
    // const queryIndex = location.hash.indexOf('?')
    // const queryString = queryIndex > -1 ? location.hash.slice(queryIndex) : ''
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
    window.location.hash = `#${path}`
  }

  replace(path) {
    window.location.hash = `#${path}`
  }

  back() {
    window.history.back()
  }

  forward() {
    window.history.forward()
  }
}

function getHash() {
  let href = window.location.href

  const index = href.indexOf('#')

  if (index < 0) return ''

  href = href.slice(index + 1)

  const searchIndex = href.indexOf('?')

  if (searchIndex < 0) {
    href = decodeURI(href)
  } else {
    href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex)
  }

  return href
}

export {
  HashRouter
}
