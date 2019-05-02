import React, { createContext, useEffect, useMemo, useContext, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { onDemand, preload, onDemandSections } from './on-demand'

export const SiteContext = createContext({})
const isSSR = typeof window === 'undefined'

export default props => {
  const { site, error } = props.data
  const { grazePages: pages } = site || {}

  // Preload pages
  useEffect(() => {
    const preloadTimeout = setTimeout(() => {
      if (!isSSR && pages && pages.length) {
        for (const page of pages) {
          preload(page.slug)
        }
      }
    }, 2500)
    return () => clearTimeout(preloadTimeout)
  }, [pages])

  if (error) {
    const ErrorMsg = require('../../../components/error').default
    console.error('Primary routing error:', error)

    return <ErrorMsg error={error} />
  }

  if (!site) {
    const ErrorMsg = require('../../../components/error').default
    return <ErrorMsg error={{ issue: 'No site' }} />
  }

  const { data: attributes, content: body } = site.content
    ? require('gray-matter')(site.content)
    : { data: {}, content: '' }
  const attrs = require('./utils').compileAttributes(attributes, { site })

  return (
    <React.Fragment>
      <SiteContext.Provider value={{ ...site, attributes: attrs, body }}>
        <SiteRoutes {...props} />
      </SiteContext.Provider>
    </React.Fragment>
  )
}

const staticRoutes = {
  routes: []
}
const setStaticRoutes = routes => (
  typeof routes === 'function'
    ? Object.assign(staticRoutes, { routes: routes(staticRoutes.routes) })
    : Object.assign(staticRoutes, { routes })
)
export const defineStaticRoute = route => {
  if (!route.path) {
    throw new Error('Route path is required')
  }
  const routeDefined = staticRoutes.routes.find(r => r.path === route.path)
  if (routeDefined) {
    throw new Error(`Path already defined ${route.path}`)
  }

  setStaticRoutes(routes => [...routes, route])
  return () => {
    setStaticRoutes(routes => routes.filter(r => r.path !== route.path))
  }
}

const SiteRoutes = props => {
  const { default: Page } = require('components/page')
  const state = useSite()
  const { site, error } = props.data
  const { grazePages: pages } = props.data.site || {}

  const [ extraRoutes, setExtraRoutes ] = useState([])

  const getRoute = path => extraRoutes.find(r => r.path === path)
  const addExtraRoute = route => {
    const { path } = route || {}
    if (!path || getRoute(path)) {
      throw new Error(`Path exists ${path}`)
    }

    setExtraRoutes(routes => [...routes, route])

    return () => {
      setExtraRoutes(routes => [...routes.filter(r => r.path === path)])
    }
  }

  const routes = useMemo(() => {
    return [
      ...((pages && pages.length > 0 && pages
        .map(page => ({
          ...page,
          RouterComp: onDemand(page.slug, `/${page.slug}`, false, { page, site, error })
        }))
        .map((page, index) => (
          <Route
            key={`site page ${index}`}
            path={`/${page.slug}`}
            component={page.RouterComp} />
        ))) || []),
      ...(extraRoutes
        .map(({ component, ...route }, index) => (
          <Route
            key={`site extra-route ${index}`}
            {...route}
            component={onDemand(component, route.path, false, { site, error })}
          />
        )) || []),
      ...(staticRoutes.routes
        .map(({ component, ...route }, index) => (
          <Route
            key={`site static-route ${index}`}
            {...route}
            component={onDemand(component, route.path, false, { site, error })}
          />
        )) || [])
    ]
  }, [pages, extraRoutes, staticRoutes.routes])

  const Index = useMemo(() => (
    onDemand('index', '/', false, { page: site && site.index, site, error })
  ), [site && site.index])

  const actions = {
    addExtraRoute,
    defineStaticRoute,
    onDemand,
    preload,
    onDemandSections
  }

  return (
    <SiteContext.Provider value={{
      state: {
        ...state,
        extraRoutes,
        staticRoutes: staticRoutes.routes
      },
      actions
    }}>
      <Page>
        <Switch>
          <Route path='/' exact component={Index} />
          {routes}
          <Route path='/' component={onDemand('404')} />
        </Switch>
        {props.children}
      </Page>
    </SiteContext.Provider>
  )
}

export const useSite = () => {
  return useContext(SiteContext)
}
