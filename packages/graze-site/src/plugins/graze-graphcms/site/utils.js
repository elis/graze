
const get = (p, o) =>
  p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)

// Array folding
// https://dev.to/mebble/learn-to-fold-your-js-arrays-2o8p
export const fold = (reducer, init, xs) => {
  let acc = init
  for (const x of xs) {
    acc = reducer(acc, x)
  }
  return acc
}

const cache = {}

export const compileModel = (baseModel, baseContext, parsedTypes, depth) => {
  const types = parsedTypes || cache.types ||
    ((() => {
      const { useSite } = require('./routing')
      const { state: site } = (useSite && useSite()) || {}
      const { parsedTypes } = site || {}
      // console.log(`🍭`, 'parsedTypes:', parsedTypes)

      return parsedTypes || {}
    })())

  if (!cache.types || !Object.keys(cache.types).length) {
    cache.types = types
  }

  const { __typename } = baseModel
  const modelType = __typename && types[__typename]
  console.groupCollapsed(`🍱 Compile Model "${__typename}"`)

  const context = {
    ...baseContext,
    model: { ...baseModel },
    modelType
  }
  console.log(`🐛`, 'Compiling type X:', { __typename, context: { ...context }, baseModel, modelType })

  const compiledType = __typename && compileType(context.model, context)
  Object.assign(context, { model: { ...context.model, ...(compiledType || {}) } })
  console.log(`🐛`, 'Compiled type:', compiledType)

  // Strings are compiled on first-class basis to support top-level
  // markdown fields with front-matter
  const strings = modelType && modelType.fields && pluckFields(modelType.fields, { kind: 'SCALAR', ofType: 'String' })
  const stringFields = strings && getFields(context.model, strings)

  const compiledStrings = (stringFields && compileMarkdowns(stringFields, context)) || {}
  console.log(`🐛`, 'compiledStrings:', compiledStrings, { stringFields, strings })

  const compiledProperties = compileProperties({
    ...context.model,
    ...compiledStrings
  }, {
    ...context,
    model: {
      ...context.model,
      ...compiledStrings
    }
  }, depth)
  console.log(`🐛`, 'compiledProperties:', compiledProperties)

  const compiledModel = {
    ...context.model,
    ...compiledProperties,
    ...(compiledProperties.content && compiledProperties.content.data)
      ? { attributes: { ...compiledProperties.content.data } }
      : {}
  }
  console.log(`🐛`, 'Compiled model:', compiledModel)
  console.groupEnd()

  return [compiledModel, modelType]
}

const handleTypes = {
  Copy: (model, context) =>
    // console.log(`🐛⛔️`, 'handleType Copy:', { model, context }) ||
    model,
  Page: (model, context) =>
    // console.log(`🐛⛔️`, 'handleType Page:', { model, context }) ||
    // console.log(`🐛⛔️`, 'Plucking:', {
    //   result: makeStringCopies(model, context),
    //   copies: transformPageCopies(model, context),
    //   arts: transformPageArts(model, context)
    // }) ||
    foldPageType(model, context) ||
    transformPageCopies(model, context),
  Site: (model, context) =>
    // console.log(`🐛⛔️`, 'handleType Site:', { model, context }) ||
    model
}

const foldPageType = (model, context) =>
  fold(pageFoldingReducer(context), model, [
    transformPageArts,
    transformPageCopies
  ])
const pageFoldingReducer = context => (acc, fn) =>
  ({
    ...acc,
    ...(fn(acc, context) || {})
  })

const transformPageCopies = (model, context) =>
  fold(pageTypeReducer(nameCopyThings, context), model, Object.entries(makeStringCopies(model, context)))

const transformPageArts = (model, context) =>
  fold(pageTypeReducer(nameArtThings, context), model, Object.entries(makeAssetArts(model, context)))

const pageTypeReducer = (fn, context) => (acc, [name, value]) =>
  // console.log(`🐛⛔️`, 'pageTypeReducer:', { name, value, acc, context }) ||
  // console.log(`🐛⛔️`, 'pageTypeReducer nameCopyThings:', nameCopyThings(value)) ||
  ({
    ...acc,
    [name]: fn(value)
  })

const nameArtThings = value =>
  // console.log(`🐛⛔️`, 'nameCopyThings:', { value }) ||
  value instanceof Array
    ? fold(nameArtReducer, {}, value)
    : value

const nameArtReducer = (acc, art) => ({
  ...acc,
  ...((art && art.handle)
    ? { [art.handle]: art }
    : {}
  ),
  ...((art && art.identifier)
    ? { [art.identifier]: art }
    : {}
  )
})
const nameCopyThings = value =>
  // console.log(`🐛⛔️`, 'nameCopyThings:', { value }) ||
  value instanceof Array
    ? fold(nameCopyReducer, {}, value)
    : value

const nameCopyReducer = (acc, copy) => ({
  ...acc,
  ...((copy && copy.identifier)
    ? { [copy.identifier]: copy }
    : {}
  )
})

const makeStringCopies = (model, context) =>
  getFields(model, pluckFields(context.modelType.fields, { ofType: 'Copy' }))
const makeAssetArts = (model, context) =>
  getFields(model, pluckFields(context.modelType.fields, { ofType: 'Asset' }))

const compileType = (model, context) =>
  typeCompiler(model, model['__typename'], context)
// fold(typeCompileReducer(model['__typename'], context), model, Object.entries(model))

const typeCompiler = (model, typename, context) =>
  handleTypes[typename] && typeof handleTypes[typename] === 'function'
    ? handleTypes[typename](model, context)
    : model

const typeCompileReducer = (typname, context) => (acc, [name, value]) =>
  // console.log(`🐛`, 'typeCompileReducer:', `—${name}=`, `@${typname}`, { acc, name, value }) ||
  handleTypes[typename] && typeof handleTypes[typename] === 'function'
    ? handleTypes[typename](value, context)
    : value
// { ...acc, [name]: value }

const compileMarkdowns = (properties, context) =>
  fold(markdownCompileReducer(context), properties, Object.entries(properties))

const markdownCompileReducer = context => (acc, [name, value]) => (
  (value && value.length > 0 && typeof value === 'string')
    ? {
      ...acc,
      [name]: compileMarkdown(value, context, context && context.modelType && context.modelType.fields[name])
    }
    : {
      ...acc,
      ...value
        ? { [name]: value.data ? compileMarkdown(value, context) : compileProperties(value, context) }
        : { [name]: value }
    }
)


const compileMarkdown = (input, context, field) => {
  const isString = typeof input === 'string'
  const hasContent = input && typeof input.content === 'string'
  const hasData = input && Object.keys(input.data || {}).length

  console.log(`📜`, 'Markdown Compiler', input)

  const text = isString
    ? input
    : typeof input.content === 'string'
      ? input.content
      : ''
  const gm = require('gray-matter')
  const compiled = gm(text)
  const result = hasData
    ? {
      ...compiled,
      data: {
        ...input.data,
        ...compiled.data
      }
    }
    : { ...compiled }
  console.log(`📜`, 'result', result, { hasData, compiled, text, input })

  if (result && result.content) {
    if (Object.entries(result.data).length || result.excerpt) {
      const ctx = {
        ...context,
        self: result.data || {}
      }
      const compiled = {
        data: compileProperties(result.data, ctx),
        content: compileInput(result.content, ctx),
        excerpt: compileInput(result.excerpt, ctx)
      }
      return compiled
    }

    return compileInput(result.content, context)
  }
  return compileInput(input, context)
}

export const compileProperties = (propr, context, depth = 0) =>
  console.log(`🍦`, 'COMPILE PROPERTIES', { propr, context, depth }) ||
  (
    (propr instanceof Array && propr.length) ||
    (!(propr instanceof Array) && Object.keys(propr).length)
  )
    ? fold(
      compilePropertyReducer(context, context.modelType, depth),
      propr instanceof Array ? [] : {},
      Object.entries(propr)
    )
    : propr

const compilePropertyReducer = (context, type, depth) => (acc, [name, value]) =>
  (((result) => (
    acc instanceof Array
      ? [...acc, result]
      : { ...acc, [name]: result }
  ))(value && (typeof value === 'string'
    ? compileMarkdown(value, context, type && type.fields && type.fields[name]) || value // `COMPILED: {{{${value}}}}`
    : (depth < 3)
      ? value['__typename']
        ? compileModel(value, context, null, depth + 1)[0]
        : compileProperties(value, context, depth + 1)
      : value
  )))

const compileString = (input, context) => (
  compileInput(input, context)
)
const compileInput = (input, context) =>
  fold(valueCompileReducer(context), input, (input || '').match(/\${.*}/g) || [])

const valueCompileReducer = context => (acc, string) =>
  replaceWithContext(acc, string, context)

const replaceWithContext = (input, search, context) =>
  input === search
    ? (
      get(((search.match(/^\${(.*)}$/) || [])[1] || '').split('.'), context)
      || search
    )
    : input
      .replace(new RegExp(`\\${search}`, 'gm'), ((([, path]) =>
        get(path.split('.'), context) ||
        search)(search.match(/^\${(.*)}$/) || [])))

const fieldFindReducer = inputs => (acc, [fieldName]) => {
  return { ...acc, [fieldName]: inputs[fieldName] }
}
const getFields = (inputs, fields) => fold(fieldFindReducer(inputs), {}, Object.entries(fields))

const pluckPropertiesReducer = (prop, value) => (acc, [fieldName, field]) => (
  (field && field[prop] && field[prop] === value)
    ? { ...acc, [fieldName]: field }
    : acc
)

const pluckFields = (fields, pluckRules) =>
  fold(fieldsPluckReducer, fields, Object.entries(pluckRules))

const fieldsPluckReducer = (acc, [prop, value]) =>
  fold(pluckPropertiesReducer(prop, value), {}, Object.entries(acc))
