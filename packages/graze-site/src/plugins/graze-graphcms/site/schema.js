export const makeQS = (types, select, pad = '', parents = []) => {
  const p = `${pad}  `
  const self = types[select]
  let str = ''
  // console.log(`😶`, 'MAKE QS', select, pad.length, parents) // { types, select, pad, parent })

  for (const [name, type] of Object.entries(self.fields)) {
    switch (type.kind) {
      case 'SCALAR':
      case 'ENUM':
        str += `${p}${name} `
        break
      case 'OBJECT':
      case 'LIST':
        if (parents.includes(type.ofType)) {
          break
        }
        str += `${p}${name} `
        str += '{\n'
        str += makeQS(types, type.ofType, p, [ ...parents, select ])
        str += `${p}}`
        break
      default:
        str += `${p}# Unknown ${name}`
    }
    str += '\n'
  }

  return str
}

export const parseTypes = types => {
  const tps = {}

  if (!types || !Object.keys(types).length) {
    throw new Error('Types are not provided')
  }

  for (const { name, fields } of types) {
    // console.log(`🐝`, `=${name}- $ `, {fields})
    const tp = {
      name
    }
    if (!fields) continue
    const flds = {}
    for (const field of fields) {
      // if (['Site', 'Page'].includes(name)) console.log(`🐝`, `=${name}-${field.name} $ ${field.type.kind}-`, field)
      // console.log(`🐝`, `=${name}-${field.name} $ ${field.type.kind}-`, field)
      if (field.type.kind === 'LIST') {
        if (field.name.match(/^graze/)) {
          const ofType = field.type.ofType.ofType.name
          flds[field.name] = {
            kind: field.type.kind,
            ofType
          }
        }
      } else if (field.type.kind === 'SCALAR') {
        flds[field.name] = {
          kind: field.type.kind,
          ofType: field.type.name
        }
      } else if (field.type.kind === 'OBJECT') {
        flds[field.name] = field.type.name
        flds[field.name] = {
          kind: field.type.kind,
          ofType: field.type.name
        }
      } else if (field.type.kind === 'NON_NULL') {
        flds[field.name] = field.type.name
        flds[field.name] = {
          required: true,
          kind: field.type.ofType.kind,
          ofType: field.type.ofType.name
        }
      }
    }

    tps[name] = { ...tp, fields: flds }
  }

  const doPass = entries => {
    for (const [name, typ] of entries) {
      if (typ.fields) {
        for (const [fieldName, field] of Object.entries(typ.fields)) {
          if (field.kind === 'LIST') {
            const ofType = tps[field.ofType]
            const ofOrigin = tps[name].fields[fieldName]
            tps[name].fields[fieldName] = { ...ofOrigin, ...ofType }
          }
          if (['OBJECT'].includes(field.kind)) {
            const ofType = tps[field.ofType]
            const ofOrigin = tps[name].fields[fieldName]
            tps[name].fields[fieldName] = { ...ofOrigin, ...ofType }
          }
        }
      }
    }
  }

  doPass(Object.entries(tps))

  return tps
}

export const modelIssues = (parsedTypes, model, options) => {
  const { requiredFields, validate } = options
  const Model = parsedTypes[model]
  if (!Model) {
    return [{
      modelName: model,
      issue: 'Missing model'
    }]
  }
  const ModelFields = Object.keys(Model.fields)
  // console.log(`📯`, 'ModelFields', {ModelFields})
  const trip = []

  for (const [fieldName, requiredType] of Object.entries(requiredFields)) {
    // console.log(`📯`, 'fieldName, requiredType', {fieldName, requiredType})
    if (ModelFields.includes(fieldName)) {
      const field = Model.fields[fieldName]
      if (field && field.ofType === requiredType) {
      } else {
        trip.push({
          fieldName,
          requiredType: requiredType,
          fieldType: field.ofType,
          issue: 'Bad type'
        })
      }

      if (validate && validate[fieldName] && typeof validate[fieldName] === 'function') {
        const invalid = validate[fieldName](field)
        if (invalid) {
          trip.push({
            fieldName,
            issue: invalid
          })
        }
      }
    } else {
      trip.push({
        fieldName,
        issue: 'Missing field'
      })
    }
  }
  // console.log(`📯`, 'Trips', {trip: trip && !!trip.length && trip})
  return trip && !!trip.length && trip
}

export const schemaIssues = parsedTypes => Object.entries(requiredSchema)
  .map(([model, options], index) => ({ model, index, issues: modelIssues(parsedTypes, model, options) }))
  .filter(({ issues }) => issues)
  .map(({ issues, model }) => ({ model, issues }))

export const requiredSchema = {
  Site: {
    validate: {
      name: field => {
        if (!field.required) return 'Field must be marked as required'
      }
    },
    requiredFields: {
      name: 'String',
      description: 'String',
      content: 'String'
      // index: 'Page',
      // grazePages: 'Page'
    }
  },
  Page: {
    requiredFields: {
      title: 'String',
      description: 'String',
      content: 'String',
      slug: 'String',
      grazeIndex: 'Site',
      grazeSites: 'Site'
      // component: 'String'
    }
  }
}
