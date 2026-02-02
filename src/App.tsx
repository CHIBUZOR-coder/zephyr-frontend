import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect} from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useAuthLogin } from './features/auth/useAuthLogin'
import { useAuthStore } from './features/auth/auth.store'
import { useWalletAuthSync } from './core/hooks/useWalletAuthSync'
import { useRestoreAuth } from './core/hooks/useRestoreAuth'
import ErrorBoundary from './shared/components/ErrorBoundary'
// import { useAuthSession } from './features/auth/useAuthSession'
// import { useAuthSession } from './features/auth/useAuthSession'
// import { useAuthSession } from './features/auth/useAuthSession'

function App () {
  useWalletAuthSync()
  useRestoreAuth()
  // useAuthSession()

  const navigate = useNavigate()
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
  useEffect(() => {
    if (loginMutation.isSuccess) {
      navigate('/dashboard', { replace: true })
    }
  }, [loginMutation.isSuccess, navigate])

  // useEffect(() => {
  //   setLoad(true)
  //   setTimeout(() => {
  //     setLoad(false)
  //   }, 4000)
  // }, [])
  return (
    <div className='bg-primary relative'>
      {/* <div
        className={` ${
          load ? '' : 'hidden'
        }  absolute top-0 left-0 bg-primary z-50 w-full h-full flex justify-center items-center`}
      >
        <div
          className='w-24 h-24 border-r-[4px] bg-primary border-white fixed top-[50%] flex justify-center items-center rounded-full  animate-spin
'
        >
          <span className="bg-[url('/images/logo.png')] bg-cover bg-center h-16 w-16  animate-spin-slow animate-spin-reverse  "></span>
        </div>
      </div> */}

      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </div>
  )
}

export default App
