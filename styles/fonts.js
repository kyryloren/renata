import localFont from 'next/font/local'

const manrope = localFont({
  adjustFontFallback: 'Arial',
  variable: '--font',
  preload: true,
  src: [
    {
      path: '../public/fonts/Manrope-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Manrope-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Manrope-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
})

export default manrope
