import { useAuth } from 'hooks/auth'
import React from 'react'
import { Redirect, Route as DOMRoute, RouteProps } from 'react-router-dom'

interface Props extends RouteProps {
  isPrivate?: boolean
  component: React.ComponentType
}

export const Route = ({
  isPrivate = false,
  component: Component,
  ...props
}: Props) => {
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
