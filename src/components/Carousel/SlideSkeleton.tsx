import styled, { keyframes } from 'styled-components'
import { themeColor } from '../../theme'

const opacitySkeleton = keyframes`
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
    }
`

export default styled.div`
  width: 100%;
  height: 100%;
  background: ${themeColor('dark')};
  animation: ${opacitySkeleton} 1s linear infinite forwards;
  position: relative;
`
