import { Link, NavLink } from 'react-router-dom'

// src/components/Navbar.tsx
const Navbar = () => {
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
        <button className='px-5 py-2 bg-blue-600 hover:bg-blue-500 text-sm font-semibold rounded-full transition-all active:scale-95'>
          Connect Wallet
        </button>
      </div>
    </nav>
  )
}

export default Navbar
