import React from 'react'
import styled from 'styled-components'

export default props => <div><ErrorEl>
  <ErrorBlock {...props} />
</ErrorEl></div>

const ErrorEl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  background: rgba(255,255,255, 0.6);

  padding: 24px;
  pre {
    max-width: 100%;
    overflow: auto;
  }
`

const ErrorLink = ({error, ...props}) => {
  const slug = error && (error.code || error.message)
  const uri = escape(slug).substr(0, 96)
  return <a href={`http://graze.site/errors-db/${uri}`}>{slug}</a>
}

export const ErrorBlock = ({error, details, ...props}) => (
  <React.Fragment>
    <h1>Error</h1>
    <p><span>Seach Error DB: <ErrorLink error={error} /></span></p>
    {error && error.code && (
      <h4>Code: {error.code}</h4>
    )}
    {error && error.message && (
      <p>{error.message}</p>
    )}
    {details && (
      <React.Fragment>
        <h4>Details</h4>
        <pre>{JSON.stringify(details, 1, 1)}</pre>
      </React.Fragment>
    )}
    {error && error.stack && (
      <React.Fragment>
        <h4>Stack Trace</h4>
        <pre>{error.stack}</pre>
      </React.Fragment>
    )}
  </React.Fragment>
)