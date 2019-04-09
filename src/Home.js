import React from 'react'
import styled from 'styled-components'
import logo from './react.svg'
import './Home.css'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Home = props => {
  const { data: { sites, loading, error, ...data } } = props
  return (
    <div className="Home">
      <div className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <h2>Welcome to Test 9</h2>
      </div>
      <p className="Home-intro">
        To get started, edit <code>src/App.js</code> or{' '}
        <code>src/Home.js</code> and save to reload.
      </p>
      {error && (<React.Fragment>
        <h2>Error:</h2>
        <Sites>{JSON.stringify(error, 1, 1)}</Sites>
      </React.Fragment>)}
      {sites && (<React.Fragment>
        <h2>Sites:</h2>
        <Sites>{JSON.stringify(sites, 1, 1)}</Sites>
      </React.Fragment>)}
      <ul className="Home-resources">
        <li>
          <a href="https://github.com/jaredpalmer/razzle">Docs</a>
        </li>
        <li>
          <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
        </li>
        <li>
          <a href="https://palmer.chat">Community Slack</a>
        </li>
      </ul>
    </div>
  )
}

const Sites = styled.pre`
  text-align: left;
`

const page = gql`
  query {
    sites (where: {
      status: PUBLISHED,
      name_in: [
        "home",
        "main",
        "root"
      ]
    }) {
      status
      updatedAt
      createdAt
      id
      name
      description
      pages {
        id
      }
    }
  }


`

export default graphql(page, {
  variables: {"id":"cju9qnxjsqeyr0c15srixmm2t"}
})(Home)
