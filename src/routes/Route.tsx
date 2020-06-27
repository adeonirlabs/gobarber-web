import { useAuth } from 'hooks/auth'
import React, { FC } from 'react'
import { Redirect, Route as DOMRoute, RouteProps } from 'react-router-dom'

interface Props extends RouteProps {
  isPrivate?: boolean
  component: React.ComponentType
}

export const Route: FC<Props> = ({
  isPrivate = false,
  component: Component,
  ...props
}) => {
  const { user } = useAuth()

  return (
    <DOMRoute
      {...props}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        )
      }}
    />
  )
}
