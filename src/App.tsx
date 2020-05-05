import { AppProvider } from 'hooks'
import { Login } from 'pages'
import React, { FC } from 'react'
import GlobalStyle from 'styles/global'

export const App: FC = () => (
  <>
    <GlobalStyle />
    <AppProvider>
      <Login />
    </AppProvider>
  </>
)
