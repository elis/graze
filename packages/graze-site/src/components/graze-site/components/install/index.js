import React from 'react'
import Mark from 'react-markdown'
import styled from 'styled-components'

export default props => (
  <InstallEl className='pv6'>
    <div className='bg-dark-blue'>
      <div className='flex mw8 ph3 center flex-wrap'>
        <div className='pitch w-100 w-40-m w-40-l avenir ph4-ns'>
          <h1>{props.title}</h1>
          <Mark>{props.subtitle}</Mark>
        </div>
        <div className='art w-100 w-60-m w-60-l'>
          <Terminal>
            <BashRow>npx create-graze-app <em>my-app</em> my-heroku-app graphcmsapi</BashRow>
            <BashOutput output={`
Creating *my-app*...

&gt; Success! Created files for "*my-app*" graze app...
`} />
            <BashRow>cd <em>my-app</em></BashRow>
            <BashRow>npm start</BashRow>
            <BashRow>npm deploy</BashRow>
          </Terminal>
        </div>
      </div>
    </div>
  </InstallEl>
)


const TerminalEl = styled.div`
  color: #F6FFFE;
  background: #333333;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.6), 0px 4px 18px rgba(0,0,0,0.4), 0px 4px 36px rgba(0,0,0,0.3);

  > header {
    background: #555555;
    height: 22px;
    padding: 0.4rem;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid #555555;
    &::after {
      content: "";
      display: block;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      background: #FF725C;
      box-shadow: 19px 0 0 #9EEBCF, 38px 0 0 #FBF1A9;
      opacity: 0.8;
      transition: all 120ms ease-out;
    }
    &:hover {
      &::after {
        opacity: 0.9;
        box-shadow: 20px 0 0 #9EEBCF, 40px 0 0 #FBF1A9;
      }
    }
  }
  > main {
    padding: 0.75rem;
  }
`
const Terminal = props => (
  <TerminalEl className=''>
    <header />
    <main>
      {props.children}
    </main>
  </TerminalEl>
)

const InstallEl = styled.section`
  color: #F6FFFE;
  .art {
      > ${TerminalEl} {
        margin-bottom: -4rem;
      }
    @media screen and (min-width: 30rem) {
      > ${TerminalEl} {
        margin-top: -2rem;
        margin-bottom: -2rem;
      }
    }
  }
`

const BashRowEl = styled.div`
  padding: 0.2rem;
  em {
    font-style: normal;
    color: #19A974;
  }
  > span, > abbr {
    margin-right: .5em;
    display: inline-block;
  }
  > span {
    color: #19A974;
    /* padding: 0.2rem */
  }
  > abbr {
    color: #A463F2;
  }
  > p {
    font-family: Consolas, monaco, monospace;
    padding: 0;
    margin: 0 0 .5rem;
    &:last-of-type {
      /* margin-bottom: 0; */
    }
  }
`
const BashRow = props => (
  <BashRowEl>
    <span>~</span>
    <abbr>$</abbr>
    <code>{props.children}</code>
  </BashRowEl>
)
const BashOutput = props => (
  <BashRowEl>
    <Mark>{props.output}</Mark>
  </BashRowEl>
)

export const transformModel = inputs => (
  {
  ...inputs
})