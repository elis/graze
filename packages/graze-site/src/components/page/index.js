import React, { useContext, useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { NavLink } from 'react-router-dom'

import tachyon from 'tachyons-components'
import 'tachyons/css/tachyons.css'

import { Icon as BrandIcon } from '../graze-brand'

import { SiteContext } from '../../site'
import Footer from '../footer'

export default ({ header, ...props }) => (
  <PageEl className='main-view' {...props}>
    <SSRStyles />
    <Header>
      <BrandIcon />
    </Header>
    {props.children}
    <Footer />
  </PageEl>
)

const getNavItems = pages => pages && !!pages.length && pages
  .filter(({ slug }) => slug !== 'index')
  .map(({ slug, title }) => ({ slug, title }))

const Header = props => {
  const site = useContext(SiteContext)
  const pages = site && site.grazePages
  const [nav, setNav] = useState(getNavItems(pages))

  useEffect(() => {
    if (pages && pages.length) {
      setNav(getNavItems(pages))
    }
  }, [pages])

  return (
    <HeaderEl className={`sans-serif bg-dark-gray ${props.className}`}>
      <NavEl>
        <BrandCell>
          <NavLink to='/' className='flex items-center'>
            <BrandIcon color='#19A974' width={28} dark height={28} className='bricon dib green' />
            <Wordmark height={10} color='white' className='brtext dib near-white' />
          </NavLink>
        </BrandCell>
        <NavCell>
          {nav && !!nav.length && nav.map((item, i) => (
            <NavHref key={`nav ${i}`} className='f6 fw4 hover-white no-underline ml2 white-70 dn dib-ns pv2 ph3' to={`/${item.slug}`}>{item.title}</NavHref>
          ))}
          <NavHref className='f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3' to='/__tutorial'>Tutorial</NavHref>
          <a className='f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba' href='https://github.com/elis/graze'>GitHub</a>
        </NavCell>
      </NavEl>
    </HeaderEl>
  )
}
const NavCell = tachyon('div')`dtc v-mid tr pa3`

const NavEl = styled(tachyon('nav')`
  dt w-100 mw9 center
`)`
  display: table;
  color: white;
  a {
    &, &:visited {
      color: white;
    }
  }
  > .dtc {
    display: table-cell;
    text-align: right;
    padding: 1rem;
  }

`
const BrandWordmark = props => (
  <svg {...props} viewBox='0 0 1000 209' fill='currentcolor' xmlns='http://www.w3.org/2000/svg'>
    <path className='G' d='M74.1719 93.7969H147.016V135.562C146.641 156.094 139.609 173.297 125.922 187.172C112.141 200.953 94.7969 208.031 73.8906 208.406C57.7656 208.031 44.3125 204.094 33.5312 196.594C22.5625 189.375 14.5938 181.031 9.625 171.562C8.125 168.469 6.76562 165.516 5.54688 162.703C4.42188 159.797 3.48438 156.141 2.73438 151.734C1.32812 143.484 0.625 127.641 0.625 104.203C0.625 80.3906 1.32812 64.4531 2.73438 56.3906C4.23438 48.3281 6.53125 41.8125 9.625 36.8438C14.5938 27.375 22.5625 18.9375 33.5312 11.5312C44.3125 4.03125 57.7656 0.1875 73.8906 0C93.6719 0.1875 109.797 6.04688 122.266 17.5781C134.734 29.2031 142.609 43.5938 145.891 60.75H112.984C110.453 52.5 105.859 45.4688 99.2031 39.6562C92.2656 34.125 83.8281 31.2656 73.8906 31.0781C66.5781 31.2656 60.2969 32.7188 55.0469 35.4375C49.7031 38.25 45.3906 41.7656 42.1094 45.9844C38.0781 50.3906 35.4062 56.0625 34.0938 63C32.5938 70.3125 31.8438 84.0469 31.8438 104.203C31.8438 124.359 32.5938 138 34.0938 145.125C35.4062 152.25 38.0781 158.016 42.1094 162.422C45.3906 166.641 49.7031 170.062 55.0469 172.688C60.2969 175.781 66.5781 177.328 73.8906 177.328C85.9844 177.328 95.9688 173.203 103.844 164.953C111.719 157.078 115.75 146.719 115.938 133.875V123.188H74.1719V93.7969Z' />
    <path className='R' d='M197.078 91.5469H244.047C255.672 91.3594 264.391 87.9844 270.203 81.4219C275.922 75.3281 278.781 67.8281 278.781 58.9219C278.594 48.2344 275.172 40.5 268.516 35.7188C263.266 31.5 255.672 29.3906 245.734 29.3906H197.078V91.5469ZM166 1.6875H246.016C263.078 1.6875 277 6.1875 287.781 15.1875C300.812 25.4062 307.609 39.9844 308.172 58.9219C307.797 86.7656 294.578 105.703 268.516 115.734L316.047 206.719H279.062L236.734 119.109H197.078V206.719H166V1.6875Z' />
    <path className='A' d='M436.562 133.312L406.891 43.7344H406.328L376.656 133.312H436.562ZM445.422 160.875H367.656L351.906 206.719H319L393.531 1.6875H419.547L494.078 206.719H461.312L445.422 160.875Z' />
    <path className='Z' d='M500 180.844L592.953 29.3906H503.656V1.6875H630.922V25.0312L537.688 177.328H630.922V206.719H500V180.844Z' />
    <path className='E' d='M643.625 1.6875H774.547V31.0781H674.703V89.5781H759.922V117.141H674.703V177.328H774.547V206.719H643.625V1.6875Z' />
  </svg>

)

const Wordmark = styled(BrandWordmark)`
  fill: currentcolor;
`

const NL = props => <NavLink {...props} />
const NavHref = styled(NL)`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border: 3px solid rgba(255, 255, 255, 0);
    border-top: 0;
    border-bottom: 1px solid;
    border-bottom-color: inherit;
    border-radius: 10px;
    transition: all 150ms ease-out;
    transform: scaleX(0);
  }
  &.active {
    &::after {
      transform: scaleX(1);
    }
  }
`
const BrandCellt = tachyon('div')`dtc dt w2 v-mid pa3`
const BrandCell = styled(BrandCellt)`
  padding: 1rem;
  > a {
    display: flex;
    align-items: center;
  }
  .bricon {
    transform: scale(1);
    transition: all 80ms ease-in-out;
    /* color: #FFB700; // gold */
    margin-right: 0.125rem;
  }
  ${Wordmark} {
    /* color: #FFB700; // gold */
    > * {
      transform: translateX(6px);
      transition: all 60ms ease-out;
    }
    .G {
      transition-duration: 100ms;
    }
    .R {
      transition-duration: 200ms;
    }
    .A {
      transition-duration: 400ms;
    }
    .Z {
      transition-duration: 800ms;
    }
    .E {
      transition-duration: 1200ms;
    }
  }
  a:hover {
    .bricon {
      transform: scale(1.45);
    }
    ${Wordmark} {
      height: 14px;
      > * {
        transform: translateX(60px);
      }
    }
  }

`

const HeaderEl = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: #333;
  min-height: 66px;
  color: #FFF;
  z-index: 100;
`
const PageEl = styled.div`
  ${HeaderEl} + * {
    &::before {
      content: '';
      height: 66px;
      display: block;
    }
  }
  button {
    border: 0;
  }
`

const SSRStyles = createGlobalStyle`
.border-box {
    box-sizing: border-box;
}

.cover {
    background-size: cover !important;
}

.bg-left {
    background-repeat: no-repeat;
    background-position: center left;
}

.ba {
    border-style: solid;
    border-width: 1px;
}

.b--white {
    border-color: #fff;
}

.b--white-90 {
    border-color: rgba(255, 255, 255, .9);
}

.b--blue {
    border-color: #357edd;
}

.dn {
    display: none;
}

.dib {
    display: inline-block;
}

.dt {
    display: table;
}

.dtc {
    display: table-cell;
}

.sans-serif {
    font-family: -apple-system,
                 BlinkMacSystemFont,
                 'avenir next',
                 avenir,
                 'helvetica neue',
                 helvetica,
                 ubuntu,
                 roboto,
                 noto,
                 'segoe ui',
                 arial,
                 sans-serif;
}

.fw1 {
    font-weight: 100;
}

.fw2 {
    font-weight: 200;
}

.fw4 {
    font-weight: 400;
}

.h2 {
    height: 2rem;
}

.lh-title {
    line-height: 1.25;
}

.link {
    text-decoration: none;
    transition: color .15s ease-in;
}

.link:link, .link:visited {
    transition: color .15s ease-in;
}

.link:hover {
    transition: color .15s ease-in;
}

.link:active {
    transition: color .15s ease-in;
}

.link:focus {
    transition: color .15s ease-in;
    outline: 1px dotted currentColor;
}

.mw8 {
    max-width: 64rem;
}

.w2 {
    width: 2rem;
}


.white-90 {
    color: rgba(255, 255, 255, .9);
}

.white-80 {
    color: rgba(255, 255, 255, .8);
}

.white-70 {
    color: rgba(255, 255, 255, .7);
}

.white {
    color: #fff;
}

.bg-black-80 {
    background-color: rgba(0, 0, 0, .8);
}

.bg-blue {
    background-color: #357edd;
}

.hover-white:hover {
    color: #fff;
}

.hover-white:focus {
    color: #fff;
}

.pa1 {
    padding: .25rem;
}

.pa3 {
    padding: 1rem;
}

.pb5 {
    padding-bottom: 4rem;
}

.pv2 {
    padding-top: .5rem;
    padding-bottom: .5rem;
}

.ph3 {
    padding-left: 1rem;
    padding-right: 1rem;
}

.ml2 {
    margin-left: .5rem;
}

.mb0 {
    margin-bottom: 0;
}

.mb3 {
    margin-bottom: 1rem;
}

.mb4 {
    margin-bottom: 2rem;
}

.mt3 {
    margin-top: 1rem;
}

.mt4 {
    margin-top: 2rem;
}

.no-underline {
    text-decoration: none;
}

.tr {
    text-align: right;
}

.f2 {
    font-size: 2.25rem;
}

.f3 {
    font-size: 1.5rem;
}

.f6 {
    font-size: .875rem;
}

.center {
    margin-right: auto;
    margin-left: auto;
}

.v-mid {
    vertical-align: middle;
}

.grow {
    -moz-osx-font-smoothing: grayscale;
    backface-visibility: hidden;
    transform: translateZ(0);
    transition: transform .25s ease-out;
}

.grow:hover, .grow:focus {
    transform: scale(1.05);
}

.grow:active {
    transform: scale(.9);
}

.grow-large {
    -moz-osx-font-smoothing: grayscale;
    backface-visibility: hidden;
    transform: translateZ(0);
    transition: transform .25s ease-in-out;
}

.grow-large:hover, .grow-large:focus {
    transform: scale(1.2);
}

.grow-large:active {
    transform: scale(.95);
}

@media screen and (min-width: 30em) {
    .dib-ns {
        display: inline-block;
    }
}

@media screen and (min-width: 30em) and (max-width: 60em) {
    .pb6-m {
        padding-bottom: 8rem;
    }

    .mt5-m {
        margin-top: 4rem;
    }
}

@media screen and (min-width: 60em) {
    .bg-center-l {
        background-repeat: no-repeat;
        background-position: center center;
    }

    .dib-l {
        display: inline-block;
    }

    .pb7-l {
        padding-bottom: 16rem;
    }

    .mt6-l {
        margin-top: 8rem;
    }

    .tc-l {
        text-align: center;
    }

    .f1-l {
        font-size: 3rem;
    }
}
`
