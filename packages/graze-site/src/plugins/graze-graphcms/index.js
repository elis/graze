import React from 'react'
const name = 'graze-graphcms'

export const server = {
  name,
  onRequest: () => {
    const { getClient } = require('./graphcms')
    const axios = require('axios')

    const apolloClient = getClient({
      ssrMode: true,
      fetch: axios,
      errorHandler: (...args) => {
        console.log('we got error friends.', args)
        return new Promise(resolve => {
          resolve('Errorrring')
        })
      }
    })

    return {
      apolloClient
    }
  },
  wrapper: (wrapped) => {
    const { renderToStringWithData } = require('react-apollo')
    return renderToStringWithData(wrapped)
  },
  Wrapper: ({ fields: { apolloClient }, children, ...props }) => {
    const { ApolloProvider } = require('react-apollo')
    return (
      <ApolloProvider client={apolloClient}>
        {children}
      </ApolloProvider>
    )
  },
  output: ({ fields: { apolloClient } }) => {
    const initialState = apolloClient.extract()
    return `<script>
      window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')}
    </script>`
  }
}

export const client = {
  name,
  onLoad: () => {
    const { getClient } = require('./graphcms')
    const apolloClient = getClient()
    return {
      apolloClient
    }
  },
  Wrapper: ({ fields: { apolloClient }, children }) => {
    const { ApolloProvider } = require('react-apollo')

    return (
      <ApolloProvider client={apolloClient}>
        {children}
      </ApolloProvider>
    )
  },
  expose: () => ({
    useSite: require('./site').useSite,
    defineStaticRoute: require('./site').defineStaticRoute
  })
}

export const app = {
  name,
  onLoad: () => {
    const { SiteContext, defineStaticRoute } = require('./site')
    return {
      SiteContext,
      defineStaticRoute
    }
  },
  Wrapper: ({ children }) => {
    const Site = require('./site').default
    return (
      <Site>{children}</Site>
    )
  },
  expose: () => ({
    useSite: require('./site').useSite,
    defineStaticRoute: require('./site').defineStaticRoute,
    
    onDemand: require('./site/on-demand').onDemand,
    preload: require('./site/on-demand').preload,
    OnDemandComponent: require('./site/on-demand').OnDemandComponent,
    onDemandComponent: require('./site/on-demand').onDemandComponent,
    OnDemandComponentModel: require('./site/on-demand').OnDemandComponentModel,
    onDemandSections: require('./site/on-demand').onDemandSections,

    compileProperties: require('./site/utils').compileProperties,
    compileModel: require('./site/utils').compileModel
  })
}
