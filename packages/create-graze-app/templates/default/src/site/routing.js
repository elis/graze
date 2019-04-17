import React, { createContext, useEffect } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import onDemand, { preload } from './on-demand'
import { Helmet } from 'react-helmet'
import { get as getGA } from '../services/analytics'

export const SiteContext = createContext({})
const isSSR = typeof window === 'undefined'

export default props => {
  const { site, error } = props.data
  const { grazePages: pages } = site || {}

  // Preload pages
  useEffect(() => {
    const preloadTimeout = setTimeout(() => {
      if (!isSSR && pages && pages.length) {
        for (const page of pages) {
          preload(page.slug)
        }
      }
    }, 2500)
    return () => clearTimeout(preloadTimeout)
  }, [pages])

  if (error) {
    const ErrorMsg = require('../components/error').default
    console.error('Primary routing error:', error)

    return <ErrorMsg error={error} />
  }

  return (
    <React.Fragment>
      <MetaStyles 
        title={site.title}
        description={site.description}
        favicon={site.favicon}
        preview={site.previewImage}
      />
      {site.googleAnalytics && (
        <StatsReporting trackingId={site.googleAnalytics} />
      )}
      <SiteContext.Provider value={site}>
        <Switch>
          <Route path='/' exact component={onDemand('index', '/', false, {page: site && site.index, site, error})} />
          {pages && !!pages.length && pages.map((page, index) => (
            <Route
              key={`site page ${index}`}
              path={`/${page.slug}`}
              component={onDemand(page.slug, `/${page.slug}`, false, {page, site, error})} />
          ))}
          <Route path='/__tutorial' component={onDemand('tutorial', '/__tutorial', false, {pages, site, error})} />
          <Route path='/' component={onDemand('404')} />
        </Switch>
      </SiteContext.Provider>
    </React.Fragment>
  )
}

export const StatsReporting = withRouter(({location, trackingId}) => {
  const  { pathname, search } = location
  const ReactGA = getGA({ trackingId })

  useEffect(() => {
    ReactGA.pageview(`${pathname}${search}`)
  }, [pathname, search])

  return null
})

const CM = 'https://media.graphcms.com/'

const MetaStyles = ({title, description, favicon, preview, ...props}) => {
  const favi = favicon && favicon.handle
  const previ = preview && preview.url

  return (
    <React.Fragment>
      {props.children}
      <Helmet>
        {favi && (<link rel='apple-touch-icon-precomposed' sizes='57x57' href={`${CM}resize=w:57/${favi}`} />)}
        {favi && (<link rel='apple-touch-icon-precomposed' sizes='60x60' href={`${CM}resize=w:60/${favi}`} />)}
        {favi && (<link rel='apple-touch-icon-precomposed' sizes='72x72' href={`${CM}resize=w:72/${favi}`} />)}
        {favi && (<link rel='apple-touch-icon-precomposed' sizes='76x76' href={`${CM}resize=w:76/${favi}`} />)}
        {favi && (<link rel='apple-touch-icon-precomposed' sizes='114x114' href={`${CM}resize=w:114/${favi}`} />)}
        {favi && (<link rel='apple-touch-icon-precomposed' sizes='120x120' href={`${CM}resize=w:120/${favi}`} />)}
        {favi && (<link rel='apple-touch-icon-precomposed' sizes='144x144' href={`${CM}resize=w:144/${favi}`} />)}
        {favi && (<link rel='apple-touch-icon-precomposed' sizes='152x152' href={`${CM}resize=w:152/${favi}`} />)}
        {favi && (<link rel='icon' type='image/png' sizes='16x16' href={`${CM}resize=w:16/${favi}`} />)}
        {favi && (<link rel='icon' type='image/png' sizes='32x32' href={`${CM}resize=w:32/${favi}`} />)}
        {favi && (<link rel='icon' type='image/png' sizes='96x96' href={`${CM}resize=w:96/${favi}`} />)}
        {favi && (<link rel='icon' type='image/png' sizes='128x128' href={`${CM}resize=w:128/${favi}`} />)}
        {favi && (<link rel='icon' type='image/png' sizes='196x196' href={`${CM}resize=w:196/${favi}`} />)}
        {favi && (<link rel='icon' type='image/png' sizes='512x512' href={`${CM}resize=w:512/${favi}`} />)}
        {favi && (<meta name='msapplication-TileImage' content={`${CM}resize=w:144/${favi}`} />)}
        {favi && (<meta name='msapplication-square70x70logo' content={`${CM}resize=w:70/${favi}`} />)}
        {favi && (<meta name='msapplication-square150x150logo' content={`${CM}resize=w:150/${favi}`} />)}
        {favi && (<meta name='msapplication-wide310x150logo' content={`${CM}resize=w:310/${favi}`} />)}
        {favi && (<meta name='msapplication-square310x310logo' content={`${CM}resize=w:310/${favi}`} />)}
        
        {title && (<title>{title}</title>)}
        {title && (<meta name='title' content={title}/>)}
        {title && (<meta name='application-name' content={title}/>)}
        {title && (<meta property='twitter:title' content={title}/>)}
        {title && (<meta property='og:title' content={title}/>)}
        
        {description && (<meta property='og:description' content={description}/>)}
        {description && (<meta property='twitter:description' content={description}/>)}
        {description && (<meta name='description' content={description}/>)}

        {previ && (<meta name='og:image' content={previ}/>)}
        {previ && (<meta name='twitter:image' content={previ}/>)}

        <meta name='msapplication-TileColor' content='#FFFFFF' />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://graze.site/' />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://graze.site/' />
      </Helmet>
    </React.Fragment>
  )
}
