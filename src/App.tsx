import { Outlet } from 'react-router-dom'
import { useAuthSession } from './features/auth/useAuthSession'
import { useWalletAuthSync } from './core/hooks/useWalletAuthSync'

function App () {
  useAuthSession()
  useWalletAuthSync()


  return (
    <>
      <Outlet />
    </>
  )
}

export default App
