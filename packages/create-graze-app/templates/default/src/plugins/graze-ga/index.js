import React, { createContext, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'

export const server = {
  onRequest: (options) => {
    return {
      options
    }
  },
  output: ({ options: { trackingId } }) => {
    return `
    <script async src='https://www.googletagmanager.com/gtag/js?id=${trackingId}'></script>
    <script>
      window.dataLayer = window.dataLayer || []
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date())
      
      gtag('config', '${trackingId}')
    </script>`
  }
}

const Context = createContext({ pimplim: 'plom' })
export const app = {
  onLoad: (options) => {
    const ReactGA = require('react-ga')

    ReactGA.initialize(options)
    return {
      ReactGA,
      Context
    }
  },
  Wrapper: ({ fields: { ReactGA, Context }, children, ...props }) => {
    return <Context.Provider value={{ ReactGA }}>
      <React.Fragment>
        <StatsReporting options={{ ReactGA }} />
        {children}
      </React.Fragment>
    </Context.Provider>
  },
  expose: () => {
    return {
      GAContext: Context,
      useGA
    }
  },
  Addon: () => {
    return (
      <div>Addon of Graze GraphCMS</div>
    )
  }
}

export const useGA = () => useContext(Context)

export const StatsReporting = withRouter(({ location, options: { ReactGA } }) => {
  const { pathname, search } = location

  useEffect(() => {
    ReactGA.pageview(`${pathname}${search}`)
  }, [pathname, search])

  useEffect(() => {
    ReactGA.event({
      category: 'Graze Application',
      action: 'Loaded'
    })
  }, [])
  return null
})
