import React from 'react'
import ErrorMsg from '../../../../components/error'
import * as codes from './error-codes'

export default ({ error, details, props }) => {
  if (error && error.code) {
    const errorProps = parseError(error, details)
    return <ErrorMsg {...errorProps} />
  }
  return <ErrorMsg error={error} details={details} />
}

const parseError = ({ code, message, details, ...error }, context) => {
  if (code === codes.GRAPHCMS_NOT_AUTHORIZED) {
    return {
      details,
      error: {
        ...code,
        message: message || 'GraphQL error: Not Authorized!',
        ...error
      },
      children: <div>
        <h4>Authorize GraphCMS!</h4>
        <p>
          Your graphCMS seems to be set to <code>PROTECTED</code> —
          kidly set it to <code>QUERY</code>.
        </p>
      </div>
    }
  } else if (code === codes.MISSING_SITE_CONTENT) {
    return {
      details,
      error: {
        ...code,
        message: message || 'No content site',
        ...error
      },
      children: <div>
        <h4>You haven't created a content of type <code>Site</code></h4>
        <p>
          Create a <code>Site</code> named <code>root</code>
          in your <code>Site</code>'s model content.
        </p>
        <p>
          <a href='/docs/guides/graphcms'>Boot GraphCMS</a>
        </p>
      </div>
    }
  }

  return error
}
