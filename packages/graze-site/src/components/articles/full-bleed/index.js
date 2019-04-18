import React from 'react'

import styled from 'styled-components'
import tachyon from 'tachyons-components'

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

const Article = tachyon(styled.article`
  .bb {
    border-bottom-style: solid;
    border-bottom-width: 1px;
  }

  .b--black-70 {
    border-color: rgba(0, 0, 0, .7);
  }

  .cf:before, .cf:after {
    content: ' ';
    display: table;
  }

  .cf:after {
    clear: both;
  }

  .cf {
    *zoom: 1;
    background: no-repeat right center fixed;
    background-size: cover;
    
    > *:first-child {
      margin-top: 15vh;
    }
    @media screen and (max-width: 30rem) {
      background-position: center 0;
      background-size: contain;
    }
  }

  .fl {
    float: left;
    _display: inline;
  }

  .avenir {
    font-family: 'avenir next', avenir, sans-serif;
  }

  .times {
    font-family: times, serif;
  }

  .i {
    font-style: italic;
  }

  .fw4 {
    font-weight: 400;
  }

  .fw7 {
    font-weight: 700;
  }

  .tracked {
    letter-spacing: .1em;
  }

  .lh-title {
    line-height: 1.25;
  }

  .lh-copy {
    line-height: 1.5;
  }

  .black-70 {
    color: rgba(0, 0, 0, .7);
  }

  .bg-white {
    background-color: #fff;
  }

  .pa3 {
    padding: 1rem;
  }

  .pb4 {
    padding-bottom: 2rem;
  }

  .pt5 {
    padding-top: 4rem;
  }

  .pv4 {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .mb3 {
    margin-bottom: 1rem;
  }

  .mt0 {
    margin-top: 0;
  }

  .ttu {
    text-transform: uppercase;
  }

  .f2 {
    font-size: 2.25rem;
  }

  .f3 {
    font-size: 1.5rem;
  }

  .f4 {
    font-size: 1.25rem;
  }

  .measure {
    max-width: 30em;
  }

  .measure-narrow {
    max-width: 20em;
  }

  pre {
    overflow-x: auto;
    font-size: 1rem;
  }
  section.content > pre {
    background-color: #F6FFFE;
    color: #777777;
    padding: 1rem;
    border: 1px solid #CDECFF;
    border-left: 0;
    border-right: 0;
    border-radius: 3px;
  }
  section.content code {
    background-color: #F6FFFE;
    color: #777777;
    border: 1px solid #CDECFF;
    padding: 0 .5rem;
    border-left: 0;
    border-right: 0;
    border-radius: 3px;
    font-family: Consolas,monaco,monospace;
    font-size: 1rem;
  }
  @media screen and (min-width: 30em) {
    .pa4-ns {
        padding: 2rem;
    }
  }
`)``
