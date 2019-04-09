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
          <title>Graze - Modern Content Management</title>
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

          <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/fi/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/fi/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/fi/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/fi/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/fi/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/fi/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/fi/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/fi/apple-touch-icon-152x152.png" />
          <link rel="icon" type="image/png" href="/fi/favicon-196x196.png" sizes="196x196" />
          <link rel="icon" type="image/png" href="/fi/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="/fi/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/fi/favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/fi/favicon-128.png" sizes="128x128" />
          <meta name="application-name" content="Graze - Modern Content Management"/>
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta name="msapplication-TileImage" content="/fi/mstile-144x144.png" />
          <meta name="msapplication-square70x70logo" content="/fi/mstile-70x70.png" />
          <meta name="msapplication-square150x150logo" content="/fi/mstile-150x150.png" />
          <meta name="msapplication-wide310x150logo" content="/fi/mstile-310x150.png" />
          <meta name="msapplication-square310x310logo" content="/fi/mstile-310x310.png" />

      </head>
      <body>
          <div id="root">${c}</div>
          ${styleTags}
          <script>window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')}</script>
          <!-- Global site tag (gtag.js) - Google Analytics -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-138092593-1"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-138092593-1');
          </script>

      </body>
  </html>`
        )
      }
    })
  })
  
export default server
