import React from 'react'
import plugins, { Addons } from './plugins'

const App = () => (
  <React.Fragment>
    <Addons />
  </React.Fragment>
)

const Wrapped = plugins.app(App)
export default Wrapped
