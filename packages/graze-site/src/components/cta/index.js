import React from 'react'
import { Link } from 'react-router-dom'

export default ({title, actionTo, cta, children}) => (
  <section className='ph3 ph5-ns pv5'>
    <article className='mw8 center br2 ba b--light-blue bg-lightest-blue'>
      <div className='dt-ns dt--fixed-ns w-100'>
        <div className='pa3 pa4-ns dtc-ns v-mid'>
          <div>
            <h2 className='fw4 blue mt0 mb3'>{title}</h2>
            <div className='black-70 measure lh-copy mv0'>
              {children}
            </div>
          </div>
        </div>
        <div className='pa3 pa4-ns dtc-ns v-mid'>
          <Link to={actionTo} className='no-underline f6 tc db w-100 pv3 bg-animate bg-blue hover-bg-dark-blue white br2'>{cta}</Link>
        </div>
      </div>
    </article>
  </section>
)