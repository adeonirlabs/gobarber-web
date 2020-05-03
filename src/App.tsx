import React, { FC } from 'react'
import GlobalStyle from 'styles/global'

import { Login, Signup } from 'pages'

export const App: FC = () => (
  <>
    <GlobalStyle />
    <Signup />
  </>
)
