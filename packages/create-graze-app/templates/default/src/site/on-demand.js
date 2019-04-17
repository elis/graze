import React, { useState, useEffect } from 'react'
import Loading from '../components/loading'
import ErrorMsg from '../components/error'

const isSSR = typeof window === 'undefined'
const cache = {}

export const onDemand = (page, path, preload, payload) => {
  const getComp = () => {
    try {
      const getPage = () => {
        const pageToLoad = (payload && payload.page && payload.page.component)
          || page
          || 'index'

        try {
          return require('../pages/' + pageToLoad)
        } catch (error) {
          return require('../pages/index')
        }
      }
      const module = getPage()

      // Helps debugging
      if (!module.default) {
        throw new Error('Module was empty - Module build failed?')
      }

      return {Loaded: module.default}
    } catch (error) {
      if (error && error.code === 'MODULE_NOT_FOUND') {
        console.error('Module not found:', error)
        return {Error: props => <ErrorMsg error={{
          ...error,
          message: `Module "src/pages/${page}" not found`
        }} details={{page, path, isSSR}} />}
      }
      return {Error: props => <ErrorMsg error={error} details={{page, path, isSSR}} />}
    }
  }

  if (isSSR || path === window.location.pathname || preload || (cache[page] && cache[page].Error)) {
    cache[page] = getComp()
  }
  
  return props => {
    const [Comp, setComp] = useState(cache[page])
    useEffect(() => {
      if ((!cache[page] && !Comp) || (Comp && Comp.Error)) {
        cache[page] = getComp()
        setComp(cache[page])
      }
    }, [page])

    return (Comp && (Comp.Error || Comp.Loaded))
      ? (Comp.Error ? <Comp.Error {...props} {...payload} /> : <Comp.Loaded {...props} {...payload} />)
      : <Loading />
  }
}

export default onDemand

export const preload = page => onDemand(page, '', true)

export const OnDemandComponent = ({component, exp, ...props}) => {
  const Component = onDemandComponent(component, props, exp)
  return <Component />
}

export const onDemandComponent = (component, payload, exp) => {
  try {
    if (exp) {
      return require('../components/' + component)[exp]
    }
    const { default: Component } = require('../components/' + component)
    return props => <Component {...props} {...payload} />
  } catch (error) {
    const { ErrorBlock } = require('../components/error')
    return props => <ErrorBlock error={error} details={{component, payload}} />
  }
}