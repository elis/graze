import React from 'react'
import styled from 'styled-components'
import PageCover from '../../../page-cover'
import { Helmet } from 'react-helmet'

export default (props) => {
  const Art = require('./graze-ecosystem-art').default
  return <React.Fragment>
    <Helmet>
      <meta name="msapplication-TileColor" content="#333" />
      <meta name="theme-color" content="#333" />
    </Helmet>
    <CoverEl {...props} />
  </React.Fragment>
}

const CoverEl = styled(PageCover)`
  .flex {
    display: flex;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  @media screen and (min-width: 60rem) {
    .w-50-ns {
      width: 50%;
      flex: 1 1 auto;
    }
  }
  .art {
    mask-image: none;
    margin: 0;
    transform: none;
    > svg {
      /* max-width: 620px; */
      /* margin: 0 auto; */
      /* max-height: 100%; */
      display: inline-block;
    }
    @media screen and (max-width: 60rem) {
      margin: -6rem auto 0;
      > svg {
        /* margin-right: -12rem; */
      }
    }
    .graze {
      /* transform: translateX(2rem) scale(1.5); */
      animation: fillin 820ms ease-out 0s 1;
      transform: scale(1) translateX(2rem);
    }
    @keyframes fillin {
      from {
        transform: translateX(-48rem) translateY(-48rem) scale(3);
      } to {
        transform: translateX(2rem) scale(1);
      }
    }
    .graphcms,
    .heroku,
    .github,
    .js,
    .nodejs,
    .react {
      transform: translateX(2rem);
      opacity: 0;
      animation: 7s breath infinite alternate;
    }
    .graphcms {
      animation-delay: 1s;
    }
    .heroku {
      animation-delay: 2s;
    }
    .github {
      animation-delay: 3s;
    }
    .js {
      animation-delay: 4s;
    }
    .nodejs {
      animation-delay: 5s;
    }
    .react {
      animation-delay: 6s;
    }
  }

  @keyframes breath {
    0% {
      opacity: 0.3;
    }
    25% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`

export { transformModel } from '../../../page-cover'