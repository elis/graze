import React from 'react'
import { Switch, Route } from 'react-router-dom'

const name = 'graze-docs'
const defaultRoute = '/docs/:section(.*)?'

const defaultOptions = {
  title: 'Docs',
  source: './src/docs',
  route: '/docs'
}

export const app = {
  name,
  onLoad: (userOptions) => {
    const { getDocumentation, useDocs } = require('./documentation')
    const plugins = require('@graze').default
    const { defineStaticRoute } = plugins
    const options = Object.assign({}, defaultOptions, userOptions)
    options.source = options.source.match(/\/$/)
      ? options.source.replace(/(\/)$/, '')
      : options.source

    options.source = options.source.match(/^\.\/src\//)
      ? options.source.replace(/^(\.\/src\/)/, '')
      : options.source
    
    options.route = options.route.match(/\/$/)
      ? options.route.replace(/(\/)$/, '')
      : options.route

    options.routePath = options.route + '/:section(.*)?'

    const Documentation = getDocumentation(options)

    const hasSite = !!defineStaticRoute
    if (hasSite) {
      try {
        defineStaticRoute({
          title: options.title,
          path: options.routePath,
          to: options.route,
          component: Documentation
        })
      } catch (error) {
        console.log('Error definig route:', error)
      }
    }
    return {
      hasSite,
      Documentation,
      options,
      useDocs
    }
  },
  Wrapper: ({ fields: { hasSite, options, Documentation }, children, ...props }) => {
    const { default: { useSite } } = require('@graze')
    const { default: Page } = require('components/page')

    const site = hasSite && useSite && useSite()

    return hasSite && site && site.name
      ? children
      : (
        <Switch>
          <Route path={options.routePath} component={Documentation} />
          <Route path='/' children={children} />
        </Switch>
      )
  },
  expose: (plugin) => {
    const { getDocumentation, useDocs } = require('./documentation')

  
    return ({ useDocs })
  }
}
