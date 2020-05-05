import { ToastMessage, useToast } from 'hooks/toast'
import React, { FC, useEffect } from 'react'
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi'

import { Container } from './styles'

const icons = {
  success: <FiCheckCircle size={24} />,
  error: <FiAlertTriangle size={24} />,
  warning: <FiAlertCircle size={24} />,
  info: <FiInfo size={24} />,
}

interface Props {
  toast: ToastMessage
}

export const ToastWrapper: FC<Props> = ({ toast }) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id)
    }, 4000)

    return () => {
      clearTimeout(timer)
    }
  }, [removeToast, toast.id])

  return (
    <Container type={toast.type} description={!!toast.description}>
      {icons[toast.type || 'info']}
      <div>
        <strong>{toast.title}</strong>
        {!!toast.description && <p>{toast.description}</p>}
      </div>
      <button onClick={() => removeToast(toast.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  )
}
