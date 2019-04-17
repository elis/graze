import React from 'react'
import styled from 'styled-components'

export default props => <LoadingEl>
  <h1>Loading...</h1>
</LoadingEl>

const LoadingEl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255,255,255, 0.6);
`