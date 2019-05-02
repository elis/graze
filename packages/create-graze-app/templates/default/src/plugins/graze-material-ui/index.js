import React, { useEffect } from 'react'

export const server = {
  version: 0.1,
  onRequest: (req, res, options) => {
    const { SheetsRegistry } = require('jss')
    const {
      createMuiTheme,
      createGenerateClassName
    } = require('@material-ui/core/styles')
    const green = require('@material-ui/core/colors/green').default
    const red = require('@material-ui/core/colors/red').default

    const sheetsRegistry = new SheetsRegistry()
    const sheetsManager = new Map()
    const theme = createMuiTheme({
      palette: {
        primary: green,
        accent: red,
        type: 'light'
      },
      typography: {
        useNextVariants: true
      }
    })
    const generateClassName = createGenerateClassName()

    return {
      sheetsRegistry,
      generateClassName,
      theme,
      sheetsManager
    }
  },
  Wrapper: ({
    fields: {
      sheetsRegistry,
      generateClassName,
      theme,
      sheetsManager
    },
    args,
    children
  }) => {
    const JssProvider = require('react-jss/lib/JssProvider').default
    const {
      MuiThemeProvider
    } = require('@material-ui/core/styles')
    return (
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          {children}
        </MuiThemeProvider>
      </JssProvider>
    )
  },
  output: ({ fields: { sheetsRegistry } }) => {
    const css = sheetsRegistry.toString()
    return `<style id="jss-server-side">${css}</style>`
  }
}

export const client = {
  onLoad: (options) => {
    const {
      createMuiTheme,
      createGenerateClassName
    } = require('@material-ui/core/styles')
    const orange = require('@material-ui/core/colors/orange').default
    const red = require('@material-ui/core/colors/red').default

    const theme = createMuiTheme({
      typography: {
        useNextVariants: true
      },
      palette: {
        primary: orange,
        accent: red,
        type: 'light'
      }
    })

    const generateClassName = createGenerateClassName()
    return {
      theme,
      generateClassName
    }
  },
  Wrapper: ({ fields: { generateClassName, theme }, ...props }) => {
    const JssProvider = require('react-jss/lib/JssProvider').default
    const {
      MuiThemeProvider
    } = require('@material-ui/core/styles')

    useEffect(() => {
      const jssStyles = document.getElementById('jss-server-side')
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles)
      }
    }, [])

    return (
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          {props.children}
        </MuiThemeProvider>
      </JssProvider>
    )
  }
}
