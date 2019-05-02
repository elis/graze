import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { getDocumentation } from './documentation'

const defaultRoute = '/docs/:section(.*)?'

const defaultOptions = {
  title: 'Docs',
  source: './src/docs',
  route: '/docs'
}

export const app = {
  onLoad: (userOptions) => {
    const plugins = require('@graze').default
    const { defineStaticRoute } = plugins
    const options = Object.assign({}, defaultOptions, userOptions)
    console.log('what are options?', options)
    options.source = options.source.match(/\/$/)
      ? options.source.replace(/(\/)$/, '')
      : options.source

    options.source = options.source.match(/^\.\/src\//)
      ? options.source.replace(/^(\.\/src\/)/, '')
      : options.source
    
    options.route = options.route.match(/\/$/)
      ? options.route.replace(/(\/)$/, '')
      : options.route

    console.log('what are options?', options)
    
    options.routePath = options.route + '/:section(.*)?'

    const Documentation = getDocumentation(options)

    const hasSite = !!defineStaticRoute
    if (hasSite) {
      console.log('HAS SITE', {options, Documentation})
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
    console.log('NO SITE', {options, Documentation})
    return {
      hasSite,
      Documentation,
      options
    }
  },
  Wrapper: ({ fields: { hasSite, options, Documentation }, children, ...props }) => {
    const { default: { useSite } } = require('@graze')
    const { default: Page } = require('components/page')

    const site = hasSite && useSite && useSite()
    console.log('=== === === === === === site', {options, Documentation, site})

    return hasSite && site && site.name
      ? children
      : (
        <Switch>
          <Route path={options.routePath} component={Documentation} />
          <Route path='/' children={children} />
        </Switch>
      )
  }
}