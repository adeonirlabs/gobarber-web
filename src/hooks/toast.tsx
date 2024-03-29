import { Toast } from 'components'
import { createContext, useCallback, useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

type Props = {
  children: React.ReactNode
}

type ToastData = {
  addToast(message: Omit<ToastMessage, 'id'>): void
  removeToast(id: string): void
}

export interface ToastMessage {
  id: string
  type?: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
}

const ToastContext = createContext<ToastData>({} as ToastData)

export const ToastProvider = ({ children }: Props) => {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid()

      const toast = {
        id,
        type,
        title,
        description,
      }

      setMessages((state) => [...state, toast])
    },
    [],
  )

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <Toast messages={messages} />
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastData => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error(
      'O hook useToast precisa ser passado dentro de um ToastProvider',
    )
  }

  return context
}
