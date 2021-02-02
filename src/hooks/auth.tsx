import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from 'react'
import { api } from 'services'

interface Credetials {
  email: string
  password: string
}

interface AuthData {
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: object
  login(credentials: Credetials): Promise<void>
  logout(): void
}

interface AuthState {
  token: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  user: object
}

const AuthContext = createContext<AuthData>({} as AuthData)

export const AuthProvider: FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber: token')
    const user = localStorage.getItem('@GoBarber: user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const login = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    localStorage.setItem('@GoBarber: token', token)
    localStorage.setItem('@GoBarber: user', JSON.stringify(user))

    setData({ token, user })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('@GoBarber: token')
    localStorage.removeItem('@GoBarber: user')

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthData => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'O hook useAuth precisa ser passado dentro de um AuthProvider',
    )
  }

  return context
}
