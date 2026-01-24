import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useAuthLogin } from './features/auth/useAuthLogin'
import { useAuthStore } from './features/auth/auth.store'
import { useWalletAuthSync } from './core/hooks/useWalletAuthSync'
import { useRestoreAuth } from './core/hooks/useRestoreAuth'
import ErrorBoundary from './shared/components/ErrorBoundary'


function App () {
  useWalletAuthSync()
  useRestoreAuth()
  // useAuthSession()



  const navigate = useNavigate()
  const { authenticated, hydrated } = useAuthStore()
  const { publicKey, connected, signMessage } = useWallet()
  const loginMutation = useAuthLogin()

  const handleSignIn = async () => {
    if (!publicKey || !signMessage) return

    const message = 'Sign in to Zephyr'
    const encodedMessage = new TextEncoder().encode(message)
    const signatureBytes = await signMessage(encodedMessage)
    const signature = Buffer.from(signatureBytes).toString('base64')

    loginMutation.mutate({
      publicKey: publicKey.toBase58(),
      signature,
      message
    })
  }

  // 🔐 auto sign-in (only when needed)
  useEffect(() => {
    if (hydrated && connected && !authenticated) {
      handleSignIn()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, connected, authenticated]) // 👈 do NOT add handleSignIn

  // 🚀 redirect after successful login
  useEffect(() => {
    if (loginMutation.isSuccess) {
      navigate('/dashboard', { replace: true })
    }
  }, [loginMutation.isSuccess, navigate])

  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  )
}

export default App
