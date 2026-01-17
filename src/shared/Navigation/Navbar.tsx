import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Link, NavLink } from 'react-router-dom'
import { useWalletStore } from '../../features/wallet/wallet.store'
import { useEffect } from 'react'

// src/components/Navbar.tsx
const Navbar = () => {
  const { publicKey, connected } = useWallet()
  const { setWallet, resetWallet } = useWalletStore()




  useEffect(() => {
    if (connected && publicKey) {
      setWallet(publicKey.toBase58(), true)
    } else {
      resetWallet()
    }
  }, [connected, publicKey, setWallet, resetWallet])

  return (
    <nav className='flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 text-white'>
      <Link to={'/'} className='flex items-center gap-2'>
        {/* Replace with your logo */}
        <div className='w-8 h-8 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20' />
        <span className='text-xl font-bold tracking-tight'>ZEPHYR</span>
      </Link>

      <div className='hidden md:flex items-center gap-8 text-sm font-medium text-slate-400'>
        <NavLink
          to={'/dashboard'}
          className='hover:text-white transition-colors'
        >
          Dashboard
        </NavLink>

        <NavLink to={'/vaults'} className='hover:text-white transition-colors'>
          Vaults
        </NavLink>

        <NavLink to={'/wallet'} className='hover:text-white transition-colors'>
          Wallet
        </NavLink>
      </div>

      <div>
        <WalletMultiButton />
      </div>
    </nav>
  )
}

export default Navbar
