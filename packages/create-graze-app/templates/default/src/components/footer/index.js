import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default props => (
  <Footer className='pv4 ph3 ph5-m ph6-l mid-gray'>
    <small className='f6 db tc'>Est. 2019 <b className='ttu'>Graze</b>., Created by: Eli Sklar</small>
    <div className='tc mt3'>
      <a href='https://github.com/elis/graze' title='Github Repository' className='f6 dib ph2 link mid-gray dim'>Github</a>
      <Link to='/features' title='About Graze' className='f6 dib ph2 link mid-gray dim'>About Graze</Link>
    </div>
  </Footer>
)

const Footer = styled.footer`
  margin-top: 10rem;
  padding: 4rem;
  .db {
      display: block;
  }

  .dib {
      display: inline-block;
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

  .mid-gray {
      color: #555;
  }

  .pv4 {
      padding-top: 2rem;
      padding-bottom: 2rem;
  }

  .ph2 {
      padding-left: .5rem;
      padding-right: .5rem;
  }

  .ph3 {
      padding-left: 1rem;
      padding-right: 1rem;
  }

  .mt3 {
      margin-top: 1rem;
  }

  .tc {
      text-align: center;
  }

  .ttu {
      text-transform: uppercase;
  }

  .f6 {
      font-size: .875rem;
  }

  .dim {
      opacity: 1;
      transition: opacity .15s ease-in;
  }

  .dim:hover, .dim:focus {
      opacity: .5;
      transition: opacity .15s ease-in;
  }

  .dim:active {
      opacity: .8;
      transition: opacity .15s ease-out;
  }

  @media screen and (min-width: 30em) and (max-width: 60em) {
      .ph5-m {
          padding-left: 4rem;
          padding-right: 4rem;
      }
  }

  @media screen and (min-width: 60em) {
      .ph6-l {
          padding-left: 8rem;
          padding-right: 8rem;
      }
  }

`
