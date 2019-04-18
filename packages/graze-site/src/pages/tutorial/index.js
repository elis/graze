import React from 'react'

export default ({site, page, ...props}) => {
  const Tutorial = require('../../components/graze-tutorial').default
  return (
    <Tutorial {...{page, site, ...props}} />
  )
}
