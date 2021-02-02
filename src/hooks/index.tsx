import { AuthProvider } from './auth'
import { ToastProvider } from './toast'

type Props = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: Props) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
)
