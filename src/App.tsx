import { AppProvider } from 'hooks'
import React, { FC } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from 'routes'
import GlobalStyle from 'styles/global'

export const App: FC = () => (
  <Router>
    <GlobalStyle />
    <AppProvider>
      <Routes />
    </AppProvider>
  </Router>
)
