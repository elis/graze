import React from 'react'
import { Switch, Route } from 'react-router-dom'
import plugins from '@graze'
const { compileProperties } = plugins

export default ({ page, ...props }) => {
  const Mark = require('react-markdown')
  const fm = require('gray-matter')
  const { default: Feature } = require('./feature')

  const { url } = props.match
  const { data: attributes, content: body } = fm(page && page.content)
  const compiledAttributes = compileProperties(attributes, { page, ...props })

  return (
    <Switch>
      <Route path={`${url}`} exact render={routeProps => (
        <React.Fragment>
          {compiledAttributes && compiledAttributes.features && (
            <Listing title={compiledAttributes.title || page.title} description={compiledAttributes.description} url={url} features={compiledAttributes.features} />
          )}
          {!compiledAttributes && (
            <React.Fragment>
              <h2>{page.title}</h2>
            </React.Fragment>
          )}
          <section className='mw8 ph6-l ph3 pv4 avenir center lh-copy'>
            <Mark escapeHtml={false}>{body}</Mark>
          </section>
          <section className='pv4 ph3 avenir center lh-copy justify-center flex flex-wrap'>
            {page.grazeExtraFeatures && page.grazeExtraFeatures
              .map(feature => ({ ...feature, ...require('gray-matter')(feature.description) }))
              .map(({ data, content, ...feature }) => ({ ...feature, attributes: compileProperties(data, props), body: content }))
              .map((feature, index) => (
                <div key={`feature ${index} a`}>{feature.title}</div>
              )
              )}
          </section>
        </React.Fragment>
      )} />

      <Route path={`${url}/:featureSlug`} render={routeProps => {
        const feature = compiledAttributes && compiledAttributes.features &&
          !!compiledAttributes.features.length &&
          compiledAttributes.features
            .find(({ slug }) => (`${slug}` === `${routeProps.match.params.featureSlug}`))

        if (!feature) {
          const { Redirect } = require('react-router-dom')
          return <Redirect to={url} />
        }
        return (
          <Feature {...routeProps} feature={feature}
          />
        )
 }} />
    </Switch>
  )
}

const Listing = ({ title, features, description, url, props }) => {
  const { default: ArticlesList, Article } = require('components/articles/list')
  const Mark = require('react-markdown')
  const fm = require('gray-matter')

  const { content: body } = fm(description)

  return (
    <ArticlesList title={title}>
      {body && (
        <section className='ph0-l ph3-m ph3 lh-copy f4'>
          <Mark>{body}</Mark>
        </section>
      )}
      {features.map((feat, index) => (
        <Article key={`feature ${index}`} slug={`${url}/${feat.slug}`} title={feat.title} art={feat.previewArt && feat.previewArt.url}>
          <Mark>{feat.description}</Mark>
        </Article>
      ))}
    </ArticlesList>
  )
}
