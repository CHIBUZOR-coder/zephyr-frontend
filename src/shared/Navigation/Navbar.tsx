import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Link, NavLink } from 'react-router-dom'
import { useWalletStore } from '../../features/wallet/wallet.store'
import { CgMenuGridO } from 'react-icons/cg'

// import { useAuthStore } from '../../features/auth/auth.store'
import { useEffect } from 'react'

const Navbar = () => {
  const { publicKey, connected } = useWallet()
  const { setWallet } = useWalletStore()
  // const { authenticated, hydrated } = useAuthStore() // get auth state

  useEffect(() => {
    if (!publicKey) return

    if (connected) {
      setWallet(publicKey.toBase58(), true)
    }
  }, [connected, publicKey, setWallet])

  return (
    <nav className='flex items-center justify-between px-6 py-4 bg-navfoot border-b border-slate-800 text-white sticky top-0 z-30 w-full'>
      <Link to={'/'} className='flex items-center gap-2'>
        <div className="w-16 h-12 bg-[url('/images/logo.png')] bg-cover bg-center rounded-lg shadow-lg shadow-blue-500/20 "></div>
        <span className='text-xl font-bold tracking-tight text-white'>
          ZEPHYR
        </span>
      </Link>
      <div className='hidden md:flex items-center gap-8 text-sm font-medium '>
        <NavLink
          to={'/dashboard'}
          className={({ isActive }: { isActive: boolean }) => `
            ${
              isActive ? 'text-white' : ''
            } hover:text-white transition-colors text-smalltext`}
        >
          Features
        </NavLink>
        <NavLink
          to={'/vaults'}
          className={({ isActive }: { isActive: boolean }) => `
            ${
              isActive ? 'text-white' : ''
            } hover:text-white transition-colors text-smalltext
`}
        >
          How it works
        </NavLink>
        <NavLink
          to={'/vaults'}
          className={({ isActive }: { isActive: boolean }) => `
            ${
              isActive ? 'text-white' : ''
            } hover:text-white transition-colors text-smalltext
`}
        >
          Tradera
        </NavLink>

        {/* Wallet button always shows */}
        <WalletMultiButton />
      </div>
      {/* // src/shared/Navigation/Navbar.tsx // Add this link to your existing
      navigation ; */}
      {/* <NavLink
        to={'/vaults/create'}
        className={({ isActive }: { isActive: boolean }) => `
    ${isActive ? 'text-white' : ''} 
    hover:text-white transition-colors text-smalltext
  `}
      >
        Create Vault
      </NavLink> */}
      <div className='block md:hidden'>
        <span className='cursor-pointer text-white'>
          <CgMenuGridO size={24} />
        </span>
      </div>
    </nav>
  )
}

export default Navbar
