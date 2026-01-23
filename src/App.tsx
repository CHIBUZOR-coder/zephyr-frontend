import { Outlet } from 'react-router-dom'
// import { useAuthSession } from './features/auth/useAuthSession'
import { useWalletAuthSync } from './core/hooks/useWalletAuthSync'
import { useRestoreAuth } from './core/hooks/useRestoreAuth'


function App () {


  // useAuthSession()
  useWalletAuthSync()
  useRestoreAuth()






  return (
    <>
      <Outlet />
    </>
  )
}

export default App
