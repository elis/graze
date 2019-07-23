import React from 'react'
import { Route, Switch } from 'react-router-dom'

const name = 'graze-tutorial'

export const app = {
  name,
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
        // console.log('Error definig route:', error)
      }
    }
    return {
      hasSite
    }
  },
  Wrapper: ({ fields: { hasSite }, children }) => {
    const Tutorial = require('./tutorial').default
    const { default: { useSite } } = require('@graze')
    const { default: Page } = require('components/page')

    const { state: site } = hasSite && useSite && useSite()

    return hasSite && site && site.name
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
