import { AppProvider } from 'hooks'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from 'routes'
import GlobalStyle from 'styles/global'

export const App = () => (
  <Router>
    <GlobalStyle />
    <AppProvider>
      <Routes />
    </AppProvider>
  </Router>
)
