import fetch from 'node-fetch'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export const {
  RAZZLE_GRAPHCMS_API: uri
} = process.env

const maFetch = options => async (uri, ...rest) => {
  try {
    const res = await fetch(uri, ...rest)
    return res
  } catch (error) {
    console.log('we got some error:', error)
    if (options.errorHandler) {
      return options.errorHandler(error)
    }
  }
  console.log('fetching', uri, rest)
  return new Promise(resolve => {
    resolve('bleh')
  })
}

export const getClient = options => new ApolloClient({
  link: new HttpLink({ uri, fetch: maFetch(options), credentials: 'same-origin' }),
  cache: new InMemoryCache().restore(
    typeof window !== 'undefined'
      ? window.__APOLLO_STATE__
      : {}
  ),
  ssrMode: typeof window === 'undefined',
  ...options
})
