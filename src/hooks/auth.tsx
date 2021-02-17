import { createContext, useCallback, useContext, useState } from 'react'
import { api } from 'services'

type Props = {
  children: React.ReactNode
}

type User = {
  id: string
  name: string
  email: string
  avatar_url: string
}

type Credetials = {
  email: string
  password: string
}

type AuthData = {
  user: User
  signIn(credentials: Credetials): Promise<void>
  signOut(): void
  updateUser(user: User): void
}

type AuthState = {
  token: string
  user: User
}

const AuthContext = createContext<AuthData>({} as AuthData)

export const AuthProvider = ({ children }: Props) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber: token')
    const user = localStorage.getItem('@GoBarber: user')

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`

      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    localStorage.setItem('@GoBarber: token', token)
    localStorage.setItem('@GoBarber: user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber: token')
    localStorage.removeItem('@GoBarber: user')

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@GoBarber: user', JSON.stringify(user))

      setData({
        token: data.token,
        user: {
          ...data.user,
          ...user,
        },
      })
    },
    [data],
  )

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
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
