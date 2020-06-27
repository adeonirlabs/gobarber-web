import { Dashboard, Login, Signup } from 'pages'
import React, { FC } from 'react'
import { Switch } from 'react-router-dom'

import { Route } from './Route'

export const Routes: FC = () => (
  <Switch>
    <Route path="/" component={Login} exact />
    <Route path="/signup" component={Signup} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
)
