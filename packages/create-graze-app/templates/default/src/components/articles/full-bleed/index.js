import React from 'react'

import styled from 'styled-components'

export default ({ art, title, subtitle, children, ...props }) => {
  return (
    <Article {...props}>
      <div className='cf' style={{ backgroundImage: `url(${art})` }}>
        <div className='fl pa3 pa4-ns bg-white black-70 measure-narrow f3 times'>
          <header className='bb b--black-70 pv4'>
            <h3 className='f2 fw7 ttu tracked lh-title mt0 mb3 avenir'>{title}</h3>
            <h4 className='f3 fw4 i lh-title mt0'>{subtitle}</h4>
          </header>
          <section className='pt5 pb4 content'>
            {children}
          </section>
        </div>
      </div>
    </Article>
  )
}

const Article = styled.article``
