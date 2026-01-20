import { useWallet } from '@solana/wallet-adapter-react'
import { useAuthLogin } from './useAuthLogin'
import Layout from '../../shared/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const SignInPage = () => {
  const { publicKey, signMessage } = useWallet()
  const loginMutation = useAuthLogin()
  const navigate = useNavigate()

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

  useEffect(() => {
    if (loginMutation.isSuccess) {
      navigate('/dashboard')
    }
  }, [loginMutation.isSuccess, navigate])

  return (
    <Layout>
      <button
        className='bg-blue-500 m-4 rounded-md p-2'
        onClick={handleSignIn}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
      </button>
    </Layout>
  )
}

export default SignInPage
