import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './app'

import plugins from './plugins'

const Wrapped = plugins.wrap(App)

hydrate(
  <BrowserRouter>
    <Wrapped />
  </BrowserRouter>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
