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

export const OnDemandComponent = ({ component, exp, context, ...props }) => {
  const Component = onDemandComponent(component, props, exp, context)
  return <Component />
}

export const onDemandComponent = (component, payload, exp, context) => {
  try {
    if (exp) {
      return require('components/' + component)[exp]
    }
    const { default: Component } = require('components/' + component)

    if (payload.model) {
      if (Component.transformModel && typeof Component.transformModel === 'function') {
        const { model, ...rest } = payload
        // console.log(`🍭`, 'onDemandComponent:', `±${component}`, { model, payload, context })

        const { compileModel } = require('./utils')
        const [ compiledModel, modelType ] = (Object.keys(model).length > 0)
          ? compileModel(model, context)
          : [ { __NO_KEYS: true } ]
        // console.log(`🍭`, 'model:', model, model['__typename'], __typename, parsedTypes[__typename])
        // console.log(`🍭`, 'modelType:', modelType)
        // console.log(`🍭`, 'Compiled model:', compiledModel)

        const transformedModel = {
          ...(Component.transformModel(compiledModel || {}, modelType) || {})
        }
        return props => <Component {...props} {...rest} {...transformedModel} />
      }
    }
    return props => <Component {...props} {...payload} />
  } catch (error) {
    const { ErrorBlock } = require('components/error')
    return props => <ErrorBlock error={error} details={{ component, payload }} />
  }
}

export const OnDemandComponentModel = ({ component, context, ...props }) => {
  try {
    const { transformModel } = require('components/' + component)
    // v1
    if (typeof transformModel === 'function') {
      const model = transformModel(props.model)
      return <OnDemandComponent component={component} {...model} />
    }
  } catch (error) {
    console.log('error with transform:', error)
  }
  return <OnDemandComponent component={component} model={props.model} context={context} />
}

export const onDemandSections = (sections, context, Wrapper) => (
  sections
    .map(section => Object.entries(section))
    .map(([[comp, options]], index) => (
      Wrapper
        ? <Wrapper {...{ options, context, comp, index }} key={`page section ${index}`}>
          <OnDemandComponentModel
            model={options}
            component={comp} {...context} context={context} />
        </Wrapper>
        : <OnDemandComponentModel
          key={`page section ${index}`}
          model={options}
          component={comp} {...context} context={context} />
    ))
)
