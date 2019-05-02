import React from 'react'

const getCofig = () => {
  try {
    return require('../graze.config')
  } catch (err) {
    console.error(`🚨〈 Graze Error —`, 'No "graze.config.js" found')
    return {}
  }
}

const config = getCofig()

// Fold plugins
const getPlugins = xs => fold(formatPlugins, [], xs)

// Array folding
// https://dev.to/mebble/learn-to-fold-your-js-arrays-2o8p
const fold = (reducer, init, xs) => {
  let acc = init
  for (const x of xs) {
    acc = reducer(acc, x)
  }
  return acc
}

// Plugin folder reducer
const formatPlugins = (acc, plugin) => ([ ...acc, plukPlugin(plugin) ])

const plukPlugin = plugin => {
  if (plugin.module) {
    const { module, ...options } = plugin
    return [module, options]
  }
  return [plugin, {}]
}

const plugins = getPlugins(config.plugins || [])

// Select plugins
const getPlugin = (part, what, args) => (
  fold(formatPlugin(part, what, args), [], getPluginPart(part))
)

// Plugin selector reducer
const formatPlugin = (part, what, args) => (acc, [value, options, root]) => (
  value && value[what]
    ? [...acc, {
      [what]: value[what],
      [part]: value,
      options,
      root,
      args
    }]
    : acc
)

// Fold plugins parts
const getPluginPart = part => fold(formatPluginsParts(part), [], plugins)

// Plugin parts reducer
const formatPluginsParts = (...parts) => (acc, [plugin, options]) => (
  [...fold(formatPluginPart(plugin, options), acc, parts)]
)

// Plugin part plucker reducer
const formatPluginPart = (plugin, options) => (acc, part) =>
  plugin && plugin[part]
    ? [...acc, [plugin[part], options, plugin]]
    : acc

// Fold plugins actionvation
const activatePlugin = (part, what, args) =>
  fold(onPlugin(what), [], getPlugin(part, what, args))

// Plugin activation reducer
const onPlugin = (what) => (acc, Plugin) => (
  [ ...acc, {
    ...Plugin,
    fields: Plugin[what](Plugin.options)
  }]
)

// Fold plugins `expose`
const exposedPlugins = () => fold(onExpose, {}, getPlugin('app', 'expose'))

// Plugin `expose` reducer
const onExpose = (acc, Plugin) => ({
  ...acc,
  ...((Plugin.expose && Plugin.expose(Plugin)) || {})
})

// Fold plugins `Wrapper`s
const getWrappers = (part, what, results, Wrapped) =>
  fold(prepareWrappers(part, what), {
    wrapper: wrapped => wrapped,
    Wrapped
  }, results)

// Plugin `Wrapper` reducer
const prepareWrappers = (part, what) => ({ Wrapped }, Plugin) => {
  const Wrapper = Plugin[part][what]
  return ({
    Wrapped: Wrapper
      ? wrapperProps => (
        <Wrapper {...Plugin}><Wrapped /></Wrapper>
      )
      : Wrapped
  })
}

// Server-side activation
// Executed server-side
export const doOnRequest = (req, res) => {
  const results = activatePlugin('server', 'onRequest', [ req, res ])
  return {
    results,
    wrap: Wrapped => {
      const wrapResults = getServerWrappers(results, Wrapped)
      return { ...wrapResults }
    }
  }
}

// Fold server plugins `Wrapper`s, `wrapper`s, and `output`s
const getServerWrappers = (results, Wrapped) => fold(prepareServerWrappers, {
  wrapper: wrapped => wrapped,
  output: () => '',
  Wrapped
}, results)

// Server wrapper reducer
const prepareServerWrappers = ({ Wrapped, wrapper, output }, Plugin) => ({
  Wrapped: (
    Plugin.server.Wrapper
      ? wrapperProps => (
        <Plugin.server.Wrapper {...Plugin}><Wrapped /></Plugin.server.Wrapper>
      )
      : Wrapped
  ),
  wrapper: (
    Plugin.server.wrapper
      ? (wrapped) => Plugin.server.wrapper(wrapper(wrapped), Plugin)
      : wrapper
  ),
  output: (
    Plugin.server.output
      ? () => {
        const pluginResult = Plugin.server.output(Plugin)
        const prevResult = output()

        const [early, late] = pluginResult instanceof Array
          ? [pluginResult[0] || '', pluginResult[1] || '']
          : ['', pluginResult]

        const [pearly, plate] = prevResult instanceof Array
          ? [prevResult[0] || '', prevResult[1] || '']
          : ['', prevResult]

        const [learly, llate] = [
          [pearly, early].filter(x => x).join('\n'),
          [plate, late].filter(x => x).join('\n')
        ]

        return [learly, llate]
      }
      : output
  )
})

// Wrap top-level client component with plugins client `Wrapper`s
// Executed client-side exclusively
const wrap = Wrapped => {
  const results = activatePlugin('client', 'onLoad')
  const { Wrapped: Wrapper } = getWrappers('client', 'Wrapper', results, Wrapped)
  return Wrapper
}

// Wrap top-level app component with plugins app `Wrapper`s
// Executed client- and server-side
export const app = App => {
  const results = activatePlugin('app', 'onLoad')

  const { Wrapped: Wrapper } = getWrappers('app', 'Wrapper', results, App)
  return Wrapper
}

// Generate plugins `Addon`s
// Executed client- and server-side
export const Addons = props => {
  const results = activatePlugin('app', 'onRender')

  const outputs = getAppAddons(results)
  if (outputs && outputs.length) {
    const addons = outputs.map((Addon, index) => (
      <Addon {...props} key={`graze addon #${index}`} />
    ))
    return addons
  }

  const { default: Index } = require('./pages/index')

  return [<Index key='default page' />]
}

// Fold plugins app `Addon`s
const getAppAddons = (results) => fold(prepareAppAddons, [], results)

// Plugin `Addon` reducer
const prepareAppAddons = (acc, Plugin) => (
  Plugin.app.Addon
    ? [ ...acc, Plugin.app.Addon ]
    : acc
)

// Plugin `expose` reducer
const onMiddleware = (req, res, next) => (acc, Plugin) => (
  acc || (Plugin.middleware && Plugin.middleware(req, res, next))
)
const getMiddlewares = (req, res, next) =>
  fold(onMiddleware(req, res, next), false, getPlugin('server', 'middleware'))

export const middleware = (req, res, next) => {
  let activated
  const doNext = () => {
    if (!activated) {
      activated = true
      next()
    }
  }
  const middlewares = getMiddlewares(req, res, doNext)
  if (!middlewares) doNext()
}

export default {
  doOnRequest,
  wrap,
  app,
  exposed: exposedPlugins(),
  Addons,
  middleware
}
