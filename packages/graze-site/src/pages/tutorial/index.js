import React from 'react'

export default ({ site, page, ...props }) => {
  const Tutorial = require('plugins/graze-tutorial/tutorial').default
  return (
    <Tutorial {...{ page, site, ...props }} />
  )
}
