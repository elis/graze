import React from 'react'
import fm from 'front-matter'

export default ({ site, page, error, ...props }) => {
  const Page = require('../../components/page').default
  const PageCover = require('../../components/page-cover').default
  const Mark = require('react-markdown')
  const { Icon: BrandIcon } = require('../../components/graze-brand')
  const { OnDemandComponent } = require('../../site/on-demand')

  const { attributes, body } = fm(page && page.content)

  return (
    <Page {...props}>
      {(!attributes || !attributes.sections) && (!page || (page && page.slug === 'root')) && (
        <React.Fragment>
          <PageCover
            pitch={{
              title: 'Hello,',
              subtitle: 'World!'
            }}
            actions={[
              { to: '/__tutorial/graphcms/page-attributes', children: 'Setup Page', primary: true }
            ]}
            art={<BrandIcon width={'100%'} className='blue bricon v-mid' />}
          />
          <OnDemandComponent
            title='Missing Attributes or Sections'
            actionTo='/__tutorial/graphcms/page-attributes'
            cta='Read Tutorial'
            component='cta'>
            <p>
              You don't have attributes or sections on your page content.
              Visit the tutorial to learn how to create page attributes and sections.
            </p>
          </OnDemandComponent>
        </React.Fragment>
      )}
      {attributes && attributes.sections && !!attributes.sections.length &&
        attributes.sections
          .map(section => Object.entries(section))
          .map(([[comp, options]], index) => (
            <OnDemandComponent
              key={`page section ${index}`}
              component={comp} page={page} site={site} attributes={attributes} {...options} />
          )
          )}
      {body && (
        <div className={`pb5 pb5-m pb6-l v-mid cnt`}>
          <div className='mw9 center ph3-ns ph2'>
            <Mark>{body}</Mark>
          </div>
        </div>
      )}
    </Page>
  )
}
