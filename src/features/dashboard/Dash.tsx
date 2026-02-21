// import React, { useRef } from 'react'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useEffect, useState } from 'react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { CustomWalletModal } from './CustomWalletModal'
import { WalletMenu } from './WalletMenu'
import { useAuthStore } from '../auth/auth.store'
import { useWalletMismatch } from '../../core/hooks/useWalletMismatch'
import type { UserProfile } from '../users/user.types'
import StateScreen from '../../shared/components/StateScreen'
import { useAuthReady } from '../auth/useAuthReady'
import { useTradingModeStore } from './useTradingModeStore'
import { useNavStore } from './useNavStore'
import NavContent from './dashboardComponents/sidenavPages/NavContent'

const Dashboard: React.FC = () => {
  const { connection } = useConnection()
  const { publicKey, connected } = useWallet()

  const authReady = useAuthReady()
  const { accessToken } = useAuthStore()
  const mismatch = useWalletMismatch()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // const API_BASE = 'https://zephyr-np09.onrender.com'
  const API_BASE = 'https://e621-102-90-98-17.ngrok-free.app'

  const { masterMode, toggleMasterMode } = useTradingModeStore()
  const { activeIndex, setActiveIndex } = useNavStore()

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

  const [balance, setBalance] = useState<number | null>(null)

  const [walletModal, setWalletModal] = useState(false)
  const [walletMenuOpen, setWalletMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!publicKey) return

    await navigator.clipboard.writeText(publicKey.toBase58())

    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  // useEffect(() => {
  //   if (!publicKey) {
  //     setBalance(null)
  //     return
  //   }

  //   (async () => {
  //     const lamports = await connection.getBalance(publicKey)
  //     setBalance(lamports / LAMPORTS_PER_SOL)
  //   })()
  // }, [publicKey, connection])

  useEffect(() => {
    let cancelled = false

    const fetchBalance = async () => {
      if (!publicKey) {
        if (!cancelled) setBalance(null)
        return
      }

      try {
        const lamports = await connection.getBalance(publicKey)
        if (!cancelled) {
          setBalance(lamports / LAMPORTS_PER_SOL)
        }
      } catch {
        if (!cancelled) setBalance(null)
      }
    }

    fetchBalance()

    return () => {
      cancelled = true
    }
  }, [publicKey, connection])

  const navLinks = [
    { tittle: 'Dashboard', icon: '/images/dashh.svg' },
    { tittle: 'Live Trade', icon: '/images/livetrade.svg' },
    { tittle: 'Portfolio', icon: '/images/portfolio.svg' },
    { tittle: 'Leaderboard', icon: '/images/leaderboard.svg' },
    { tittle: 'Support', icon: '/images/support.svg', mt: true },
    { tittle: 'Settings', icon: '/images/settings.svg' },
    { tittle: 'Docs', icon: '/images/docs.svg' }
  ]

  // const prevRef = useRef<HTMLButtonElement | null>(null)
  // const nextRef = useRef<HTMLButtonElement | null>(null)

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
    return <StateScreen title='Loading profile…' />
  }

  if (error) {
    return <StateScreen title='Error' description={error} tone='error' />
  }

  return (
    <div className='min-h-screen bg-[#050A0A] text-gray-200 block md:flex '>
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
          <p className='text-[12px] font-[900] "tracking-[1.636px] uppercase'>
            Call Trade
          </p>
        </div>
      )}

      <div className='px-3 py-2 rounded-lg border bg-[#101B22] border-[#32674B] flex flex-col gap-2 fixed bottom-4 left-5 z-50 w-[130px] text-[9px] font-[400]'>
        <div className='flex items-center gap-2'>
          <span className='bg-[#a1ecbc] animate-pulse h-[6px] w-[6px] rounded-full'></span>
          <p className='text-[#B0E4DD] '>Mainnet Beta</p>
        </div>

        <p className='text-[#FFFFFF99]'>TPS: 2, 451</p>
      </div>
      {/* Sidebar */}
      <aside className='h-screen w-[14%] bg-[#102221] sticky top-0 left-0 hidden lg:block '>
        <div className='h-[70%] side p-3 lg:flex flex-col gap-6  w-full overflow-y-auto '>
          <div className='flex items-center gap-4'>
            <span
              className='inline-block bg-center bg-cover w-[40px] h-[40px]'
              style={{
                backgroundImage: `url("/images/zeflogo.png")`
              }}
            ></span>

            <div>
              <div className='text-[12px] font-[700] text-teal-400'>Zephyr</div>
              <p className='text-[9px] font-[400] text-[#B0E4DD]'>
                Social Copy Trading
              </p>
            </div>
          </div>

          <nav className='flex flex-col gap-3 text-sm relative justify-center items-center'>
            <p className=' h-[0.5px] bg-[#23483b] absolute top-[56.5%] w-full'></p>

            {navLinks.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`${
                  item.mt ? 'mt-8' : ''
                } text-left p-2 rounded-lg flex justify-start items-center gap-4 w-full
            ${activeIndex === i ? 'bg-teal-500/20' : 'hover:bg-teal-500/10'}
          `}
              >
                <img src={item.icon} alt={item.tittle} className='w-5 h-5' />
                <span>{item.tittle}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
      {/* Main */}
      <div className='w-full lg:w-[86%]'>
        {/* Top bar */}
        <div className='sticky top-0 w-full flex items-center justify-between bg-[#101B22] p-2 z-50 '>
          <input
            placeholder='Search traders, tokens, or addresses'
            className='w-1/2 lg:w-1/4 bg-[#102221] px-4 py-2 rounded-lg outline-none placeholder:text-xs'
          />
          <div className='flex items-center gap-3'>
            {connected && balance !== null && (
              <p className='text-sm bg-[#0f1a18] px-3 py-1 rounded-lg border-[1px] border-[#0A3F46]  flex items-center gap-2'>
                <span
                  style={{
                    backgroundImage: `url("/images/solana.png")`
                  }}
                  className='inline-block bg-enter  bg-cover h-[16px] w-[16px]'
                ></span>
                {balance.toFixed(2)} SOL
              </p>
            )}

            {masterMode ? (
              <div
                onClick={toggleMasterMode}
                className='rounded-md border-[1.5px] bg-master border-masterb shadow-[0_0_25px_0px_rgba(245,158,11,0.2)] p-2 flex justify-between items-center gap-2 cursor-pointer '
              >
                <p className='h-[5px] w-[5px] rounded-full bg-[#00A991] animate-pulse'></p>
                <p className='text-[9px] font-[900] leading-[9.875px] tracking-[0.988px]'>
                  Master Mode
                </p>
              </div>
            ) : (
              <div
                onClick={toggleMasterMode}
                className='rounded-md border-[1.5px] border-modeboreder shadow-[0_0_25px_0px_rgba(0,169,145,0.3)] p-2 flex justify-between items-center gap-2 cursor-pointer '
              >
                <p className='h-[5px] w-[5px] rounded-full bg-[#00A991] animate-pulse'></p>
                <p className='text-[9px] font-[900] leading-[9.875px] tracking-[0.988px]'>
                  COPIER Mode
                </p>
              </div>
            )}
            {!connected ? (
              // NOT CONNECTED
              <button
                onClick={() => setWalletModal(true)}
                className='bg-teal-500  shadow-[0_0_25px_0px_rgba(20,184,166,0.3)]  px-3 py-1 rounded-lg text-[10px] font-[700] text-white hover:bg-teal-600 transition'
              >
                Connect Wallet
              </button>
            ) : (
              // CONNECTED
              <div className='relative'>
                <div className='relative'>
                  <button className='flex items-center cursor-pointer  bg-[#0f1a18] border border-[#23483B] px-3 py-1 rounded-lg text-[10px] font-[700] text-[#00A991] gap-2'>
                    {/* ADDRESS */}
                    <div className='flex items-center gap-1'>
                      <span>
                        {publicKey?.toBase58().slice(0, 4)}…
                        {publicKey?.toBase58().slice(-4)}
                      </span>
                      {/* COPY ICON */}
                      {copied ? (
                        <>
                          <span className=' text-[9px] text-[#00A991] flex items-center gap-1 '>
                            <span className='absolute top-[1px]'>Copied</span>{' '}
                            <span>✓</span>
                          </span>
                        </>
                      ) : (
                        <>
                          <span
                            onClick={handleCopy}
                            style={{
                              backgroundImage: 'url("/images/copy.svg")'
                            }}
                            className='inline-block  h-[12px] w-[12px] bg-center bg-cover cursor-pointer opacity-80 hover:opacity-100'
                            title={copied ? 'Copied!' : 'Copy address'}
                          ></span>
                        </>
                      )}
                    </div>

                    {/* DROPDOWN ARROW */}
                    <span
                      onClick={e => {
                        e.stopPropagation()
                        setWalletMenuOpen(prev => !prev)
                      }}
                      className='cursor-pointer text-xl'
                    >
                      ▾
                    </span>
                  </button>

                  <WalletMenu
                    open={walletMenuOpen}
                    onClose={() => setWalletMenuOpen(false)}
                  />
                </div>
              </div>
            )}

            <span
              style={{
                backgroundImage: `url("/images/bell.svg")`
              }}
              className='inline-block relative bg-center bg-cover w-[20px] h-[20px]'
            >
              <span className='absolute right-[1.3px] top-1 bg-[#FB2C36] h-[6px] w-[6px] rounded-full'></span>
            </span>
            <div className='h-[36px] w-[36px] rounded-full p-[1px]  border-[1.5px] border-[#f5e2d9] flex justify-center items-center'>
              <span
                style={{
                  backgroundImage: `url("/images/mode.png")`
                }}
                className='inline-block bg-center bg-cover h-[30px] w-[30px] rounded-full '
              ></span>
            </div>
          </div>
        </div>

        {/*Main left panael */}
        <div className='w-full '>
          <NavContent />
        </div>
      </div>

      <CustomWalletModal
        open={walletModal}
        onClose={() => setWalletModal(false)}
      />
    </div>
  )
}

export default Dashboard
