import fetch from 'node-fetch'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const {
  RAZZLE_GRAPHCMS_API: uri
} = process.env

export const getClient = options => new ApolloClient({
  link: new HttpLink({ uri, fetch, credentials: 'same-origin' }),
  cache: new InMemoryCache().restore(typeof window !== 'undefined' ? window.__APOLLO_STATE__ : {}),
  // ssrForceFetchDelay: 100,
  ssrMode: typeof window === 'undefined',
  ...options
})
