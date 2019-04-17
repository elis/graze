import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default ({title, children, className, ...props}) => {
  return (
    <ArticlesList className={`mw7 center avenir ${className}`}>
      <h2 className='evenir fw1 ph3 ph0-l'>{title}</h2>
      {children}
    </ArticlesList>
  )
}

export const transformModel = inputs => (
  {
    title: inputs.title,
    children: inputs.articles.map(transformArticleModel)
      .map(({slug, ...props}) => ({
        ...props,
        slug: inputs.articleSlug ? `${inputs.articleSlug}/${slug}` : slug
      }))
      .map((props, index) => (
        <Article key={`article tm ${index}`} {...props} />
      ))
  }
)

export const Article = ({slug, title, subtitle, art, children, ...props}) => (
  <ArticleItem className='bb b--black-10' key={`article ${slug}`}>
    <Link to={slug} className='db pv4 ph3 ph0-l no-underline black dim' href='#0'>
      <div className='flex flex-column flex-row-ns'>
        <div className='mb4 mb0-ns w-100 w-40-ns art' style={{backgroundImage: `url(${art})`}} />
        <div className='pr4-ns pad' />
        <div className='w-100 w-60-ns pitch'>
          <h1 className='f3 fw1 evenir mt0 lh-title'>{title}</h1>
          <p className='f6 f5-l lh-copy'>
            {subtitle}
          </p>
          {children}
        </div>
      </div>
    </Link>
  </ArticleItem>
)

export const transformArticleModel = inputs => (
  {
    title: inputs.title,
    subtitle: inputs.description,
    art: inputs.previewArt && inputs.previewArt.url,
    slug: inputs.slug
})

const ArticleItem = styled.article`
  .art {
    max-height: 240px;
    display: flex;
    flex-direction: column;
    background: none no-repeat;
    background-attachment: fixed;
    background-size: 0 0;
    min-height: 12rem;


    position: relative;
    &::after {
      position: absolute;
      left: 0; right: 0;
      top: 0; bottom: 0;
      content: "";
      /* background: contain center center no-repeat; */
      background-image: inherit;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }
    > img {  
      display: block;

      height: -webkit-fill-available;
      margin: 0 auto;
      width: auto;
      flex: 1 1 auto;
      visibility: hidden;
    }
  }
  &:nth-child(odd) {
    .art {
      order: 3;
    }
    .pad {
      order: 2;
    }
    .pitch {
      order: 1;
    }
  }
`

const ArticlesList = styled.section`
  max-width: 48rem;
.bt {
    border-top-style: solid;
    border-top-width: 1px;
}

.bb {
  border-bottom-style: solid;
  border-bottom-width: 1px;
  &:last-of-type {
      border-bottom: 0;
  }
}

.b--black-10 {
    border-color: rgba(0, 0, 0, .1);
}

.db {
    display: block;
}

.flex {
    display: flex;
}

.flex-column {
    flex-direction: column;
}

.avenir {
    font-family: 'avenir next', avenir, sans-serif;
}

.fw1 {
    font-weight: 100;
}

.lh-title {
    line-height: 1.25;
}

.lh-copy {
    line-height: 1.5;
}

.mw7 {
    max-width: 48rem;
}

.black {
    color: #000;
}

.pv4 {
    padding-top: 2rem;
    padding-bottom: 2rem;
}

.ph3 {
    padding-left: 1rem;
    padding-right: 1rem;
}

.mb4 {
    margin-bottom: 2rem;
}

.mt0 {
    margin-top: 0;
}

.mv0 {
    margin-top: 0;
    margin-bottom: 0;
}

.no-underline {
    text-decoration: none;
}

.f3 {
    font-size: 1.5rem;
}

.f6 {
    font-size: .875rem;
}

.center {
    margin-right: auto;
    margin-left: auto;
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

@media screen and (min-width: 30em) {
    .flex-row-ns {
        flex-direction: row;
    }

    .w-40-ns {
        width: 40%;
    }

    .w-60-ns {
        width: 60%;
    }

    .pl3-ns {
        padding-left: 1rem;
    }

    .pr3-ns {
        padding-right: 1rem;
    }

    .mb0-ns {
        margin-bottom: 0;
    }
}

@media screen and (min-width: 60em) {
    .ph0-l {
        padding-left: 0;
        padding-right: 0;
    }

    .f5-l {
        font-size: 1rem;
    }
}
`