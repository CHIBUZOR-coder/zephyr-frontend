import { useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useAuthLogin } from './features/auth/useAuthLogin'
import { useAuthStore } from './features/auth/auth.store'
import { useWalletAuthSync } from './core/hooks/useWalletAuthSync'
import { useRestoreAuth } from './core/hooks/useRestoreAuth'
import ErrorBoundary from './shared/components/ErrorBoundary'
import { Outlet } from 'react-router-dom'
import { useWalletPersistSync } from './features/wallet/useWalletPersistSync'
import { useAuthSession } from './features/auth/useAuthSession'
// import { useAuthSession } from './features/auth/useAuthSession'
// import { useAuthSession } from './features/auth/useAuthSession'
// import { useAuthSession } from './features/auth/useAuthSession'

function App () {
  useWalletAuthSync()
  useRestoreAuth()
  useAuthSession()
  useWalletPersistSync()

  const { authenticated, hydrated } = useAuthStore()
  const { publicKey, connected, signMessage } = useWallet()
  const loginMutation = useAuthLogin()

  // const [load, setLoad] = useState(false)

  const handleSignIn = () => {
    if (!publicKey || !signMessage) return

    // console.log('pub', publicKey)
    // console.log('messg:', signMessage)

    loginMutation.mutate({
      publicKey: publicKey.toBase58(),
      signMessage
    })
  }

  useEffect(() => {
    if (hydrated && connected && !authenticated) {
      console.log('siging called')
      handleSignIn()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, connected, authenticated])

  // 🚀 redirect after successful login

  return (
    <div className='bg-primary relative'>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </div>
  )
}

export default App
