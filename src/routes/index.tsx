import { Dashboard, ForgotPassword, ResetPassword, SignIn, SignUp } from 'pages'
import { Switch } from 'react-router-dom'

import { Route } from './Route'

export const Routes = () => (
  <Switch>
    <Route path="/" component={SignIn} exact />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
)
