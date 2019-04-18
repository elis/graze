import React from 'react'
import { Switch, Route, } from 'react-router-dom'

export default props => {
  const Page = require('../../page').default
  const { Setup, Welcome } = require('./setup')
  const { url } = props.match

  return (
    <Page>
      <div className='mw9 center'>
        <Switch>

          {/* Graze Setup */}
          <Route path={url} exact render={routeProps => <Welcome {...routeProps} data={props.data} />} />
          <Route path={`${url}/step-:step?`} render={routeProps => <Setup {...routeProps} data={props.data} />} />

          {/* Advanced */}
          <Route path={`${url}/:section`}>
            {routeProps => {
              const section = `${routeProps.match.params.section}`.replace(/[^a-z-]?/g, '')
              try {
                const { default: Comp } = require('./sections/' + section)
                return <Comp {...routeProps} data={props.data} />
              } catch (error) {
                const { ErrorBlock } = require('../../error')
                return <ErrorBlock error={error} details={{section, url}} />
              }
            }}
          </Route>
        </Switch>
      </div>
    </Page>
  )
}




