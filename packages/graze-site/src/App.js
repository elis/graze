import React from 'react'
import plugins, { Addons } from './plugins'

const App = () => (<Addons />)

const Wrapped = plugins.app(App)
export default Wrapped
