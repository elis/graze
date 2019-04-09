import App from './App'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import express from 'express'
import { renderToString } from 'react-dom/server'
import { getDataFromTree, renderToStringWithData } from 'react-apollo'
import { getClient } from './services/graphcms'
import fetch from 'node-fetch'

import { ServerStyleSheet } from 'styled-components'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const sheet = new ServerStyleSheet()
    const client = getClient({
      // ssrForceFetchDelay: 10000,
      ssrMode: true,
      fetch: fetch
    })
    const context = {}
    const Wrap = props => (
      <StaticRouter context={context} location={req.url}>
        <App client={client} />
      </StaticRouter>
    )
    

    const repo = renderToStringWithData(sheet.collectStyles(<Wrap />))
    const styleTags = sheet.getStyleTags() 
    sheet.seal()
    repo.then((c) => {
      const initialState = client.extract()
  
      if (context.url) {
        res.redirect(context.url)
      } else {
        res.status(200).send(
          `<!doctype html>
      <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>Welcome to Test/2</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${
            assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ''
          }
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
      </head>
      <body>
          <div id="root">${c}</div>
          ${styleTags}
          <script>window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')}</script>
      </body>
  </html>`
        )
      }
    })
  })
  
export default server
