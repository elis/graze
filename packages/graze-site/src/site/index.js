import React, { useMemo } from 'react'
import { graphql, Query } from 'react-apollo'
import gql from 'graphql-tag'

export { SiteContext } from './routing'

const SiteBuild = props => {
  const { makeQS, parseTypes, schemaIssues } = require('./schema')
  const { types } = props.data['__schema'] || {}
  const { default: Routing } = require('./routing')

  const parsedTypes = parseTypes(types)
  const issues = schemaIssues(parsedTypes)
  if (issues && issues.length) {
    console.log('SCHEME ISSUES')
    console.log('issues:', { issues, parsedTypes })
  }

  if (issues && issues.length) {
    const { default: Tutorial } = require('../components/graze-tutorial')
    return <Tutorial types={types} issues={issues} {...props} />
  }

  const pageQuery = useMemo(() => {
    const parsedTypes = parseTypes(types)
    // console.log(`🍝`, 'parsedTypes:', parsedTypes)
    const QS = makeQS(parsedTypes, 'Site', '  ')
    const queryString = `{
      site (where: {name: "root"}) {
        ${QS}
      }
    }`
    return gql`${queryString}`
  }, [types])

  return (
    <Query query={pageQuery} errorPolicy={'all'}>
      {({ loading, error, data }) => <Routing data={{ site: data && data.site, error }} />}
    </Query>
  )
}

const typesSchema = gql`
{
  __schema {
    types {
      name
      kind
      description
      fields {
        name
        description
        type {
          name
          kind
          ofType {
            name
            kind
            ofType {
              name
            }
          }
        }
      }
    }
  }
}
`

export default graphql(typesSchema, {
  options: { errorPolicy: 'all' }
})(SiteBuild)

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
            ? value
            : (typeof value === 'object'
              ? Object.entries(value)
                .map(([option, v]) => (
                  [
                    option,
                    (typeof v === 'string' && value.match(/^\$\w+/))
                      ? get(v.replace(/^\$/, '').split('.'), context)
                      : v ]
                ))
              : value
            )
        )
      ])
    ))
    .reduce((o, [prop, v]) => ({ ...o, [prop]: v }), {})
  )
