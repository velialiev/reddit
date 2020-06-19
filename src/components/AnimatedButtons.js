import React from 'react'
import { Button } from 'antd'
import Column from './Column'
import styled from 'styled-components'

const AnimatedButtons = ({ buttons, loadings, onClick }) => {
  return (
    <Column mb="10px">
      {
        buttons.map(({ name }) => (
          <AnimatedButton
            key={name}
            disabled={loadings[name]}
            loading={loadings[name]}
            onClick={() => onClick(name)}
          >
            { name }
          </AnimatedButton>
        ))
      }
    </Column>
  )
}

const AnimatedButton = styled(Button)`
  @keyframes foo {
    0% {
      transform: translate(0px);  
    }
    
    50% {
      transform: translate(500px);
    }
    
    100% {
      transform: translate(0px);
    }
  }
  
  animation: 10s foo infinite linear;
  
  &:hover {
    animation-play-state: paused;
  }
`

export default AnimatedButtons
