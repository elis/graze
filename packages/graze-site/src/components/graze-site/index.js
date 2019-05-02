import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import plugins from '@graze'
const { onDemandComponent } = plugins

export default withRouter(props => {
  const { url } = props.match
  return (
    <Switch>
      <Route path={`${url}`} exact component={onDemandPage('home', props)} />
      <Route path={`${url}/:section`} exact component={onDemandPage('other', props)} />
    </Switch>
  )
})

const onDemandPage = (page, payload) =>
  onDemandComponent('graze-site/pages/' + page, payload)