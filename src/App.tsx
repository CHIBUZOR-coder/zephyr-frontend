import { Outlet } from 'react-router-dom'
import { useAuthSession } from './features/auth/useAuthSession'

function App () {
  useAuthSession()

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
