import { useConnection, useWallet } from '@solana/wallet-adapter-react'

// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
// import { Link, NavLink } from 'react-router-dom'
import { useWalletStore } from '../../features/wallet/wallet.store'
// import { CgMenuGridO } from 'react-icons/cg'

// import { useAuthStore } from '../../features/auth/auth.store'
import { useEffect, useState } from 'react'
import { WalletMenu } from '../../features/dashboard/WalletMenu'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useTradingModeStore } from '../../features/dashboard/useTradingModeStore'
import { useGeneralContext } from '../../Context/GeneralContext'

const Navbar = () => {
  const [walletMenuOpen, setWalletMenuOpen] = useState(false)

  const { publicKey, connected } = useWallet()
  const { setWallet } = useWalletStore()
  // const { authenticated, hydrated } = useAuthStore() // get auth state

  const [copied, setCopied] = useState(false)
  const [balance, setBalance] = useState<number | null>(null)
  const { connection } = useConnection()

  useEffect(() => {
    if (!publicKey) return

    if (connected) {
      setWallet(publicKey.toBase58(), true)
    }
  }, [connected, publicKey, setWallet])
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!publicKey) return

    await navigator.clipboard.writeText(publicKey.toBase58())

    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

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
  const { masterMode, toggleMasterMode } = useTradingModeStore()
  const { setWalletModal } = useGeneralContext()
  return (
    <div className='w-full '>
      {/* Top bar */}
      <div className='sticky top-0 w-full flex items-center justify-between bg-[#101B22] p-2 z-40 '>
        <input
          placeholder='Search traders, tokens, or addresses'
          className='w-1/2 lg:w-1/4 bg-[#102221] px-4 py-2 rounded-lg outline-none placeholder:text-xs'
        />
        <div className='flex items-center gap-3'>
          {connected && balance !== null && (
            <p className='text-sm bg-[#0f1a18] px-3 py-1 rounded-lg border-[1px] border-[#0A3F46]  flex items-center gap-2 text-white'>
              <span
                style={{
                  backgroundImage: `url("/images/solana.png")`
                }}
                className='inline-block bg-enter  bg-cover h-[16px] w-[16px]'
              ></span>
              {balance.toFixed(2)} SOL
            </p>
          )}

          {connected && (
            <>
              {masterMode ? (
                <div
                  onClick={toggleMasterMode}
                  className='rounded-md border-[1.5px] bg-master border-masterb shadow-[0_0_25px_0px_rgba(245,158,11,0.2)] p-2 flex justify-between items-center gap-2 cursor-pointer '
                >
                  <p className='h-[5px] w-[5px] rounded-full bg-[#00A991] animate-pulse'></p>
                  <p
                    className='text-[9px] font-[900] leading-[9.875px] tracking-[0.988px] text-[#FE9A00]'
                  >
                    Master Mode
                  </p>
                </div>
              ) : (
                <div
                  onClick={toggleMasterMode}
                  className='rounded-md border-[1.5px] border-modeboreder shadow-[0_0_25px_0px_rgba(0,169,145,0.3)] p-2 flex justify-between items-center gap-2 cursor-pointer '
                >
                  <p className='h-[5px] w-[5px] rounded-full bg-[#00A991] animate-pulse'></p>
                  <p className='text-[9px] font-[900] leading-[9.875px] tracking-[0.988px] text-[#00a991]'>
                    COPIER Mode
                  </p>
                </div>
              )}
            </>
          )}

          {!connected ? (
            // NOT CONNECTED
            <button
              onClick={() => setWalletModal(true)}
              className='bg-teal-500  shadow-[0_0_25px_0px_rgba(20,184,166,0.3)]  px-3 py-1 rounded-lg text-[10px] font-[700] text-white hover:bg-teal-600 transition flex justify-between gap-2'
            >
              <span> Connect Wallet</span>
              <span
                className='h-[12px] w-[12px]'
                style={{ backgroundImage: `url("/images/connect.svg")` }}
              ></span>
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

          {connected && (
            <>
              <div className='h-[36px] w-[36px] rounded-full p-[1px]  border-[1.5px] border-[#f5e2d9] flex justify-center items-center'>
                <span
                  style={{
                    backgroundImage: `url("/images/mode.png")`
                  }}
                  className='inline-block bg-center bg-cover h-[30px] w-[30px] rounded-full '
                ></span>
              </div>
            </>
          )}

          {connected && (
            <>
              <span
                style={{
                  backgroundImage: `url("/images/bell.svg")`
                }}
                className='inline-block relative bg-center bg-cover w-[20px] h-[20px]'
              >
                <span className='absolute right-[1.3px] top-1 bg-[#FB2C36] h-[6px] w-[6px] rounded-full'></span>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
