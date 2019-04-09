import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from './react.svg'
import './Home.css'
import tachyon from 'tachyons-components'
import Mark from 'react-markdown'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const BrandIcon = ({dark, ...props}) => typeof dark !== 'undefined'
  ? <svg {...props} viewBox="0 0 599 599" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M549.663 394.093L549.631 203.911L549.627 176.964C549.623 163.027 542.188 150.151 530.116 143.184L318.792 21.2234C306.723 14.2567 291.852 14.2589 279.783 21.23L68.4995 143.26C56.431 150.23 48.9989 163.109 49 177.046L49.0044 203.91L49.0365 394.092L49.0409 421.039C49.0431 434.975 56.4796 447.852 68.5503 454.818L279.874 576.78C291.946 583.747 306.814 583.742 318.883 576.773L530.167 454.741C542.235 447.771 549.668 434.892 549.666 420.954L549.663 394.093Z" fill="#F5F5F5"/>
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="49" y="16" width="501" height="567">
    <path d="M549.663 394.093L549.631 203.911L549.627 176.964C549.623 163.027 542.188 150.151 530.116 143.184L318.792 21.2234C306.723 14.2567 291.852 14.2589 279.783 21.23L68.4995 143.26C56.431 150.23 48.9989 163.109 49 177.046L49.0044 203.91L49.0365 394.092L49.0409 421.039C49.0431 434.975 56.4796 447.852 68.5503 454.818L279.874 576.78C291.946 583.747 306.814 583.742 318.883 576.773L530.167 454.741C542.235 447.771 549.668 434.892 549.666 420.954L549.663 394.093Z" fill="#324A5E"/>
    </mask>
    <g mask="url(#mask0)">
    <path d="M461.5 15.9995L352.19 15.9995L181.5 299.574L352.534 582L460.81 582L290.81 299.574L461.5 15.9995Z" fill="#324A5E"/>
    </g>
  </svg>
  : <svg {...props} viewBox="0 0 599 599" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M549.663 394.093L549.631 203.911L549.627 176.964C549.623 163.027 542.188 150.151 530.116 143.184L318.792 21.2234C306.723 14.2567 291.852 14.2589 279.783 21.23L68.4995 143.26C56.431 150.23 48.9989 163.109 49 177.046L49.0044 203.91L49.0365 394.092L49.0409 421.039C49.0431 434.975 56.4796 447.852 68.5503 454.818L279.874 576.78C291.946 583.747 306.814 583.742 318.883 576.773L530.167 454.741C542.235 447.771 549.668 434.892 549.666 420.954L549.663 394.093Z" fill="#324A5E"/>
  <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="49" y="16" width="501" height="567">
  <path d="M549.663 394.093L549.631 203.911L549.627 176.964C549.623 163.027 542.188 150.151 530.116 143.184L318.792 21.2234C306.723 14.2567 291.852 14.2589 279.783 21.23L68.4995 143.26C56.431 150.23 48.9989 163.109 49 177.046L49.0044 203.91L49.0365 394.092L49.0409 421.039C49.0431 434.975 56.4796 447.852 68.5503 454.818L279.874 576.78C291.946 583.747 306.814 583.742 318.883 576.773L530.167 454.741C542.235 447.771 549.668 434.892 549.666 420.954L549.663 394.093Z" fill="#324A5E"/>
  </mask>
  <g mask="url(#mask0)">
  <path d="M461.5 15.9997L352.19 15.9996L181.5 299.574L352.534 582L460.81 582L290.81 299.574L461.5 15.9997Z" fill="#F5F5F5"/>
  </g>
  </svg>
  

const Home = props => {
  const { data: { sites, site, loading, error, ...data } } = props
  return (
    <div className="Home">
      <Header>
        <div className="cover bg-left bg-center-l">
          <div className="bg-black-80 pb5 pb6-m pb7-l">
            <nav className="dt w-100 mw8 center"> 
              <div className="dtc w2 v-mid pa3">
                <a href="/" className="dib flex items-center h2 pa1 yellow grow-large no-underline b">
                  <BrandIcon className='dib' width="32" height="32" dark />

                  <span className='div'>Graze</span>
                </a>
              </div>
              <div className="dtc v-mid tr pa3">
                {site.pages.map(page => (
                  <Link className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to={`/${page.slug}`} >{page.title}</Link> 
                ))}
                <a className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba" href="https://github.com/elis/graze">GitHub</a> 
              </div>
            </nav> 
            <div className="tc-l mt4 mt5-m mt6-l ph3">
              <div className="mw9 center ph3-ns">
                <div className="cf ph2-ns">
                  <div className="fl w-100 w-50-ns pa2">
                    <h1 className="f2 f1-l fw2 white-90 mb0 lh-title"><Mark>{site.homepage.cover.mainTitle}</Mark></h1>
                    <h2 className="fw1 f3 white-80 mt3 mb4"><Mark>{site.homepage.cover.secondaryText}</Mark></h2>
                    {site.homepage.cover.callToActios && site.homepage.cover.callToActios.map((link, index) => (
                      !index
                        ? (
                          <React.Fragment>
                            <Link className="f6 no-underline grow pointer dib v-mid bg-light-purple white ba b--light-purple ph3 pv2 mb3 br2" to={link.url}>{link.label}</Link>
                            <span className="dib v-mid ph3 white-70 mb3">or</span>
                          </React.Fragment>
                        )
                        : (
                          <Link className="f6 no-underline grow pointer dib v-mid light-purple br2 ba b--light-purple ph3 pv2 mb3" to={link.url}>{link.label}</Link>
                        )
                    ))}
                  </div>
                  <div className="fl w-100 w-50-ns pa2">
                    <div className='p2 flex items-center'>
                      <BrandIcon style={{width: '100%', height: 'auto'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </Header>
      <Content>
        <article className="mw7 center pa3 pa5-ns"><Mark>{site.homepage.content}</Mark></article>
      </Content>

      <ul className="Home-resources">
        <li>
          <a href="https://github.com/elis/graze">Docs</a>
        </li>
        <li>
          <a href="https://github.com/elis/graze/issues">Issues</a>
        </li>
      </ul>
    </div>
  )
}

const Header = tachyon('header')`
  sans-serif
`

const Sites = styled.pre`
  text-align: left;
  border: 20px solid #F0F;
`

const Content = styled(tachyon('article')`
bg-near-white dark-gray bt b--blue avenir
`)`
  pre {
    overflow-x: auto;
  }
`

const page = gql`
  query {
    site (where: {
      name: "root"
    }) {
      updatedAt
      createdAt
      id
      name
      description
      pages {
        id
        slug
        title
      }
      homepage {
        content
        links {
          label
          url
        }
        cover {
          mainTitle
          secondaryText
          callToActions {
            label
            url
          }
        }
      }
    }
  }


`

export default graphql(page)(Home)
