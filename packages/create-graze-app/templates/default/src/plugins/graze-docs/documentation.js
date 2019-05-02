import React, { useMemo, useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Link, withRouter, NavLink } from 'react-router-dom'
import path from 'path'
import Highlight from 'react-highlight'

import LuanchIcon from '@material-ui/icons/Launch'
import NotesIcon from '@material-ui/icons/Notes'
import 'highlight.js/styles/zenburn.css'

const Highlighted = ({metaString, className, children, ...props}) => (
  <Highlight className={`${className} ${metaString}`}>{children}</Highlight>
)

const ExternalIndicator = props => <LuanchIcon fontSize='inherit' {...props} />

const defaultComponents = route => ({
  pre: (props) => (<pre className='ph3 pv3 w-100'>{props.children}</pre>),
  code: (props) => (<Highlighted {...props} />),
  p: (props) => (<p className='lh-copy'>{props.children}</p>),
  a: ({href, children, ...props}) => (
    href.match(/^http/)
    ? <a href={href} {...props} rel='noopener' target='_blank'>{children} <ExternalIndicator /></a>
    : <Link to={`${route}/${href.replace(/^\/?/, '')}`} {...props} children={children} />)
})

export const Documentation = withRouter(({match, location, children, options, ...props}) => {
  const { params: { section } } = match
  const { hash } = location
  const { route, source } = options

  console.log(`🐷`, 'Documentation match?', match, props.location)
  const Comp = useMemo(() => {
    const dir = path.resolve('../../../', './src/docs') //, '../../', source, '/', section || '')
    try {
      const comp = require('../../docs/' + (section || ''))
      return comp.default || comp
    } catch (error) {
      console.log('Unable to load docs:', error)
      return prps => <div><h2>Error loading <code>{source}/{section || ''}</code></h2></div>
    }
  }, [section])

  useEffect(() => {
    if (hash) {
      const pos = document.querySelector(hash)
      const { offsetTop, scrollHeight, offsetHeight } = pos || {}
      const top = (offsetTop || 0) - 80 - (scrollHeight || 0) - (offsetHeight || 0)
      console.log(`🐒`, 'hash pos:', pos)
      try {
        window.scroll({
          top,
          left: 0,
          behavior: 'smooth'
        })
      } catch (error) {
        // just a fallback for older browsers
        window.scrollTo(top, 0)
      }
    }
  }, [hash])

  const [ showMenu, setShowMenu ] = useState()

  const toggleMenu = useCallback(() => {
    setShowMenu(active => !active)
  }, [showMenu])

  const dismissMenu = useCallback(() => {
    setShowMenu(false)
  }, [])

  return (
    <DocsContainer className='docs'>
      <div className={`mw8 center flex ph4-l ph2-ns ${showMenu ? 'show' : 'hide'}-menu`}>
        <SideNav className='mr2 mw5' toggleMenu={toggleMenu} dismissMenu={dismissMenu} />
        <Comp components={defaultComponents(route)} />
      </div>
    </DocsContainer>
  )
})

const Handle = props => {
  return <HandleCont {...props}><NotesIcon/></HandleCont>
}

const menu = require('../../docs/menu').default

const walkMenu = items => items && items.length > 0 && items
  .map((item, i) => (
    // console.log(`🌼`, 'menu item:', item) ||
    {...item, menu: walkMenu(item.menu), sections: loadSections(item)}
  ))

const loadSections = item => {
  // console.log(`🌼`, 'Loadinng sectios?', item.route)
  // return []
  try {
    if (item && item.route) {
      // console.log(`🌼`, 'D', {r: item.route.replace(/^(\/)/, '')})
      const doc = require('../../docs/' + item.route.replace(/^(\/)/, ''))
      // console.log(`🌼`, 'Loaded doc?', doc)
      const { documentHeadings } = doc || {}
      console.log(`🌼`, 'Headings?', documentHeadings)
      const second = (documentHeadings && documentHeadings.length > 0)
        ? documentHeadings
            .map(heading => Object.entries(heading))
            .map(([[tag, value]]) => [tag, value])
            // .map(([tag, value]) => console.log(`🌼🙂`, tag, value) || [tag, value])
            .filter(([tag]) => tag === 'h2')
            .map(([tag, value]) => ([value, value.toLowerCase()
                .replace(' ', '-')
                .replace(/[^a-z0-9-_]+/img, '')]))
        : null
      console.log(`🌼`, 'second?', second)
      return second
    }

  } catch (error) {
    console.log('no go:', error)
  }
}

const itemied = walkMenu(menu)

const SideNav = withRouter(({className, toggleMenu, dismissMenu, ...props}) => {
  console.log(`🌼`, 'What is itemied? ', itemied)
  return (
    <SideNavEl className={`tl flex ph0 ${className}`}>
      <Handle onClick={toggleMenu} className='menu-handle' />
      <div className='content ph3 ph-ns'>
        <MenuItems items={itemied} className='ph0' />
      </div>
    </SideNavEl>
  )
})

const SideNavEl = styled.nav`
  z-index: 1001;
  flex: 1 0 auto;
  flex-direction: column;
  width: 100%;
  > .content {
    padding-top: .7rem;
  }
  ul {
    list-style: none;
    > li {
      list-style: none;
      position: relative;
      > a {
        display: block;
        color: rgba(33, 33, 33, 0.9);
        &:hover {
          color: #00449e;
        }
        & + ul, & + ul + ul {
          height: 0;
          overflow: hidden;
          transition: all 220ms ease-out;
        }
        &.active {
          font-weight: 600;
          & + ul, & + ul + ul {
            /* background: rgba(0, 255, 255, 0.3); */
            height: 100%;
          }
        }
      }
    }
  }
`

const MenuItems = props => {
  // console.log('what are menu items?', props.items)
  return (props.items && props.items.length > 0
    ? <ul className={`m0 ${props.className}`}>
        {props.items
          .map((item, i) => (
            <li key={`docs nav ${i} ${item.name || item}`} className='ma0 mb2'>
              <NavLink to={`/docs${item.route}`} className='ph2 f5 pv2'>{item.name || item}</NavLink>
              {item.sections && item.sections.length > 0 && (
                // console.log(`🐨`, 'going sections for:', item, item.sections) ||
                <MenuSections sections={item.sections} route={`/docs${item.route}`} className='pl3 mb2' />
              )}
              {item.menu && item.menu.length > 0 && (
                <MenuItems items={item.menu} className='pl2' route={`/docs${item.route}`} />
              )}
            </li>
          ))
        }
      </ul>
    : null
  )
}

const MenuSections = props => (
  props.sections && props.sections.length > 0 &&
    <MenuSectionsEl className={props.className}>
      {props.sections.map(([title, id], i) => (
        <li key={`docs section ${i}`}>
          <NavLink className='ph1 pt2 pb1 f6' to={props.route + '#' + id}>{title}</NavLink>
        </li>
      ))}
    </MenuSectionsEl>
)

const MenuSectionsEl = styled.ul`
  > li {
    border-left: 2px solid rgba(33, 33, 33, 0.1);
    &:last-of-type {
      /* border-radius: 0 0 0 12px; */
    }
    a {

    }
  }
`

export const getDocumentation = options =>
  props => <Documentation {...props} options={options} />

const DocsContainer = styled.div`
  a {
    color: #357edd;
    text-decoration: none;
    transition: all 120ms ease-out;
    &:hover {
      text-decoration: underline;
      color: #00449e;
    }
    > svg:last-child {
      position: relative;
      top: 3px;
      display: inline-block;
    }
    > .icon-link {
      &::after {
        color: rgba(33, 33, 33, 0.1);
        content: '#';
        margin-right: .5rem;
      }
    }
  }
  h1 > a {
    > .icon-link {
      &::after {
        content: '';
        margin-right: 0;
      }
    }
  }
  pre {
    padding: 0;
    margin: 0;
    white-space: pre-wrap;
    > code {
      border-radius: 4px;
    }
  }
  * {
    transition: 120ms ease-out all;
    & + h1, & + h2, & + h3 {
      margin-top: 3rem;
    }
  }
  > .flex {
    position: relative;
    @media screen and (min-width: 54rem) {
      > nav {
        min-width: 220px;
        > .menu-handle {
          display: none;
        }
      }
    }
    @media screen and (max-width: 54rem) {
      padding-left: 3rem;
      padding-right: 1.5rem;
      > nav {
        position: fixed;
        left: 0;
        bottom: 0;
        top: 66px;
        overflow-y: auto;
        overflow-x: hidden;
        background: #FFF;
        > .content {
          min-width: 220px;
        }
      }
      &.show-menu, &:hover {
        > nav {
          min-width: 50vh;
          right: auto;
        }
      }
      &.hide-menu {
        > nav {
          width: 48px;
          min-width: 0;
          background: rgba(255, 255, 255, 0);
          .content {
            opacity: 0;
            pointer-events: none;
          }
        }
      }
    }
  }
  > .flex > nav {
  }

  @media screen and (max-width: 54rem) {
    > .flex > nav {
    }
  }
`

const Sidebar = styled.aside`
`




const HandleCont = styled.div`
  background: #FFF;
  cursor: pointer;
  padding: .5rem;
  position: fixed;
  left: 0;
  display: block;
  top: 66px;
  min-width: 0;
  @media screen and (max-width: 54rem) {
    & + * {
      margin-top: 18px;
    }
  }
`