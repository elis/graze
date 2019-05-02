import React, { useState, useEffect } from 'react'

export default ({ page, props }) => {
  const Page = require('../../components/page').default
  const gm = require('gray-matter')
  const Mark = require('react-markdown')
  const { default: ArticlesList, Article } = require('../../components/articles/list')
  const [ attributes, setAttributes ] = useState()
  const [ body, setBody ] = useState()

  useEffect(() => {
    try {
      const { data: a, content: b } = gm(page && page.content)
      setAttributes(a)
      setBody(<Mark>{b}</Mark>)
    } catch (error) {
      const { ErrorBlock } = require('../../components/error')
      setBody(<ErrorBlock error={error} details={{ page, content: page && page.content }} />)
    }
  }, [page && page.content])

  return (
    <Page {...props}>
      {attributes && attributes.features && (
        <ArticlesList title={page.title}>
          {attributes.features.map((feat, index) => (
            <Article key={`feature ${index}`} slug={feat.slug} title={feat.title} art={feat.art}>
              <Mark>{feat.subtitle}</Mark>
            </Article>
          ))}
        </ArticlesList>
      )}
      {!attributes && (
        <React.Fragment>
          <h2>{page.title}</h2>
        </React.Fragment>
      )}
      <section className='mw8 ph4 pv4'>
        {body}
      </section>
    </Page>
  )
}
