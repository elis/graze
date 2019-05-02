import React from 'react'

export default ({feature, ...props}) => {
  const { default: Article } = require('../../components/articles/full-bleed')
  const Mark = require('react-markdown')
  const {body} = require('gray-matter')(feature.content || '')

  return (
    <div>
      <Article
        title={feature.title}
        subtitle={feature.description}
        art={
          (feature.pageCover && feature.pageCover.art && feature.pageCover.art.url)
          || (feature.previewArt && feature.previewArt.url)
        }
      >
        <Mark>{body}</Mark>
      </Article>
    </div>
  )
}
