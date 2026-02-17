// import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useEffect, useState } from 'react'

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { CustomWalletModal } from './CustomWalletModal'
import { WalletMenu } from './WalletMenu'
import { useAuthStore } from '../auth/auth.store'
import { useWalletMismatch } from '../../core/hooks/useWalletMismatch'
import type { UserProfile } from '../users/user.types'
import StateScreen from '../../shared/components/StateScreen'
import { useAuthReady } from '../auth/useAuthReady'
import { useTradingModeStore } from './useTradingModeStore'
import { useNavStore } from './useNavStore'

type TimeRange = 'ALL' | '24H' | '7D' | '30D'
type SortDir = 'asc' | 'desc'

const Dashboard: React.FC = () => {
  const { connection } = useConnection()
  const { publicKey, connected } = useWallet()

  const authReady = useAuthReady()
  const { accessToken } = useAuthStore()
  const mismatch = useWalletMismatch()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const API_BASE = 'https://zephyr-np09.onrender.com'

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

  const leaders = [
    {
      name: 'AlphaSeeker',
      imag: '/images/img2.png',
      rio: 112.4,
      winRate: 65,
      follows: 840,
      sol: '2,810'
    },
    {
      name: 'Degenerate',
      imag: '/images/img3.png',
      rio: 89.2,
      winRate: 54,
      follows: 3.1,
      sol: '3,010'
    },
    {
      name: 'SolWhale',
      imag: '/images/img1.png',
      rio: 245.8,
      winRate: 78,
      follows: 1.2,
      sol: '1,120'
    },

    {
      name: 'AlphaSeeker',
      imag: '/images/img2.png',
      rio: 112.4,
      winRate: 65,
      follows: 840,
      sol: '1,750'
    },
    {
      name: 'Degenerate',
      imag: '/images/img3.png',
      rio: 89.2,
      winRate: 54,
      follows: 3.1,
      sol: '2,450'
    }
  ]

  const [search, setSearch] = useState('')
  const [range, setRange] = useState<TimeRange>('ALL')

  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const [showModal, setShowModal] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleRow = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  const firstCall = [
    {
      name: 'Nebula Protocol',
      person: 'AlphaSeeker',
      img: '/images/neb.png',
      text: 'NBLA',
      time: '24 HOURS',
      num: 142.5,
      col: 'yel',
      wallet: '0x34...9f76',
      cap: 140,
      peackCap: 19.9,
      titer: 'community',
      date: '2026-02-01',
      timestamp: 'Feb 01, 2026 14:22 UTC'
    },
    {
      name: 'Aether Finance',
      person: 'ZeroX_Maxi',
      img: '/images/ath.png',
      text: 'AETH',
      time: '30 DAYS',
      num: 88.2,
      col: 'blu',
      wallet: '0x74...3f92',
      cap: 177,
      peackCap: 55.9,
      titer: 'Verifieda',
      date: '2026-01-28',
      timestamp: 'Jan 04, 2026 15:30 UTC'
    },
    {
      name: 'Vortex DEX',
      person: 'Dee_Wizard',
      img: '/images/vort.png',
      text: 'VTX',
      time: '7 DAYS',
      num: 62.1,
      col: 'blu',
      wallet: '0x24...3f11',
      cap: 160,
      peackCap: 55.9,
      titer: 'rising',
      date: '2026-01-28',
      timestamp: 'Mar 02, 2026 16:30 UTC'
    },
    {
      name: 'Aether Finance',
      person: 'ZeroX_Maxi',
      img: '/images/ath.png',
      text: 'AETH',
      time: '30 DAYS',
      num: 88.2,
      col: 'blu',
      wallet: '0x74...3f92',
      cap: 177,
      peackCap: 55.9,
      titer: 'Verifieda',
      date: '2026-01-22',
      timestamp: 'Jun 15, 2026 18:00 UTC'
    },
    {
      name: 'Aether Finance',
      person: 'ZeroX_Maxi',
      img: '/images/ath.png',
      text: 'AETH',
      time: '30 DAYS',
      num: 88.2,
      col: 'blu',
      wallet: '0x74...3f92',
      cap: 177,
      peackCap: 55.9,
      titer: 'Verifieda',
      date: '2028-02-01',
      timestamp: 'May 12, 2026 13:30 UTC'
    },
    {
      name: 'Aether Finance',
      person: 'ZeroX_Maxi',
      img: '/images/ath.png',
      text: 'AETH',
      time: '30 DAYS',
      num: 88.2,
      col: 'blu',
      wallet: '0x74...3f92',
      cap: 177,
      peackCap: 55.9,
      titer: 'Verifieda',
      date: '2026-02-01',
      timestamp: 'Oct 5, 2026 14:00 UTC'
    }
  ]

  const filteredCalls = firstCall
    .filter(item => {
      const q = search.toLowerCase()
      return (
        item.name.toLowerCase().includes(q) ||
        item.text.toLowerCase().includes(q)
      )
    })
    .filter(item => {
      if (range === 'ALL') return true
      if (range === '24H') return item.time === '24 HOURS'
      if (range === '7D') return item.time === '7 DAYS'
      if (range === '30D') return item.time === '30 DAYS'
      return true
    })
    .sort((a, b) => (sortDir === 'desc' ? b.num - a.num : a.num - b.num))

  const socials = [
    {
      name: 'SolanaWhale',
      action: 'just swapped',
      time: '2m ago',
      sell: 50.5,
      buy: '7.2k $PYTH',
      comment: 3,
      likes: 24,
      message: '',
      img: '/images/person3.png',
      price: 0.084
    },
    {
      name: 'Degenerate',
      action: 'copied',
      time: '15m ago',
      sell: null,
      buy: null,
      comment: 24,
      likes: 152,
      message: '',
      img: '/images/person2.png'
    },
    {
      name: 'AlphaSeeker',
      action: 'bought',
      time: '42m ago',
      sell: null,
      buy: null,
      comment: 24,
      likes: 152,
      message: '',
      binfo: 'BUY 120M $BONK',
      price: '2,140',
      img: '/images/person1.png'
    }
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
      <div className='w-full lg:w-[86%] '>
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
        <main className=' w-full flex flex-col lg:flex-row  justify-center p-5 gap-5'>
          <div className=' w-full lg:w-[60%] flex flex-col  cent'>
            {/* Market overview */}
            <section
              className='w-full
'
            >
              <div className='flex justify-between items-center'>
                <p className='font-[700] text-white'>Market overview</p>
                <p className='text-[#00A991] text-[10.5px]'>View All Markets</p>
              </div>
              <div className='grid grid-cols-1  lg:grid-cols-3 gap-4 mt-4  '>
                {['SOL/USD', 'Network Volume', 'Trending Token'].map(
                  (title, i) => (
                    <div
                      key={i}
                      className='bg-[#0f1a18]  border-[1px] border-[#23483B] rounded-md p-4 flex flex-col gap-2'
                    >
                      <span className='text-xs text-gray-400'>{title}</span>
                      <span className='text-xl font-semibold'>
                        {i === 0 && '$142.50'}
                        {i === 1 && '$4.21B'}
                        {i === 2 && '$BONK'}
                      </span>
                      <span className='text-xs text-green-400'>+12.4% 24h</span>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Content grid */}
            <section className=' w-full mt-10 '>
              {/* Traders */}
              <div className='w-full'>
                <h3 className='font-semibold'>Top Traders Leaderboard</h3>

                <div className='flex flex-col gap-8 mt-4 '>
                  <Swiper
                    modules={[Navigation, Autoplay]}
                    loop
                    speed={1400}
                    navigation={{
                      prevEl: '.swiper-prev',
                      nextEl: '.swiper-next'
                    }}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false
                    }}
                    spaceBetween={16}
                    slidesPerView={1}
                    breakpoints={{
                      640: { slidesPerView: 2 },
                      1024: { slidesPerView: 3 }
                    }}
                    className='w-full relative px-3'
                  >
                    <button
                      className='flex justify-center items-center swiper-prev   bg-swipnav
 border-[1.5px] border-[#23483B] z-30 rounded-full absolute top-1/2 left-5'
                    >
                      <MdKeyboardArrowLeft className='h-6 w-6 ' />
                    </button>

                    <button className='flex justify-center items-center swiper-next  bg-swipnav  border-[1.5px] border-[#23483B] z-30 rounded-full absolute top-1/2 right-5'>
                      <MdKeyboardArrowRight className='h-6 w-6 ' />
                    </button>
                    {leaders.map((item, i) => (
                      <SwiperSlide
                        key={i}
                        className='rounded-xl flex flex-col items-center gap-3 overflow-hidden  border-[#23483B] border-[1px] w-[100%]'
                      >
                        <div
                          className='h-80 lg:h-44 m  w-full  flex flex-col justify-end p-4 bg-center bg-cover relative'
                          style={{
                            backgroundImage: `url(${item.imag})`
                          }}
                        >
                          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-lead to-transparent'></div>
                          <div className='relative z-10'>
                            <span className='text-sm font-medium text-[12px]'>
                              @{item.name}
                            </span>
                            <p className='text-[10px] font-[900] text-[#22C55E]'>
                              ROI: {item.rio}%
                            </p>
                          </div>
                        </div>

                        <div className='bg-[#0f1a18] w-full p-4'>
                          {/* <span className='text-xs text-gray-400'>
                            Win rate: {item.winRate}%
                          </span> */}
                          <div className='flex gap-6 lg:gap-2   '>
                            <div className='flex flex-col gap-3  w-[50%]'>
                              <p className='text-[#B0E4DD] text-[9px] font-[400]'>
                                Win Rate: 78%
                              </p>
                              <button className='bg-teal-500  px-3 py-2 rounded text-xs text-white border  border-transparent hover:border-teal-500 hover:text-teal-500 hover:bg-transparent transition ease-in-out duration-500 cursor-pointer'>
                                Copy
                              </button>
                            </div>
                            <div className='flex flex-col gap-3  w-[50%]'>
                              <p className='text-[#B0E4DD] text-[9px] font-[400] text-end'>
                                Followers: {item.follows}
                                {item.follows < 500 ? 'K' : ''}
                              </p>
                              <button className='border border-teal-500 text-teal-400 px-3 py-2 rounded text-xs hover:bg-teal-500 transition ease-in-out duration-500 cursor-pointer hover:text-white'>
                                Follow
                              </button>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <div className='bg-[#0f1a18]  rounded-xl w-full py-4 mt-6 md:mt-auto '>
                    <h4 className='text-[15px]  font-[700] px-4'>
                      Hot Performers
                    </h4>
                    <div
                      className=' mt-4 h-[295px] overflow-y-auto scrollbar-hide
 '
                    >
                      {/* scrollbar-hide */}

                      {leaders.map((item, i) => (
                        <div
                          key={i}
                          className='flex justify-between text-sm  border-[#23483B] border-t-[1px] p-4'
                        >
                          <div className='flex justify-between gap-4 '>
                            <div
                              className='bg-center bg-cover h-10 w-10 rounded-md'
                              style={{
                                backgroundImage: `url(${item.imag})`
                              }}
                            ></div>
                            <div>
                              <span className='text-[10.5px] font-[700]'>
                                @{item.name}
                              </span>
                              <p className='text-[#B0E4DD] text-[9px] font-[400]'>
                                7d ROI: +{item.rio}%
                              </p>
                            </div>
                          </div>
                          <div className=' flex justify-between gap-3 items-center'>
                            <div>
                              <p className='text-[9px] text-[#B0E4DD] font-[400]'>
                                AUM
                              </p>
                              <p className='text-[10.5px] text-white font-[700]'>
                                {item.sol} SOL
                              </p>
                            </div>
                            <button className='border border-[#0098834D] text-teal-400 px-3 py-2 rounded text-xs hover:bg-teal-500 transition ease-in-out duration-500 cursor-pointer hover:text-white'>
                              Copy
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right panel */}
          <div className=' w-full lg:w-[40%] mt-10  lg:mt-0 rightt'>
            <div className='flex justify-between items-center'>
              <p className='font-[700] text-[15px] text-white'>First Caller</p>
              <p className='text-[6px] font-[900] uppercase text-white leading-[12px] tracking-[1.6px]'>
                The Hall of On-Chain Alpha
              </p>
            </div>

            <div className='flex flex-col gap-4 mt-4'>
              <div className='bg-[#0f1a18] border-[1px] border-[#23483B]  rounded-xl'>
                <h4 className='p-4 text-sm font-semibold mb-3'>Top X Trades</h4>

                {firstCall.slice(0, 3).map((item, i) => (
                  <div className='' key={i}>
                    {/* MAIN ROW */}
                    <div
                      onClick={() => toggleRow(i)}
                      className='main flex justify-between border-[#23483B] border-t p-4 cursor-pointer'
                    >
                      <div className='flex items-center gap-3'>
                        <div
                          className='h-8 w-8 rounded-full bg-cover bg-center'
                          style={{ backgroundImage: `url(${item.img})` }}
                        ></div>

                        <div>
                          <p className='text-[11px] font-bold'>{item.name}</p>
                          <p className='text-[9px] text-[#B0E4DD]'>
                            {item.text}x
                          </p>
                        </div>
                      </div>

                      <div className='flex items-center gap-4'>
                        <div>
                          <p className={`text-[13px] font-black text-white`}>
                            {item.num}x
                          </p>
                          <p className='text-[7px] text-[#B0E4DD99] font-bold'>
                            Multiple
                          </p>
                        </div>

                        <div className='flex  gap-2 justify-between items-center'>
                          <p className='text-[9px] font-bold'>{item.person}</p>
                          <div
                            className={`${
                              item.titer === 'community'
                                ? 'bg-verircom'
                                : 'bg-veriris'
                            } w-[16px] h-[16px] rounded-full p-1 flex justify-center items-center`}
                          >
                            <span
                              className={`inline-block  w-[12px] h-[12px]   bg-center bg-cover `}
                              style={{
                                backgroundImage: `url(${
                                  item.titer === 'community'
                                    ? '/images/checkgreen.svg'
                                    : item.titer === 'rising'
                                    ? '/images/rising.svg'
                                    : item.titer === 'Verifieda'
                                    ? 'images/Verifieda.svg'
                                    : ''
                                })`
                              }}
                            ></span>
                          </div>
                        </div>
                        {/* DROPDOWN */}
                        <div
                          onClick={e => {
                            e.stopPropagation()
                            // your button logic here
                          }}
                          className={`cursor-pointer h-5 w-5 bg-center bg-cover transition-transform duration-300 ${
                            openIndex === i ? 'rotate-180' : ''
                          }`}
                          style={{
                            backgroundImage: `url('/images/dropdown.svg')`
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* EXPANDED DETAILS */}
                    {openIndex === i && (
                      <div className='mx-4 mb-4 rounded-xl border border-[#23483B] bg-[#0b1513] p-4'>
                        <div className='grid grid-cols-3 gap-6 text-xs'>
                          <div>
                            <p className='text-[#6f9f97] text-[8px]'>
                              Market Cap at Call
                            </p>
                            <p className='font-bold'>${item.cap}k</p>
                          </div>

                          <div>
                            <p className='text-[#6f9f97] text-[8px]'>
                              Peak Market Cap
                            </p>
                            <p className='font-bold text-[#00A991]'>
                              ${item.peackCap}M
                            </p>
                          </div>

                          <div>
                            <p className='text-[#6f9f97] text-[8px]'>
                              Caller Wallet
                            </p>
                            <p className='font-bold text-[#9fd5cc]'>
                              {item.wallet}
                            </p>
                          </div>
                        </div>

                        <div className='mt-4 rounded-lg bg-[#0f1f1c] p-3 text-[11px] text-[#9fd5cc]'>
                          This trade was captured at the exact moment the first
                          caller executed the buy. Zephyr verifies all entries
                          against on-chain transaction data to ensure accuracy.
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <p
                  onClick={() => setShowModal(true)}
                  className=' cursor-pointer text-[12px] font-[700] text-[#00A991] text-center border-[#23483B] border-t-[1px] p-4'
                >
                  View All Performance
                </p>
              </div>

              {/* Social Feeds */}
              <div className='mt-10'>
                <div className='flex gap-2 items-center px-4'>
                  <h4 className='text-[15px] font-[700]  '>Social Feed</h4>
                  <p className='w-[6px] h-[6px] rounded-full bg-[#22C55E] animate-pulse'></p>
                </div>
                <div className=' bg-[#0f1a18] rounded-xl'>
                  <div className=' p-4 flex flex-col mt-4 gap-8'>
                    {socials.map((item, i) => {
                      if (item.action.toLocaleLowerCase().includes('swapped')) {
                        console.log('img:', item.img)

                        return (
                          <div key={i} className='flex justify-between '>
                            <div className='flex justify-center items-center h-[28px] w-[28px] border-[1px] border-[#112968] rounded-full'>
                              <span
                                style={{
                                  backgroundImage: `url(${item.img})`
                                }}
                                className='bg-cover bg-center  rounded-full h-[88%] w-[88%] '
                              ></span>
                            </div>

                            <div className='flex flex-col w-[90%] gap-[5px]'>
                              <div className='flex justify-between items-center '>
                                <div className='flex gap-3 items-center'>
                                  <p className='text-[10px] font-[700] text-white'>
                                    {item.name}
                                  </p>
                                  <p className='text-[10px] text-[#B0E4DD]'>
                                    {item.action}
                                  </p>
                                </div>
                                <p className='text-[7.5px] text-[#B0E4DD]'>
                                  {item.time}
                                </p>
                              </div>
                              <div className='bg-[#22403F] rounded-md flex justify-between items-center p-2 '>
                                <div className=' '>
                                  <p className='text-[9px] text-[#FA6938] font-[700]'>
                                    SELL: {item.sell}
                                  </p>
                                  <p className='text-[7.5px] font-[400] text-[#B0E4DD]'>
                                    price: ${item.price}
                                  </p>
                                </div>

                                <span
                                  style={{
                                    backgroundImage: `url('/images/arrowr.svg')`
                                  }}
                                  className='bg-center bg-cover h-4 w-4'
                                ></span>

                                <div className=''>
                                  <p className='text-[9px] text-[#FA6938] font-[700]'>
                                    BUY:
                                    <span className='text-white'>
                                      {item.buy}
                                    </span>
                                  </p>
                                  <p className='text-[7.5px] font-[400] text-[#FA6938] flex gap-[3px] items-center'>
                                    <span>Solscan</span>
                                    <span
                                      style={{
                                        backgroundImage: `url('/images/redirect.svg')`
                                      }}
                                      className=' cursor-pointer  h-2 w-2 bg-center bgcover'
                                    ></span>
                                  </p>
                                </div>
                              </div>
                              <div className='flex gap-3 items-center'>
                                <div className='flex gap-1 items-center'>
                                  <span
                                    style={{
                                      backgroundImage: `url('/images/likes.svg')`
                                    }}
                                    className='bg-center bg-cover h-[12px] w-[15px] cursor-pointer'
                                  ></span>

                                  <span className='text-[8.5px] font-[400]'>
                                    {item.likes}
                                  </span>
                                </div>
                                <div className='flex gap-1 items-center'>
                                  <span
                                    style={{
                                      backgroundImage: `url('/images/comment.svg')`
                                    }}
                                    className='bg-center bg-cover h-[12px] w-[15px] cursor-pointer'
                                  ></span>

                                  <span className='text-[8.5px] font-[400]'>
                                    {item.comment}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      } else if (
                        item.action.toLocaleLowerCase().includes('copied')
                      ) {
                        return (
                          <div key={i} className='flex justify-between'>
                            <div className='flex justify-center items-center h-[28px] w-[28px] border-[1px] border-[#112968] rounded-full'>
                              <span
                                style={{
                                  backgroundImage: `url(${item.img})`
                                }}
                                className='bg-cover bg-center  rounded-full h-[88%] w-[88%] '
                              ></span>
                            </div>
                            <div className='flex flex-col w-[90%] gap-[5px]'>
                              <div className='flex justify-between items-center '>
                                <div className='flex gap-3 items-center'>
                                  <p className='text-[10px] font-[700] text-white'>
                                    {item.name}
                                  </p>
                                  <p className='text-[10px] text-[#B0E4DD]'>
                                    {item.action}
                                  </p>
                                </div>
                                <p className='text-[7.5px] text-[#B0E4DD]'>
                                  {item.time}
                                </p>
                              </div>
                              <div className=' rounded-md items-center p-2 '>
                                <p className='text-[#B0E4DD] text-[9px] font-[400]'>
                                  Just increased allocation for @AlphaSeeker.
                                  That last trade on $JUP was legendary! 🚀
                                </p>
                              </div>
                              <div className='flex gap-3 items-center'>
                                <div className='flex gap-1 items-center'>
                                  <span
                                    style={{
                                      backgroundImage: `url('/images/likes.svg')`
                                    }}
                                    className='bg-center bg-cover h-[12px] w-[15px] cursor-pointer'
                                  ></span>

                                  <span className='text-[8.5px] font-[400]'>
                                    {item.likes}
                                  </span>
                                </div>
                                <div className='flex gap-1 items-center'>
                                  <span
                                    style={{
                                      backgroundImage: `url('/images/comment.svg')`
                                    }}
                                    className='bg-center bg-cover h-[12px] w-[15px] cursor-pointer'
                                  ></span>

                                  <span className='text-[8.5px] font-[400]'>
                                    {item.comment}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      } else {
                        return (
                          <div key={i} className='flex justify-between'>
                            <div className='flex justify-center items-center h-[28px] w-[28px] border-[1px] border-[#112968] rounded-full'>
                              <span
                                style={{
                                  backgroundImage: `url(${item.img})`
                                }}
                                className='bg-cover bg-center  rounded-full h-[88%] w-[88%] '
                              ></span>
                            </div>
                            <div className='flex flex-col w-[90%] gap-[5px]'>
                              <div className='flex justify-between items-center '>
                                <div className='flex gap-3 items-center'>
                                  <p className='text-[10px] font-[700] text-white'>
                                    {item.name}
                                  </p>
                                  <p className='text-[10px] text-[#B0E4DD]'>
                                    {item.action}
                                  </p>
                                </div>
                                <p className='text-[7.5px] text-[#B0E4DD]'>
                                  {item.time}
                                </p>
                              </div>
                              <div className='bg-[#22403F] rounded-md flex justify-between items-center p-2 '>
                                <div className='flex justify-between  gap-3'>
                                  <span
                                    style={{
                                      backgroundImage: `url("/images/bonk.png")`
                                    }}
                                    className='bg-cover bg-center h-[15px] w-[15px]'
                                  ></span>

                                  <p className='text-[9px] font-[700] text-[#13EC5F]'>
                                    BUY 120M $BONK
                                  </p>
                                </div>
                                <p className='text-[7.5px] font-[400] text-[#13EC5F]'>
                                  Value: ${item.price}
                                </p>
                              </div>

                              <div className='flex gap-3 items-center'>
                                <div className='flex gap-1 items-center'>
                                  <span
                                    style={{
                                      backgroundImage: `url('/images/likes.svg')`
                                    }}
                                    className='bg-center bg-cover h-[12px] w-[15px] cursor-pointer'
                                  ></span>

                                  <span className='text-[8.5px] font-[400]'>
                                    {item.likes}
                                  </span>
                                </div>
                                <div className='flex gap-1 items-center'>
                                  <span
                                    style={{
                                      backgroundImage: `url('/images/comment.svg')`
                                    }}
                                    className='bg-center bg-cover h-[12px] w-[15px] cursor-pointer'
                                  ></span>

                                  <span className='text-[8.5px] font-[400]'>
                                    {item.comment}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>
                  <div className='mt-12'>
                    <p className=' h-[0.5px] bg-[#232948]'></p>

                    <div className='p-4'>
                      <div className='w-full relative flex justify-center items-center'>
                        <div className='cursor-pointer flex justify-center items-center bg-[#009883] rounded-full absolute  right-3 h-[30px] w-[30px] top-[28%]'>
                          <p
                            style={{
                              backgroundImage: "url('/images/send.svg')"
                            }}
                            className=' bg-center bg-cover h-[12px] w-[10px] flex justify-center items-center'
                          ></p>
                        </div>
                        <input
                          placeholder='Post an update...'
                          className='mt-2 bg-[#22403F] w-full p-3 rounded-lg text-xs outline-none'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <CustomWalletModal
        open={walletModal}
        onClose={() => setWalletModal(false)}
      />
      <AnimatePresence>
        {showModal && (
          <>
            {/* BACKDROP */}
            <motion.div
              className='fixed inset-0 z-40 bg-black/60'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />

            {/* MODAL */}
            <motion.div
              className='fixed inset-0 z-50 flex items-center justify-center px-4'
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div
                className='relative w-full max-w-5xl max-h-[85vh] overflow-y-auto scrollbar-hide rounded-2xl border border-[#23483B] bg-[#152625]'
                onClick={e => e.stopPropagation()}
              >
                {/* HEADER */}
                <div className='flex items-start justify-between border-b border-[#23483B] p-6'>
                  <div>
                    <h3 className='text-lg font-bold'>
                      Full Performance Leaderboard
                    </h3>
                    <p className='text-xs text-[#6f9f97]'>
                      Comprehensive Alpha Discovery History
                    </p>
                  </div>

                  <button
                    onClick={() => setShowModal(false)}
                    className='text-[#9fd5cc] text-xl'
                  >
                    ✕
                  </button>
                </div>

                {/* BODY */}
                <div className=''>
                  {/* SEARCH + FILTERS */}
                  {/* SEARCH + FILTERS */}
                  <div className='mb-5 flex flex-wrap items-center gap-3 p-4'>
                    {/* SEARCH (WIDER) */}
                    <div className='flex items-center gap-3 rounded-xl border border-[#23483B] bg-[#0b1513] px-4 py-3.5 w-full md:w-[48.5%]'>
                      <span className='text-[#6f9f97] text-sm'>🔍</span>
                      <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder='Search token or symbol'
                        className='w-full bg-transparent text-sm outline-none placeholder:text-[#6f9f97]'
                      />
                    </div>

                    {/* FILTER GROUP */}
                    <div className='flex items-center gap-2 rounded-xl border border-[#23483B] bg-[#0b1513] p-2'>
                      {(['ALL', '24H', '7D', '30D'] as TimeRange[]).map(r => (
                        <button
                          key={r}
                          onClick={() => setRange(r)}
                          className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                            range === r
                              ? 'bg-[#00A991] text-black'
                              : 'text-[#9fd5cc] hover:bg-[#122523]'
                          }`}
                        >
                          {r === '24H'
                            ? '24 HOURS'
                            : r === '7D'
                            ? '7 DAYS'
                            : r === '30D'
                            ? '30 DAYS'
                            : 'ALL'}
                        </button>
                      ))}
                    </div>

                    {/* SORT */}
                    <div className=' flex items-center gap-2 rounded-xl border border-[#23483B] bg-[#0b1513] px-4 py-3.5'>
                      <div className='flex flex-col'>
                        <button
                          onClick={() => setSortDir('asc')}
                          className={`text-[10px] leading-none ${
                            sortDir === 'asc'
                              ? 'text-[#00A991]'
                              : 'text-[#6f9f97]'
                          }`}
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => setSortDir('desc')}
                          className={`text-[10px] leading-none ${
                            sortDir === 'desc'
                              ? 'text-[#00A991]'
                              : 'text-[#6f9f97]'
                          }`}
                        >
                          ▼
                        </button>
                      </div>
                      <span className='text-xs font-bold text-[#9fd5cc]'>
                        SORT: TOP X
                      </span>
                    </div>
                  </div>
                  {filteredCalls.map((item, i) => (
                    <div key={i} className=' overflow-x-auto'>
                      {/* MAIN ROW */}
                      <div
                        onClick={() => toggleRow(i)}
                        className='flex justify-between border-t border-[#23483B] p-4 min-w-[500px]    lg:min-w-[700px]  flex-nowrap cursor-pointer'
                      >
                        <div className='flex items-center gap-3 '>
                          <div
                            className=' h-8 w-8 rounded-full bg-cover bg-center'
                            style={{ backgroundImage: `url(${item.img})` }}
                          ></div>

                          <div>
                            <p className='text-[11px] font-bold'>{item.name}</p>
                            <p className='text-[9px] text-[#B0E4DD]'>
                              {item.text}
                            </p>
                          </div>
                        </div>

                        <div className='flex items-center gap-4 lg:gap-8 '>
                          <div>
                            <p className={`text-[13px] font-black text-white`}>
                              {item.num}x
                            </p>
                            <p className='text-[7px] text-[#B0E4DD99] font-bold'>
                              MULTIPLE
                            </p>
                          </div>

                          <p className='font-[700] text-[9px]'>{item.time}</p>
                          <div className='flex  gap-2 justify-between items-center'>
                            <p className='text-[9px] font-bold'>
                              {item.person}
                            </p>
                            <div
                              className={`${
                                item.titer === 'community'
                                  ? 'bg-verircom'
                                  : 'bg-veriris'
                              } w-[16px] h-[16px] rounded-full p-1 flex justify-center items-center`}
                            >
                              <span
                                className={`inline-block  w-[12px] h-[12px]   bg-center bg-cover `}
                                style={{
                                  backgroundImage: `url(${
                                    item.titer === 'community'
                                      ? '/images/checkgreen.svg'
                                      : item.titer === 'rising'
                                      ? '/images/rising.svg'
                                      : item.titer === 'Verifieda'
                                      ? 'images/Verifieda.svg'
                                      : ''
                                  })`
                                }}
                              ></span>
                            </div>
                          </div>

                          <div>
                            <p className='text-[9px] font-[500] text-[#B0E4DD80]'>
                              DATE
                            </p>
                            <p className='text-[11px] font-[700]'>
                              {item.date}
                            </p>
                          </div>
                          {/* DROPDOWN */}
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              // your button logic here
                            }}
                            className={`h-5 w-5 bg-cover bg-center transition-transform ml-0 md:ml-8 ${
                              openIndex === i ? 'rotate-180' : ''
                            }`}
                            style={{
                              backgroundImage: `url('/images/dropdown.svg')`
                            }}
                          ></button>
                        </div>
                      </div>

                      {/* EXPANDED DETAILS (animated) */}
                      <AnimatePresence>
                        {openIndex === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className='overflow-hidden'
                          >
                            <div className=''>
                              <div className='mx-4 mb-4   flex justify-between flex-col md:flex-row '>
                                <div className='flex justify-between gap-6 md:gap-24 flex-col md:flex-row  '>
                                  <div className='flex flex-col gap-4'>
                                    <div>
                                      <p className='text-[#6f9f97] text-[8px]  uppercase'>
                                        Market Cap at Call
                                      </p>
                                      <p className='font-[700] text-[10px] '>
                                        ${item.cap}k
                                      </p>
                                    </div>

                                    <div>
                                      <p className='text-[#6f9f97] text-[8px] font-[900]'>
                                        Caller Wallet
                                      </p>
                                      <div className='flex items-center gap-1'>
                                        <p className='font-[400] text-[9px] text-[#9fd5cc]'>
                                          {item.wallet}
                                        </p>
                                        <span
                                          className='w-[10px] h-[10px] bg-center bg-cover'
                                          style={{
                                            backgroundImage: `url("/images/copy.svg")`
                                          }}
                                        ></span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className='flex flex-col gap-4'>
                                    <div className=''>
                                      <p className='text-[#6f9f97] text-[8px] uppercase font-[900]'>
                                        Peak Market Cap
                                      </p>
                                      <p className=' text-[#22C55E] text-[10px] font-[700]'>
                                        ${item.peackCap}M
                                      </p>
                                    </div>

                                    <div className=''>
                                      <p className='text-[8px] font-[900] text-[#587774]'>
                                        Timestamp
                                      </p>
                                      <p className='text-[10px] text-white font-[700]'>
                                        {item.timestamp}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <p className='mt-4 w-full lg:w-1/2 rounded-lg  bg-[#FFFFFF08] p-3 text-[11px] text-[#9fd5cc]'>
                                  This trade was captured at the exact moment
                                  the first caller executed the buy. Zephyr
                                  verifies all entries against on-chain
                                  transaction data to ensure accuracy.
                                </p>
                              </div>
                              <div className='flex  items-center p-4 gap-2'>
                                <div className=' px-5 py-2 rounded-md bg-socials border-[1px] border-socialsb flex justify-center items-center'>
                                  <span
                                    className='h-[14px] w-[14px] inline-block'
                                    style={{
                                      backgroundImage: `url("/images/twitter.svg")`
                                    }}
                                  ></span>
                                </div>
                                <div className=' px-5 py-2 rounded-md bg-socials border-[1px] border-socialsb flex justify-center items-center'>
                                  <span
                                    className='h-[14px] w-[14px] inline-block'
                                    style={{
                                      backgroundImage: `url("/images/telegram.svg")`
                                    }}
                                  ></span>
                                </div>
                                <div className=' px-5 py-2 rounded-md bg-socials border-[1px] border-socialsb flex justify-center items-center'>
                                  <span
                                    className='h-[14px] w-[14px] inline-block'
                                    style={{
                                      backgroundImage: `url("/images/redir.svg")`
                                    }}
                                  ></span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  <div className='border-t border-[#23483B]'>
                    <div
                      className='flex flex-col md:flex-row justify-between items-center border-t-[2px]  border-[#23483B] mt-4 p-4
'
                    >
                      <div className='  flex gap-2  items-center '>
                        <p className='w-[8px] h-[8px] rounded-full animate-pulse bg-[#00BC7D]'></p>
                        <p className='text-[8px] lg:text-[10px] font-[500] text-[#435f5c] leading-[15px] tracking-[2px] uppercase'>
                          Verified Real-time Performance indexing active
                        </p>
                      </div>

                      <p className='text-[8px] font-[400] text-[#37504e]'>
                        Data provided by Zephyr Core Engine v2.4
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dashboard
