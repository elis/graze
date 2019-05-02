import React from 'react'
import styled from 'styled-components'
import Mark from 'react-markdown'
import CTA from 'components/cta'
import { renderToStaticMarkup } from 'react-dom/server'

import InfoIcon from '@material-ui/icons/InfoOutlined'

export const DocsRoot = () => {
  return (
    <>
      
    </>
  )
}

export const ProTip = props => (
  <TipEl className='mw7 lh-copy flex mv3'>
    <IconContainer className='ph3 pv2'><InfoIcon /></IconContainer>
    <Content className='ph2 pv2'>
      {props.title && (<Mark>{props.title}</Mark>)}
      {(props.children && (props.children.length > 0 || typeof props.children !== 'string'))
        ? (
          props.children
        )
        : (
          <Mark>{props.children}</Mark>
        )
      }
    </Content>
  </TipEl>
)

const JsxString = (component, counter = 0) => {
  let type = component.type.name;
  let props = component.props;
  let propsString = "";
  for (let key in props) {
    if (key !== "children") {
      let propValue = props[key];
      let value = "";
      if (propValue instanceof Object) {
        value = `{${JSON.stringify(propValue).replace(/['"]+/g, '')}}`;
      } else {
        value = `"${propValue}"`;
      }
      propsString += ` ${key}=${value}`;
    }
  }
  if (props.children) {
    counter += 2;
    var children = JsxString(props.children, counter);
    return `<${type}${propsString}>
${Array(counter).join(" ")}  ${children}
${Array(counter).join(" ")}</${type}>`;
  }
  return `<${type}${propsString} />`;
}

const Content = styled.article`
  > :first-child {
    margin-top: 0;
  }

`
const IconContainer = styled.div`
  color: #333;
  > svg {
    width: 32px;
    height: 32px;
    path {
      /* fill: #F0F; */
    }
  }
  > span {
    display: inline-block;
    font-size: 32px;
  }
`

const TipEl = styled.aside`
  border: 1px solid rgba(0,0,0, 0.3);
  border-radius: 4px;
  background: rgba(0,0,0, 0.02);
`