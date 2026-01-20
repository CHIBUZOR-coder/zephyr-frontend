// import { useWallet } from '@solana/wallet-adapter-react'
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { useWalletStore } from '../../features/wallet/wallet.store'
// import { useAuthStore } from '../../features/auth/auth.store'
// import { useEffect } from 'react'

// // src/components/Navbar.tsx
// const Navbar = () => {
//   const { publicKey, connected } = useWallet()
//   const { setWallet, resetWallet } = useWalletStore()

//   const { authenticated } = useAuthStore()
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (connected && publicKey) {
//       setWallet(publicKey.toBase58(), true)
//     } else {
//       resetWallet()
//     }
//   }, [connected, publicKey, setWallet, resetWallet])

//   return (
//     <nav className='flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 text-white'>
//       <Link to='/' className='flex items-center gap-2'>
//         <div className='w-8 h-8 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20' />
//         <span className='text-xl font-bold tracking-tight'>ZEPHYR</span>
//       </Link>

//       <div className='hidden md:flex items-center gap-8 text-sm font-medium text-slate-400'>
//         <NavLink
//           to='/dashboard'
//           className={({ isActive }) =>
//             `${isActive ? 'text-white' : ''} hover:text-white transition-colors`
//           }
//         >
//           Dashboard
//         </NavLink>

//         <NavLink
//           to='/vaults'
//           className={({ isActive }) =>
//             `${isActive ? 'text-white' : ''} hover:text-white transition-colors`
//           }
//         >
//           Vaults
//         </NavLink>

//         <NavLink
//           to='/wallet'
//           className={({ isActive }) =>
//             `${isActive ? 'text-white' : ''} hover:text-white transition-colors`
//           }
//         >
//           Wallet
//         </NavLink>
//       </div>

//       {/* RIGHT SIDE ACTIONS */}
//       <div className='flex items-center gap-3'>
//         <WalletMultiButton />

//         {connected && !authenticated && (
//           <button
//             onClick={() => navigate('/signup')}
//             className='px-3 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-700 transition'
//           >
//             Sign In
//           </button>
//         )}
//       </div>
//     </nav>
//   )
// }

// export default Navbar
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Link, NavLink } from 'react-router-dom'
import { useWalletStore } from '../../features/wallet/wallet.store'
import { useAuthStore } from '../../features/auth/auth.store'
import { useEffect } from 'react'

const Navbar = () => {
  const { publicKey, connected } = useWallet()
  const { setWallet, resetWallet } = useWalletStore()
  const { authenticated } = useAuthStore() // get auth state

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
        {connected && !authenticated && publicKey && (
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
