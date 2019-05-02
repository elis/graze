import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Documentation } from './documentation'

export const app = {
  onLoad: () => {
    const plugins = require('@graze').default
    const { defineStaticRoute } = plugins

    const hasSite = !!defineStaticRoute
    if (hasSite) {
      try {
        defineStaticRoute({
          title: 'Docs',
          path: '/docs/:section(.*)?',
          to: '/docs',
          component: Documentation
        })
      } catch (error) {
        console.log('Error definig route:', error)
      }
    }
    return {
      hasSite
    }
  },
  Wrapper: ({ fields: { hasSite }, children, ...props }) => {
    const { default: Page } = require('components/page')

    return (

        hasSite
          ? children
          : (
            <Page>
              <Switch>
                <Route path='/docs/:section?' component={Documentation} />
                <Route path='/'>{children}</Route>
              </Switch>
            </Page>
          )
        
    )
  }
}

