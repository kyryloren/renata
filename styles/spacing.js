'use client'

import { css } from 'styled-components'
import media, { pxCutOff } from './media'

const spacing = css`
  /* @link https://utopia.fyi/space/calculator?c=375,18,1.2,1440,20,1.25,5,2,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12 */

  --space-3xs: ${pxCutOff(5)};
  --space-2xs: ${pxCutOff(10)};
  --space-xs: ${pxCutOff(15)};
  --space-s: ${pxCutOff(20)};
  --space-m: ${pxCutOff(30)};
  --space-l: ${pxCutOff(40)};
  --space-xl: ${pxCutOff(60)};
  --space-2xl: ${pxCutOff(80)};
  --space-3xl: ${pxCutOff(120)};

  /* One-up pairs */
  --space-3xs-2xs: ${pxCutOff(10)};
  --space-2xs-xs: ${pxCutOff(15)};
  --space-xs-s: ${pxCutOff(20)};
  --space-s-m: ${pxCutOff(30)};
  --space-m-l: ${pxCutOff(40)};
  --space-l-xl: ${pxCutOff(60)};
  --space-xl-2xl: ${pxCutOff(80)};
  --space-2xl-3xl: ${pxCutOff(120)};
  --space-4xl: ${pxCutOff(160)};

  /* Custom pairs */
  --space-s-l: ${pxCutOff(40)};

  ${media.desktopL`
    /* Space 3xs: 5px → 5px */
    --space-3xs: clamp(0.3125rem, 0.3125rem + 0vw, 0.3125rem);
    /* Space 2xs: 9px → 10px */
    --space-2xs: clamp(0.5625rem, 0.5405rem + 0.0939vw, 0.625rem);
    /* Space xs: 14px → 15px */
    --space-xs: clamp(0.875rem, 0.853rem + 0.0939vw, 0.9375rem);
    /* Space s: 18px → 20px */
    --space-s: clamp(1.125rem, 1.081rem + 0.1878vw, 1.25rem);
    /* Space m: 27px → 30px */
    --space-m: clamp(1.6875rem, 1.6215rem + 0.2817vw, 1.875rem);
    /* Space l: 36px → 40px */
    --space-l: clamp(2.25rem, 2.162rem + 0.3756vw, 2.5rem);
    /* Space xl: 54px → 60px */
    --space-xl: clamp(3.375rem, 3.243rem + 0.5634vw, 3.75rem);
    /* Space 2xl: 72px → 80px */
    --space-2xl: clamp(4.5rem, 4.3239rem + 0.7512vw, 5rem);
    /* Space 3xl: 108px → 120px */
    --space-3xl: clamp(6.75rem, 6.4859rem + 1.1268vw, 7.5rem);
    /* Space 4xl: 144px → 160px */
    --space-4xl: clamp(9rem, 8.6479rem + 1.5023vw, 10rem);

    /* One-up pairs */
    /* Space 3xs-2xs: 5px → 10px */
    --space-3xs-2xs: clamp(0.3125rem, 0.2025rem + 0.4695vw, 0.625rem);
    /* Space 2xs-xs: 9px → 15px */
    --space-2xs-xs: clamp(0.5625rem, 0.4305rem + 0.5634vw, 0.9375rem);
    /* Space xs-s: 14px → 20px */
    --space-xs-s: clamp(0.875rem, 0.743rem + 0.5634vw, 1.25rem);
    /* Space s-m: 18px → 30px */
    --space-s-m: clamp(1.125rem, 0.8609rem + 1.1268vw, 1.875rem);
    /* Space m-l: 27px → 40px */
    --space-m-l: clamp(1.6875rem, 1.4014rem + 1.2207vw, 2.5rem);
    /* Space l-xl: 36px → 60px */
    --space-l-xl: clamp(2.25rem, 1.7218rem + 2.2535vw, 3.75rem);
    /* Space xl-2xl: 54px → 80px */
    --space-xl-2xl: clamp(3.375rem, 2.8028rem + 2.4413vw, 5rem);
    /* Space 2xl-3xl: 72px → 120px */
    --space-2xl-3xl: clamp(4.5rem, 3.4437rem + 4.507vw, 7.5rem);
    /* Space 3xl-4xl: 108px → 160px */
    --space-3xl-4xl: clamp(6.75rem, 5.6056rem + 4.8826vw, 10rem);

    /* Custom pairs */
    /* Space s-l: 18px → 40px */
    --space-s-l: clamp(1.125rem, 0.6408rem + 2.0657vw, 2.5rem);
  `}
`

export default spacing
