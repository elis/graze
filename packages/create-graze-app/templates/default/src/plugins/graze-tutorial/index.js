import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const app = {
  name: 'graze-tutorial',
  onLoad: () => {
    const Tutorial = require('./tutorial').default
    const { default: { defineStaticRoute } } = require('@graze')

    const hasSite = !!defineStaticRoute
    if (hasSite) {
      try {
        defineStaticRoute({
          path: '/__tutorial',
          component: Tutorial
        })
      } catch (error) {
        console.log('Error definig route:', error)
      }
    }
    return {
      hasSite
    }
  },
  Wrapper: ({ fields: { hasSite }, children }) => {
    const Tutorial = require('./tutorial').default
    const { default: Page } = require('components/page')

    return hasSite
      ? children
      : (
        <Page>
          <Switch>
            <Route path='/__tutorial' component={Tutorial} />
            <Route path='/' children={children} />
          </Switch>
        </Page>
      )
  }
}
