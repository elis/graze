import React, { useMemo } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export { SiteContext, useSite, defineStaticRoute } from './routing'

const SiteBuild = props => {
  const { Redirect, Switch, Route } = require('react-router-dom')
  const { makeQS, parseTypes, schemaIssues } = require('./schema')
  const { types } = props.data['__schema'] || {}
  const { default: Routing } = require('./routing')

  // console.log(`🍝`, 'SITE BUILD', { types, parseTypes, props })
  const parsedTypes = parseTypes(types)
  const issues = schemaIssues(parsedTypes)
  if (issues && issues.length) {
    console.log('SCHEME ISSUES')
    console.log('issues:', { issues, parsedTypes })
  }

  if (issues && issues.length) {
    const { default: ErrorMsg } = require('components/error')

    return <ErrorMsg error={{
      code: 'Bad Schema Definition',
      message: 'Site schema could not be parsed - see console for details'
    }} />
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
    <Query query={pageQuery} errorPolicy={'all'} onError={(error) => {
      console.error('Error with Query:', error)
    }}>
      {({ loading, error, data }) => {
        if (error && error.message === 'GraphQL error: Not Authorized!') {
          console.log(`🍝`, `⚠️️️️️️️️️️`, `⚠️️️️️️️️️️`, `⚠️️️️️️️️️️`, 'GRAPHCMS NOT AUTHORIZED', `⚠️️️️️️️️️️`, `⚠️️️️️️️️️️`, `⚠️️️️️️️️️️`)
          return (
            <Switch>
              <Route path='/error/:errorCode?' render={(props) => {
                const ErrorMsg = require('./error').default

                return <ErrorMsg error={{
                  code: props.match.params.errorCode,
                  message: 'GraphQL error: Not Authorized!'
                }} />
              }} />
              <Route path='/' render={props => (
                <Redirect push to={`/error/${require('./error/error-codes').GRAPHCMS_NOT_AUTHORIZED}`} />
              )} />
            </Switch>
          )
        }
        if (!data || !data.site) {
          return (
            <Switch>
              <Route path='/error/:errorCode?' render={(props) => {
                const ErrorMsg = require('./error').default

                return <ErrorMsg error={{ ...error, code: props.match.params.errorCode }} />
              }} />
              <Route path='/' render={props => (
                <Redirect push to={`/error/${require('./error/error-codes').MISSING_SITE_CONTENT}`} />
              )} />
            </Switch>
          )
        }
        return <Routing data={{ site: data && data.site, error }}>{props.children}</Routing>
      }}
    </Query>
  )
}

export default props => {
  return (
    <Query query={require('./queries/types-schema').default} onError={(error) => {
      console.error('Error with Query:', error)
    }} errorPolicy='all'>
      {({ loading, error, data }) => {
        return <SiteBuild {...{ loading, error, data }}>{props.children}</SiteBuild>
      }}
    </Query>
  )
}
