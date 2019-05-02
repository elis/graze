import React from 'react'
import { StaticRouter } from 'react-router-dom'
import express from 'express'
import plugins from './plugins'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const App = require('./app').default
    const context = {}

    const results = plugins.doOnRequest(req, res)

    const BaseApp = appProps => (
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    )

    const { Wrapped, wrapper, output: getStatics } = results.wrap(BaseApp)

    const wrapped = ((wrappi) => wrappi instanceof Promise
      ? wrappi
      : new Promise(resolve => {
        const { renderToString } = require('react-dom/server')
        try {
          resolve(renderToString(wrappi))
        } catch (error) {
          const ErrorMsg = require('components/error')
          console.error('Problem with rendering to string:', error)
          resolve(`<div>Error rendering: ${error} <pre>${error.stack}</pre></div>`)
        }
      }))(wrapper(<Wrapped />))

    wrapped
      .then(markup => {
        if (context.url) {
          res.redirect(context.url)
        } else {
          const [earlyStatics, lateStatics] = getStatics()

          res.status(200).send(
            `<!doctype html>
<html lang="">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${(
    assets.client.css
      ? `<link rel="stylesheet" href="${assets.client.css}">`
      : ''
  )}
    ${(
    process.env.NODE_ENV === 'production'
      ? `<script src="${assets.client.js}" defer></script>`
      : `<script src="${assets.client.js}" defer crossorigin></script>`
  )}
    ${earlyStatics || ''}
  </head>
  <body>
    <div id="root">${markup}</div>
    ${lateStatics || ''}
  </body>
</html>`
          )
        }
      })
  })

export default server
