import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useAuthLogin } from './features/auth/useAuthLogin'
import { useAuthStore } from './features/auth/auth.store'
import { useWalletAuthSync } from './core/hooks/useWalletAuthSync'
import { useAuthRefresh } from './features/auth/useAuthRefresh' // ← NEW
import ErrorBoundary from './shared/components/ErrorBoundary'
import { NavLink, Outlet } from 'react-router-dom'
import { useWalletPersistSync } from './features/wallet/useWalletPersistSync'
import { useTradingModeStore } from './features/dashboard/useTradingModeStore'
import { CustomWalletModal } from './features/dashboard/CustomWalletModal'
import Layout from './shared/Layout/Layout'
import { useGeneralContext } from './Context/GeneralContext'
import VaultFlowModal from './shared/components/Modals/VaultFlowModal'

import type { UserProfile } from './features/users/user.types'
import { useAuthReady } from './features/auth/useAuthReady'
import { API_BASE } from './core/query/authClient'
import { useWalletMismatch } from './core/hooks/useWalletMismatch'
import StateScreen from './shared/components/StateScreen'
import Loader from './shared/components/Loader'
import ScrollToTop from './utils/ScrollToTop'

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
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const authReady = useAuthReady()
  const mismatch = useWalletMismatch()
  const { accessToken } = useAuthStore()

  const handleSignIn = () => {
    if (!publicKey || !signMessage) return

    loginMutation.mutate({
      publicKey: publicKey.toBase58(),
      signMessage
    })
  }

  useEffect(() => {
    if (!authReady) return
    if (!accessToken) return
    if (profile) return

    let cancelled = false

    const fetchMe = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`${API_BASE}/api/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'ngrok-skip-browser-warning': 'true'
          }
        })

        const contentType = res.headers.get('content-type')

        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || 'Unauthorized')
        }

        if (!contentType?.includes('application/json')) {
          const text = await res.text()
          throw new Error(`Expected JSON, got: ${text.slice(0, 200)}`)
        }

        const data = await res.json()

        if (!cancelled) {
          setProfile(data.user)
        }
      } catch (err) {
        console.error('❌ /auth/me failed:', err)
        if (!cancelled) {
          setError('Failed to load profile')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchMe()

    return () => {
      cancelled = true
    }
  }, [authReady, accessToken, profile])

  useEffect(() => {
    if (hydrated && connected && !authenticated) {
      console.log('signing called')
      handleSignIn()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, connected, authenticated])

  const navLinks = [
    { title: 'Dashboard', icon: '/images/dashh.svg', path: '/' },
    { title: 'Live Trade', icon: '/images/livetrade.svg', path: '/livetrade' },
    { title: 'Portfolio', icon: '/images/portfolio.svg', path: '/portfolio' },
    {
      title: 'leaderboard',
      icon: '/images/leaderboard.svg',
      path: '/leaderboard'
    },
    {
      title: 'Support',
      icon: '/images/support.svg',
      mt: true,
      path: '/support'
    },
    { title: 'settings', icon: '/images/settings.svg', path: '/settings' },
    { title: 'Docs', icon: '/images/docs.svg', path: '/docs' }
  ]

  const { masterMode } = useTradingModeStore()
  // const [walletModal, setWalletModal] = useState(false)
  const { walletModal, setWalletModal } = useGeneralContext()
  if (!authReady) {
    return (
      <StateScreen
        title='Restoring session…'
        description='Please wait a moment'
      />
    )
  }

  // if (!accessToken) {
  //   return (
  //     <StateScreen
  //       title='Not authenticated'
  //       description='Please sign in again.'
  //       tone='error'
  //     />
  //   )
  // }

  if (mismatch) {
    return (
      <StateScreen
        title='Wallet mismatch detected'
        description='Please reconnect the wallet you signed in with.'
        tone='error'
      />
    )
  }

  if (loading) {
    return <StateScreen title='Loading profile…' action={<Loader />} />
  }

  if (error) {
    return <StateScreen title='Error' description={error} tone='error' />
  }

  return (
    <div className='bg-primary relative'>
      {masterMode && (
        <div className='call border-b-[4px] border-t-[1.5px] border-l-[1.5px] border-r-[1.5px] shadow-2xl shadow-[#574516] border-[#574516] rounded-3xl fixed bottom-[5.5rem] z-50 left-[1.8rem] lg:left-4  flex justify-center items-center py-2 px-3 gap-2'>
          <div
            className='
  bg-[#fe9a00]
  h-[29px] w-[29px]
  rounded-full
  flex justify-center items-center
  shadow-[0_0_12px_rgba(254,154,0,0.8)]
'
          >
            <span
              style={{ backgroundImage: `url('/images/mode2.svg')` }}
              className='inline-block bg-center bg-cover h-[20px] w-[20px]'
            ></span>
          </div>
          <p className='text-[12px] font-[900] "tracking-[1.636px] uppercase text-white'>
            Call Trade
          </p>
        </div>
      )}

      <ErrorBoundary>
        <div className='flex w-full'>
          <aside className='h-screen w-[16%] bg-[#102221] sticky top-0 left-0 hidden lg:block '>
            <div className='h-[70%] side p-3 lg:flex flex-col gap-6  w-full overflow-y-auto '>
              <div className='flex items-center gap-4'>
                <span
                  className='inline-block bg-center bg-cover w-[40px] h-[40px]'
                  style={{
                    backgroundImage: `url("/images/zeflogo.png")`
                  }}
                ></span>

                <div>
                  <div className='text-[12px] font-[700] text-teal-400'>
                    Zephyr
                  </div>
                  <p className='text-[9px] font-[400] text-[#B0E4DD]'>
                    Social Copy Trading
                  </p>
                </div>
              </div>

              <nav className='flex flex-col gap-3 text-sm relative justify-center items-center'>
                <p className=' h-[0.5px] bg-[#23483b] absolute top-[56.5%] w-full'></p>

                {navLinks.map((item, i) => (
                  <NavLink
                    key={i}
                    to={item.path}
                    className={({ isActive }) =>
                      `${
                        isActive ? 'bg-[#009883]' : ''
                      }  text-left text-white p-2 rounded-lg flex justify-start items-center gap-4 w-full hover:bg-[#009883]/30 transition ease-in-out duration-300 ${
                        item.mt ? 'mt-8' : ''
                      }
          `
                    }
                  >
                    <img src={item.icon} alt={item.title} className='w-5 h-5' />
                    <span>{item.title}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </aside>
          <div className='w-[84%]'>
            <Layout>
              <ScrollToTop />

              <Outlet />
            </Layout>
          </div>
        </div>

        <CustomWalletModal
          open={walletModal}
          onClose={() => setWalletModal(false)}
        />
        <VaultFlowModal />
      </ErrorBoundary>
    </div>
  )
}

export default App
