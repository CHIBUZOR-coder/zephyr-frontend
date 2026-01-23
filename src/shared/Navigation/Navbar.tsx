
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Link, NavLink } from 'react-router-dom'
import { useWalletStore } from '../../features/wallet/wallet.store'
import { useAuthStore } from '../../features/auth/auth.store'
import { useEffect } from 'react'

const Navbar = () => {
  const { publicKey, connected } = useWallet()
  const { setWallet } = useWalletStore()
  const { authenticated, hydrated } = useAuthStore() // get auth state

  useEffect(() => {
    if (!publicKey) return

    if (connected) {
      setWallet(publicKey.toBase58(), true)
    }
  }, [connected, publicKey, setWallet])

  return (
    <nav className='flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 w-full'>
      <Link to={'/'} className='flex items-center gap-2'>
        <div className='w-8 h-8 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20' />
        <span className='text-xl font-bold tracking-tight'>ZEPHYR</span>
      </Link>

      <div className='hidden md:flex items-center gap-8 text-sm font-medium text-slate-400'>
        <NavLink
          to={'/dashboard'}
          className={({ isActive }: { isActive: boolean }) => `
            ${isActive ? 'text-white' : ''} hover:text-white transition-colors`}
        >
          Dashboard
        </NavLink>

        <NavLink
          to={'/vaults'}
          className={({ isActive }: { isActive: boolean }) => `
            ${isActive ? 'text-white' : ''} hover:text-white transition-colors`}
        >
          Vaults
        </NavLink>

        <NavLink
          to={'/wallet'}
          className={({ isActive }: { isActive: boolean }) => `
            ${isActive ? 'text-white' : ''} hover:text-white transition-colors`}
        >
          Wallet
        </NavLink>
      </div>

      <div className='flex items-center gap-2'>
        {/* Wallet button always shows */}
        <WalletMultiButton />
        {/* Conditional Sign In button */}
        {hydrated && connected && !authenticated && (
          <NavLink
            to='/signup'
            className='bg-blue-500 rounded-md px-4 py-2 text-sm hover:bg-blue-600 transition'
          >
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  )
}

export default Navbar
