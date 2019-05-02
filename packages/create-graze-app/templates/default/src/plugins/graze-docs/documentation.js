import React, { useMemo } from 'react'
import { Link, withRouter } from 'react-router-dom'

const defaultComponents = {
  pre: (props) => (<pre>{props.children}</pre>),
  code: (props) => (<code>{props.children}</code>),
  p: (props) => (<p className='lh-copy'>{props.children}</p>),
  a: ({href, ...props}) => (<Link to={`/docs/${href.replace(/^\/?/, '')}`} {...props} />)
}

export const Documentation = withRouter(({match, children, ...props}) => {
  const { params: {section} } = match

  const Comp = useMemo(() => {
    const comp = require('docs/' + (section || ''))
    return comp.default || comp
  }, [section])

  return (
    <DocsContainer className='docs'>
      <div className='mw7 avenir center flex ph4-ns'>
        <Comp components={defaultComponents} />
      </div>
    </DocsContainer>
  )
})

const styled = require('styled-components').default

const DocsContainer = styled.div`
`

const Sidebar = styled.aside`
`



