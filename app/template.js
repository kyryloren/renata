'use client'

import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from 'styles'
import { LenisWrapper, Scrollbar } from 'components'
import { useIsTouchDevice } from 'hooks'
import normalTheme from 'styles/themes'

export default function Template({ children }) {
  const touchDevice = useIsTouchDevice()

  return (
    <ThemeProvider theme={normalTheme}>
      <GlobalStyle />
      <LenisWrapper>
        {touchDevice ? null : <Scrollbar />}
        <main>{children}</main>
      </LenisWrapper>
    </ThemeProvider>
  )
}
