import React, { useMemo, useEffect, useState } from 'react'
import gm from 'gray-matter'
import plugins from '@graze'
import VisibilitySensor from 'react-visibility-sensor'

export default ({ site, page: basePage, error, ...props }) => {
  const { OnDemandComponent, onDemandSections, compileProperties, compileModel, useSite } = plugins
  const PageCover = require('../../components/page-cover').default
  const Mark = require('react-markdown')

  const [ mainCoverVisible, setMainCoverVisiblity ] = useState()

  const { Icon: BrandIcon } = require('../../components/graze-brand')
  // const { OnDemandComponent, onDemandSections } = require('../../plugins/graze-graphcms/site/on-demand')
  
  const page = useMemo(() => {
    console.log(`⚔️`, 'INDEX PAGE COMPILE MODEL', [basePage, { site, page: basePage }], { compileModel })
    return compileModel(basePage, { site, page: basePage })[0]
  }, [ basePage, site ])
  console.log(`⚔️`, 'INDEX PAGE', { page, site, basePage })

  // const { attributes, body } = useMemo(() => {
  //   // Compiling of page attributes is require despite the compilation
  //   // up the tree - some fields might not have been exposed to the right context
  //   console.log(`⚔️`, 'INDEX PAGE before parse', page.content)
  //   const parsed = page && page.content && gm(page && page.content)
  //   if (parsed) {
  //     const attributes = compileProperties(parsed.data, { page, site })
  //     console.log(`⚔️`, 'INDEX PAGE after parse', { parsed, attributes, body: parsed.content })

  //     return { body: parsed.content, attributes }
  //   }

  //   return typeof page.content === 'string'
  //     ? { attributes: {}, body: page.content }
  //     : { attributes: page.content.data, body: page.content.content }
  // }, [page && page.content])

  const { data: attributes, content: body } = page.content
  console.log(`⚔️`, 'INDEX PAGE attributes, body', { attributes, body })

  const { actions: { onVisiblityChange, setOverrides } } = (useSite && useSite()) || { actions: {} }
  const [sections, overrides] = useMemo(() => {
    console.log('producing sections', attributes, page.content)
    const sects = attributes && attributes.sections && !!attributes.sections.length &&
      onDemandSections(attributes.sections, { site, page }, props => (
        console.log(`🧦`, 'Wrapper', `/${props.comp}-${props.index}/`, { props, onVisiblityChange }) ||
        <VisibilitySensor
          partialVisiblity
          resizeCheck
          containment={
            typeof window !== 'undefined'
              ? window.document.querySelector('body')
              : null
          }
          onChange={(visible) =>
            (
              props.comp === 'page-cover/v2'
              && props.index === 0
              && (
                console.log(`👁`, visible ? `◉` : `◎`, `·${props.comp}·${props.index}`, 'changed visibility:', { props, visible }) ||
                setMainCoverVisiblity(visible)
              )
            )
            // onVisiblityChange(visible, props)
          }
          key={`page children ${props.comp}-${props.index}`}
        >{props.children}</VisibilitySensor>
      ))

    const override = attributes && attributes.sections && !!attributes.sections.length
          && compileProperties(attributes.sections[0], { page, site })
    // console.log(`⚔️`, 'SECTIONS', { sects })
    // console.log(`⚔️`, 'OVERRIDE', { override })
    // const [[comp, { attributes: { colors } }]] = Object.entries(override || {})
    // console.log(`⚔️`, 'OVERRIDE x', { comp, colors })

    return [sects, override]
  }, [attributes && attributes.sections])
  // console.log('resulting sections', sections)
  console.log(`⚔️`, 'sections and overrides:', { sections, overrides })

  useEffect(() => {
    if (overrides && Object.entries(overrides).length) {
      return mainCoverVisible
        ? setOverrides(overrides)
        : setOverrides({})
    }
  }, [ mainCoverVisible ])

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
