import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
  return (
    <section className='mw8 ph6-ns ph4 pv4 center'>
      <h2>404</h2>
      <h4>Page not found</h4>
      <div className='pv4'>
        <Link to='/'>Home</Link>
      </div>
    </section>
  )
}
