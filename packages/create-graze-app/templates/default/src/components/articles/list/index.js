import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default ({ title, children, className, ...props }) => {
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
      .map(({ slug, ...props }) => ({
        ...props,
        slug: inputs.articleSlug ? `${inputs.articleSlug}/${slug}` : slug
      }))
      .map((props, index) => (
        <Article key={`article tm ${index}`} {...props} />
      ))
  }
)

export const Article = ({ slug, title, subtitle, art, children, ...props }) => (
  <ArticleItem className='bb b--black-10' key={`article ${slug}`}>
    <Link to={slug} className='db pv4 ph3 ph0-l no-underline black dim' href='#0'>
      <div className='flex flex-column flex-row-ns'>
        <div className='mb4 mb0-ns w-100 w-40-ns art' style={{ backgroundImage: `url(${art})` }} />
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
`
