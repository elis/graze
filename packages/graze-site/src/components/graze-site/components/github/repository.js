import React from 'react'
import styled from 'styled-components'
import Mark from 'react-markdown'

const NewRepo = ({ className, features, ...props }) => {
  const octohex = require('./octohex.svg')
  return (
    <section className={`sans-serif ${className || ''}`}>
      <div className={`cover bg-left bg-center-l`}>
        <BgContainer className={`bg-${'washed-blue'} pb5 pb5-m pb6-l v-mid cnt`}>
          <div className='mw9 center ph2-ns'>
            <div className='art flex'>
              <img src={octohex} className='dib center w5' alt='HexOctoCat' />
            </div>
            <div className='description flex flex-wrap w-100'>
              {features && features.length && features
                .map(feature => ({ ...feature, ...require('front-matter')(feature.description) }))
                .map(feature => ({ ...feature, attributes: require('../../../../site').compileAttributes(feature.attributes, props) }))
                .map((f, i) => (
                  <Feature key={`github feature ${i}`} index={i} feature={f} />
                ))
              }
            </div>
          </div>
        </BgContainer>
      </div>
    </section>
  )
}

export const Feature = ({ index, feature, className, ...props }) => (
  <FeatureEl className={`w-third-ns avenir ph2-l ph2 ${!index ? 'w-100-m tl tc-m' : 'w-50-m ph2'} ${className || ''}`}>
    <h3>{feature.title}</h3>
    <div className='desc'><Mark escapeHtml={false}>{feature.body}</Mark></div>
    {!index && feature.attributes && feature.attributes.repos && (
      <div className='repos flex flex-wrap'>
        {Object.entries(feature.attributes.repos)
          .map(([i, repo]) => Object.entries(repo))
          .map(([[repo, attrs]]) => ([repo, attrs]))
          .map(([repo, attrs], index) => (
            console.log(`::`, 'Repo:', { repo, attrs }) ||
            <GitHubRepo key={`repo ${index}`} repo={repo} {...attrs} className='w-100 mr2-m ml2-m mb2 mt2' />
          ))
        }
      </div>
    )}
  </FeatureEl>
)

export default NewRepo

const FeatureEl = styled.article`
  .desc {
    a {
      color: #357EDD;
      text-decoration: none;
    }
    h3, h4 {
      margin: 0;
      padding-top: 2rem;
    }
    > p {
      margin: 0 auto;
      line-height: 1.5;
      padding: 1.25rem 0;
      max-width: 30em;
    }
    blockquote {
      font-family: athelas, georgia, serif;
      margin-left: 0;
      margin-top: 0;
      padding: 1.25rem 0;
      padding-left: 2rem;
      padding-right: 1rem;
      color: rgba(0, 0, 0, .9);
      border-left-style: solid;
      border-left-width: 1px;
      border-width: .25rem;
      border-color: #408bc9;
      text-align: left;
      background: #333;
      color: #EEE;
      /* font-size: 1.23rem; */
      p {
        font-size: 1rem;
        line-height: 1.5;
        max-width: 30em;
        margin-top: 0;

        @media screen and (min-width: 30em) and (max-width: 60em) {
          font-size: 1.25rem;
        }
        @media screen and (min-width: 60em) {
          font-size: 1.5rem;
        }
      }
      cite {
        font-size: .875rem;
        text-transform: uppercase;
        letter-spacing: .1em;
        font-style: normal;

      }
    }
  }
  .repos {
    @media (max-width: 60rem) {
    }
  }
`

const BgContainer = styled.div`
  border-top: 1px solid #96CCFF;
  border-bottom: 1px solid #96CCFF;
  .art {
    > img {
      height: 14rem;
    }
  }
`

const GitHubRepo = ({ repo, description, github, npm, art, className, ...props }) => (
  console.log(`==`, 'Repo:', { repo, description, github, art, className, npm }) ||
  <GitHubBookmark className={`b-silver bg-white flex mr2 ml2 center ${className}`}>
    <div className='pitch w-50 tl ph2 pv3'>
      <h4 className='f6 pb2'><a href={`http://github.com/${github || repo}`}>{repo}</a></h4>
      <p className='f6 lh-copy pb2'><Mark>{description}</Mark></p>
      <div className='github f6'>
        <img src={require('./octohex.svg')} alt='Graze GitHub HexaOctoCat' />
        <a className='db' href={`http://github.com/${github || repo}`}>
          {`github.com/${repo}`}
        </a>
      </div>
      {npm && (
        <div className='npm f6'>
          <img src={require('./npm.svg')} alt='NPM Repository' />
          <a className='db' href={`https://www.npmjs.com/package/${npm}`}>
            {`npmjs.com/package/${npm}`}
          </a>
        </div>
      )}
    </div>
    <div className='art w-50' style={{ backgroundImage: `url(${art})` }}>
      {/* <img src={art} className={repo} className='dib' /> */}
    </div>
  </GitHubBookmark>
)

const GitHubBookmark = styled.section`
  border-radius: 8px;
  border: 1px solid #CCC;
  a {
    color: #357EDD;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .art {
    overflow: hidden;
    border-radius: 0 8px 8px 0;
    background-size: cover;
    background-position: center center;
    > img {
      /* max-width: 100%;
      max-height: inherit; */
      height: 100%;
      max-width: 100%;
    }
  }
  .pitch {
    h4 {
      margin: 0;
    }
    p {
      margin: 0;
    }
    .github, .npm {
      display: flex;
      align-items: center;
      transition: all 120ms ease-out;

      a {
        white-space: nowrap;
        /* height: 1rem; */
        overflow: hidden;
        text-overflow: ellipsis;
        /* word-wrap:  */
      }
      > img {
        transition: all 120ms ease-out;
        width: 2em;
      }
      &:hover {
        > img {
          transform: scale(1.1);
        }
      }
    }
    .npm {
      > img {
        width: 1.4em;
        padding: 0 .3em;
      }
    }
  }
`
