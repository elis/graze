import App from './app'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { hydrate } from 'react-dom'

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
