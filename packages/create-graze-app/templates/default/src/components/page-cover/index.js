import React from 'react'
import styled from 'styled-components'

export default ({ className, bgColor, children, pitch, art, actions, ...props }) => <header className={`sans-serif ${className}`} {...props}>
  <div className={`cover bg-left bg-center-l`}>
    <div className={`bg-${bgColor || 'black-80'} pb5 pb5-m pb6-l v-mid cnt`}>
      <div className='mw9 center ph4-ns'>
        <CoverSplit className='flex-wrap flex items-center ph2-ns'>
          <CoverPitch className='w-100 w-100-m w-50-ns pa2 pitch'>
            <div className='pv4'>
              <div className='tc-s tc-m dt-s pt4 pt5-p pt4-l ph3'>
                {!pitch && children}
                {pitch && (
                  <React.Fragment>
                    <h1 className='f2 mt0 f1-l fw2 white-90 mb0 lh-title'>{pitch.title}</h1>
                    <h2 className='fw1 f3 white-80 mt3 mb4'>{pitch.subtitle}</h2>
                    <div className='ctas'>
                      {actions && (actions instanceof Array
                        ? actions.map((action, i) => <Action {...action} key={`cover-action ${i}`} />)
                        : actions
                      )}
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
          </CoverPitch>
          <CoverBrand className='w-100 w-100-m w-50-ns v-mid dib center tc art'>
            {art && (typeof art === 'string'
              ? <img src={art} alt={pitch && pitch.title} />
              : art
            )}
          </CoverBrand>
        </CoverSplit>
      </div>
    </div>
  </div>
</header>

export const transformModel = inputs => {
  const fm = require('front-matter')
  const { attributes } = inputs && inputs.content && fm(inputs.content)

  return (inputs && {
    pitch: {
      title: inputs.title,
      subtitle: inputs.subtitle
    },
    actions: attributes && attributes.actions && attributes.actions
      .map(({ label, ...rest }) => ({ children: label, ...rest })),
    art: inputs.art && inputs.art.url // && `https://media.graphcms.com/${inputs.art.handle}`
    // actions:
  })
}
const CoverPitch = styled.div`
  position: relative;
  z-index: 100;
  h1 {
    margin-top: 0;
  }
`

const CoverBrand = styled.div`
`
const CoverSplit = styled.div`
  position: relative;
  z-index: 10;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 60rem) {
    ${CoverBrand} {
      margin-top: -16rem;      
      margin-bottom: -4rem;
      mask-image: linear-gradient(transparent 12%, rgba(255,255,255,1) 62%);
    }
  }
  @media screen and (min-width: 60rem) {
    ${CoverBrand} {
      transform: scale(1.2) translateY(4rem);
      /* /* margin-left: -16rem; */
      margin-left: -6rem;
      /* margin-bottom: -14rem; */
      mask-image: linear-gradient(to right, transparent 12%, rgba(255,255,255,1) 62%);
    }
  }
`

const Action = ({ primary, spacer, ...props }) => {
  if (spacer) {
    return <span className='dib v-mid ph3 white-70 mb3' />
  }

  const { Link } = require('react-router-dom')
  const ActionLink = styled(Link)``
  return (primary
    ? <ActionLink {...props} className='f6 pointer no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3' />
    : <ActionLink {...props} className='f6 pointer no-underline grow dib v-mid white ba b--white ph3 pv2 mb3' />
  )
}
