
const get = (p, o) =>
  p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)

export const compileAttributes = (attrs, context) =>
  (attrs && Object.entries(attrs)
    .map(([comp, value], index) => (
      ([comp, typeof value === 'string'
        ? (value.match(/\$[a-z]+/i)
          ? get(value.replace(/^\$/, '').split('.'), context)
          : value
        )
        : (
          value instanceof Array
            ? (value.map(el => (
              (typeof el === 'string' && el.match(/\$[a-z]+/i))
                ? get(el.replace(/^\$/, '').split('.'), context)
                : (typeof el === 'object'
                  ? compileAttributes(el, context)
                  : el
                )
            )
            ))
            : (typeof value === 'object'
              ? compileAttributes(value, context)
              : value
            )
        )
      ])
    ))
    .reduce((o, [prop, v]) => ({ ...o, [prop]: v }), {})
  )
