import App from './App'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { hydrate } from 'react-dom'
import { getClient } from './services/graphcms'

const client = getClient()

hydrate(
  <BrowserRouter>
    <App client={client} />
  </BrowserRouter>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
