import React, { FC } from 'react'

import { AuthProvider } from './auth'
import { ToastProvider } from './toast'

export const AppProvider: FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
)
