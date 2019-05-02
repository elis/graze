import React, { useMemo } from 'react'
import Loading from 'components/loading'
import ErrorMsg from 'components/error'

const isSSR = typeof window === 'undefined'
const cache = {}

export const onDemand = (page, path, preload, payload) => {
  const getComp = () => {
    try {
      const getPage = () => {
        if (typeof page === 'function') {
          return page
        }
        const pageToLoad = (payload && payload.page && payload.page.component)
          || page
          || 'index'

        try {
          return require('pages/' + pageToLoad)
        } catch (error) {
          return require('pages/index/index')
        }
      }
      const module = getPage()

      // Helps debugging
      if (!module.default && typeof page !== 'function') {
        throw new Error('Module was empty - Module build failed?')
      }

      return { Loaded: typeof page !== 'function'
        ? module.default
        : module }
    } catch (error) {
      if (error && error.code === 'MODULE_NOT_FOUND') {
        console.error('Module not found:', error)
        return { Error: props => <ErrorMsg error={{
          ...error,
          message: `Module "src/pages/${page}" not found`
        }} details={{ page, path, isSSR }} /> }
      }
      return { Error: props => <ErrorMsg error={error} details={{ page, path, isSSR }} /> }
    }
  }

  if (isSSR || path === window.location.pathname || preload || (cache[page] && cache[page].Error)) {
    cache[page] = getComp()
  }

  return props => {
    const Comp = useMemo(() => {
      const Temp = getComp()

      return (Temp && (Temp.Error || Temp.Loaded))
        ? (Temp.Error ? <Temp.Error {...props} {...payload} /> : <Temp.Loaded {...props} {...payload} />)
        : <Loading />
    }, [page])

    return Comp
  }
}

export const preload = page => onDemand(page, '', true)

export const OnDemandComponent = ({ component, exp, ...props }) => {
  const Component = onDemandComponent(component, props, exp)
  return <Component />
}

export const onDemandComponent = (component, payload, exp) => {
  try {
    if (exp) {
      return require('components/' + component)[exp]
    }
    const { default: Component } = require('components/' + component)
    return props => <Component {...props} {...payload} />
  } catch (error) {
    const { ErrorBlock } = require('components/error')
    return props => <ErrorBlock error={error} details={{ component, payload }} />
  }
}

export const OnDemandComponentModel = ({ component, ...props }) => {
  try {
    const { transformModel } = require('components/' + component)
    if (typeof transformModel === 'function') {
      const model = transformModel(props.model)
      return <OnDemandComponent component={component} {...model} />
    }
  } catch (error) {
    console.log('error with transform:', error)
  }
  return <OnDemandComponent component={component} {...props.model} />
}

export const onDemandSections = (sections, context) => (
  sections
    .map(section => Object.entries(section))
    .map(([[comp, options]], index) => (
      <OnDemandComponentModel
        key={`page section ${index}`}
        model={options}
        component={comp} {...context} />
    ))
)
