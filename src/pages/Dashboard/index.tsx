import { Button } from 'components'
import { useAuth } from 'hooks/auth'

export const Dashboard = () => {
  const { signOut } = useAuth()

  return (
    <div style={{ width: 200 }}>
      <h1>Dashboard</h1>
      <Button onClick={signOut}>Sair</Button>
    </div>
  )
}
