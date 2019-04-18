import React from 'react'
import { Switch, Route } from 'react-router-dom'

export default ({page, ...props}) => {
  const Page = require('../../components/page').default
  const { Feature: ArticleFeature } = require('../../components/graze-site/components/github/repository')
  const Mark = require('react-markdown')
  const fm = require('front-matter')
  const { default: Feature } = require('./feature')

  const { url } = props.match
  const {attributes, body} = fm(page && page.content)
  const compiledAttributes = compileAttributes(attributes, {page, ...props})

  return (
    <Page {...props}>
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
                .map(feature => ({...feature, ...require('front-matter')(feature.description)}))
                .map(feature => ({...feature, attributes: require('../../site').compileAttributes(feature.attributes, props)}))
                .map((feature, index) => (
                  <ArticleFeature feature={feature} key={`feature article ${index}`} className='tl' />
                )
              )}
            </section>
          </React.Fragment>
        )} />

        <Route path={`${url}/:featureSlug`} render={routeProps => {
          const feature = compiledAttributes && compiledAttributes.features &&
            !!compiledAttributes.features.length &&
            compiledAttributes.features
              .find(({slug}) => (`${slug}` === `${routeProps.match.params.featureSlug}`))

          if (!feature) {
            const { Redirect } = require('react-router-dom')
            return <Redirect to={url} />
          }
          return (
            <Feature {...routeProps} feature={feature}
          />
        )}} />
      </Switch>
    </Page>
  )
}

const Listing = ({title, features, description, url, props}) => {
  const { default: ArticlesList, Article } = require('../../components/articles/list')
  const Mark = require('react-markdown')
  const fm = require('front-matter')

  const {body} = fm(description)

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

const get = (p, o) =>
  p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)

export const compileAttributes = (attrs, context) => 
  (attrs && Object.entries(attrs)
    .map(([comp, value], index) => (
      ([comp, typeof value === 'string'
        ? (value.match(/\$[a-z]+/i)
          ? get(value.replace(/^\$/, '').split('.'), context)
          : value
          )
        : (
          value instanceof Array
          ? (value.map(el => (typeof el === 'string'
            ? get(el.replace(/^\$/, '').split('.'), context)
            : el)))
          : (typeof value === 'object'
              ? Object.entries(value)
                .map(([option, v]) => ([
                  option,
                  (typeof v === 'string' && value.match(/^\$\w+/))
                    ? get(v.replace(/^\$/, '').split('.'), context)
                    : v ]
                  ))
              : value
            )
        )
      ])
    ))
    .reduce((o, [prop, v]) => ({...o, [prop]: v}), {})
  )