import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { createGlobalStyle } from 'styled-components'

import Site from './site'

const Styles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`

const App = ({client, ...props}) => (
  <ApolloProvider client={client}>
    <React.Fragment>
      <ScrollToTopControlller />
      <Styles />
      <Site />
    </React.Fragment>
  </ApolloProvider>
);

export default App
export const ScrollToTopControlller = withRouter(({location, history, ...props}) => {
  const  { pathname, search } = location
  const { action } = history
  const isSSR = typeof window === 'undefined'
  useEffect(() => {
    if (!isSSR && (
      action === 'PUSH' ||
      action === 'REPLACE'
      )) {
      try {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      } catch (error) {
        // just a fallback for older browsers
        window.scrollTo(0, 0)
      }
    }
  }, [pathname, search])
  return null
})
