import React, { useMemo } from 'react'
import gm from 'gray-matter'

export default ({ site, page, error, ...props }) => {
  const PageCover = require('../../components/page-cover').default
  const Mark = require('react-markdown')
  const { Icon: BrandIcon } = require('../../components/graze-brand')
  const { OnDemandComponent, onDemandSections } = require('../../plugins/graze-graphcms/site/on-demand')
  const { compileAttributes } = require('../../plugins/graze-graphcms/site/utils')

  const { attributes, body } = useMemo(() => {
    const parsed = page && page.content && gm(page && page.content)
    if (parsed) {
      const attributes = compileAttributes(parsed.data, { page, site })

      return { body: parsed.content, attributes }
    }

    return { attributes: {}, body: '' }
  }, [page && page.content])

  const sections = useMemo(() => {
    return attributes && attributes.sections && !!attributes.sections.length &&
      onDemandSections(attributes.sections)
  }, [attributes && attributes.sections])

  const intro = useMemo(() => {
    return (!attributes || !attributes.sections) && (!page || (page && page.slug === 'root')) && (
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
    )
  }, [
    attributes && attributes.sections,
    page && page.slug
  ])

  return (
    <React.Fragment>
      {intro}
      {sections}
      {body && (
        <div className={`pb5 pb5-m pb6-l v-mid cnt`}>
          <div className='mw8 center ph3-ns ph2'>
            <Mark>{body}</Mark>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
