import React from 'react'
import styled from 'styled-components'

const Column = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  
  * {
    margin-bottom: ${props => props.mb};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`

export default Column
