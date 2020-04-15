class HashRouter {
  constructor({
    base = '',
    routes = []
  } = {}) {
    this.base = base
    this.routes = routes
    this.current = {
      route: {},
      path: '',
      query: {}
    }

    this.init()
  }

  init() {
    window.addEventListener('hashchange', () => {
      const record = this.normalizePath()
      const route = this.match(record.path)
      if (!route) return
      record.route = route
      this.current = record
      this.render(this.current.route)
    })

    const record = this.normalizePath()
    const route = this.match(record.path)
    if (!route) return
    record.route = route
    this.current = record
    this.render(this.current.route)
  }

  match(path) {
    return this.routes.find(_ => _.path === path)
  }

  render(route) {
    if (!Reflect.has(route, 'component')) return
    document.body.innerHTML = route.component
  }

  normalizePath() {
    const path = location.hash.replace('#', '')
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

export {
  HashRouter
}
