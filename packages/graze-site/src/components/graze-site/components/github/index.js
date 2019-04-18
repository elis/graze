import React from 'react'

export default props => {
  const { default: GithubRepository } = require('./repository')
  return (
    <GithubRepository {...props} />
  )
}
