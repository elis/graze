import React from 'react'
import { StaticRouter } from 'react-router-dom'
import express from 'express'
import { getClient } from './services/graphcms'
import { renderToStringWithData } from 'react-apollo'
import axios from 'axios'
import { ServerStyleSheet } from 'styled-components'
import { Helmet } from 'react-helmet'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const App = require('./App').default
    const context = {}
    const sheet = new ServerStyleSheet()

    // Create Apollo client for the request
    const client = getClient({
      ssrMode: true,
      fetch: axios
    })

    if (context.url) {
      res.redirect(context.url)
    } else {
      renderToStringWithData(sheet.collectStyles(
        <StaticRouter context={context} location={req.url}>
          <App client={client} />
        </StaticRouter>
      ))
        .then(markup => {
            const initialState = client.extract()
            const styleTags = sheet.getStyleTags()
            const helmet = Helmet.renderStatic()

            res.status(200).send(
              `<!doctype html>
<html lang="">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charset="utf-8" />
    ${helmet.title.toString() || 'Welcome to Graze'}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
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
    <div id="root">${markup}</div>
    <script>window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')}</script>
    ${styleTags}
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <!-- Replace GA tag with your own - this one tracks graze installs -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-138092593-2"></script>
    <script>
      window.dataLayer = window.dataLayer || []
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date())
      
      gtag('config', 'UA-138092593-2')
    </script>
  </body>
</html>`
        )
      }) 
    }
  })
  
export default server
