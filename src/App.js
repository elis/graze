import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import './App.css'
import { ApolloProvider } from 'react-apollo'

const App = ({client, ...props}) => (
  <ApolloProvider client={client}>
    {/* <Switch> */}
      {/* <Route exact path="/" component={Home} /> */}
      <Home />
    {/* </Switch> */}
  </ApolloProvider>
)

export default App
