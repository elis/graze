import React from 'react'

export const server = {
  onRequest: (req, res, options) => {
    const { ServerStyleSheet } = require('styled-components')

    const sheet = new ServerStyleSheet()
    return {
      sheet
    }
  },
  wrapper: (wrapped, { fields: { sheet } }) => {
    return sheet.collectStyles(wrapped)
  },
  output: ({ fields: { sheet } }) => {
    const styleTags = sheet.getStyleTags()
    return [styleTags]
    // Styled tags are priority so that we don't see
    // jumping elemets during initial render
  },
  Wrapper: ({ children, ...props }) => {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    )
  }
}
