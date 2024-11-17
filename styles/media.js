'use client'

import { css } from 'styled-components'

export const breakpoints = {
  desktopXL: 1920,
  desktopL: 1440,
  desktopM: 1200,
  desktop: 1000,
  tabletL: 900,
  tablet: 820,
  tabletS: 767,
  phoneL: 600,
  phoneM: 500,
  phone: 440,
  phoneS: 375,
}

// iterate through the sizes and create a media template
export const media = Object.keys(breakpoints).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = breakpoints[label] / 16
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `
  return accumulator
}, {})

export function pxCutOff(px) {
  return `${(px / breakpoints.desktopL) * 100}vw;`
}
export function reversePxCutOff(vw) {
  return `${(vw * breakpoints.desktopL) / 100}px;`
}
export function borderImage() {
  return css`
    border-radius: ${pxCutOff(30)};

    ${media.desktopL`border-radius: 30px;`}
  `
}

export default media
