'use client'

import { css, styled } from 'styled-components'
import media from './media'

export const CONTAINER_VALUES = {
  desktop: {
    left: '2vw',
    right: '2vw',
  },
  mobile: {
    left: '1rem',
    right: '1rem',
  },
}

export const ContainerPaddingLeft = css`
  padding-left: ${CONTAINER_VALUES.desktop.left};
  ${media.tablet`padding-left: ${CONTAINER_VALUES.mobile.left};`};
`
export const ContainerPaddingRight = css`
  padding-right: ${CONTAINER_VALUES.desktop.right};
  ${media.tablet`padding-right: ${CONTAINER_VALUES.mobile.right};`};
`

const Container = styled.div`
  width: 100%;
  height: ${({ _height }) => (_height ? _height : 'inherit')};
  margin-right: auto;
  margin-left: auto;
  ${ContainerPaddingLeft}
  ${ContainerPaddingRight}
`

export default Container
