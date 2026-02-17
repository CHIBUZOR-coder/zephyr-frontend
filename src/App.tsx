import { useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useAuthLogin } from './features/auth/useAuthLogin'
import { useAuthStore } from './features/auth/auth.store'
import { useWalletAuthSync } from './core/hooks/useWalletAuthSync'
import { useAuthRefresh } from './features/auth/useAuthRefresh' // ← NEW
import ErrorBoundary from './shared/components/ErrorBoundary'
import { Outlet } from 'react-router-dom'
import { useWalletPersistSync } from './features/wallet/useWalletPersistSync'
// ❌ REMOVE these imports:
// import { useRestoreAuth } from './core/hooks/useRestoreAuth'
// import { useAuthSession } from './features/auth/useAuthSession'

function App () {
  useWalletAuthSync()
  useAuthRefresh() // ← Replaces useRestoreAuth + useAuthSession
  useWalletPersistSync()

  const { authenticated, hydrated } = useAuthStore()
  const { publicKey, connected, signMessage } = useWallet()
  const loginMutation = useAuthLogin()

  const handleSignIn = () => {
    if (!publicKey || !signMessage) return

    loginMutation.mutate({
      publicKey: publicKey.toBase58(),
      signMessage
    })
  }

  useEffect(() => {
    if (hydrated && connected && !authenticated) {
      console.log('signing called')
      handleSignIn()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, connected, authenticated])

  return (
    <div className='bg-primary relative'>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </div>
  )
}

export default App
