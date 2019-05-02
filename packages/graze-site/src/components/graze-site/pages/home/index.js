import React from 'react'
import plugins from '@graze'
const { OnDemandComponent } = plugins


export default props => {
//   return (
//     <div>
//       Farse IO
//     </div>
//   )
// }

// export const defaul = props => {
  const { sections, page, site } = props
  const get = (p, o) =>
    p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)

  return (
    <div>
      {sections && !!sections.length && sections
        .map(section => Object.entries(section))
        .map(([[comp, options]], index) => (
          ([[comp, typeof options === 'string'
            ? get(options.replace(/^\$/, '').split('.'), props)
            : Object.entries(options)
              .map(([option, value]) => (
                [
                  option,
                  (typeof value === 'string' && value.match(/^\$\w+/))
                    ? get(value.replace(/^\$/, '').split('.'), props)
                    : value ]
              ))
              .reduce((o, [prop, value]) => ({ ...o, [prop]: value }), {})
          ]])
        ))
        .map(([[comp, options]], index) => (
          <OnDemandComponentModel
            key={`page section ${index}`}
            component={comp} page={page} site={site}
            model={options}
          />
        )
        )}
    </div>
  )
}

const OnDemandComponentModel = ({ component, ...props }) => {
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
