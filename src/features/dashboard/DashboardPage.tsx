// src/features/dashboard/DashboardPage.tsx
import Layout from '../../shared/Layout/Layout'

// Components
import Badges from './dashboardComponents/Badges/Badges'
import Leaderboard from './dashboardComponents/Leaderboard/Leaderboard'
import SocialFeed from './dashboardComponents/SocialFeed/SocialFeed'

// Auth & Wallet
import { useAuthStore } from '../auth/auth.store'
import { useWallet } from '@solana/wallet-adapter-react'
import PortfolioOverview from './dashboardComponents/PortfolioOverview/PortfolioOverview'

export default function DashboardPage () {
  const { user, authenticated } = useAuthStore()
  const { publicKey, connected } = useWallet()

  return (
    <Layout>
      <div className='min-h-screen bg-slate-950 text-white p-6 space-y-10'>
        {/* Header */}
    
        <div>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          <p className='text-slate-400 mt-1'>
            {authenticated
              ? 'Your activity, achievements, and community updates'
              : 'Connect & sign in to view your dashboard'}
          </p>
        </div>
        {/* Day 8 – Portfolio Overview */}
        {connected && authenticated && <PortfolioOverview />}
        {/* Top Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Account Card */}
          <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow'>
            <h2 className='text-lg font-semibold mb-2'>Account</h2>
            <div className='space-y-2 text-sm text-slate-300'>
              <p>
                <span className='text-slate-500'>Status:</span>{' '}
                {authenticated ? 'Authenticated' : 'Not authenticated'}
              </p>
              <p>
                <span className='text-slate-500'>Role:</span>{' '}
                {user?.role ?? '—'}
              </p>
              <p className='break-all'>
                <span className='text-slate-500'>User ID:</span>{' '}
                {user?.id ?? '—'}
              </p>
            </div>
          </div>

          {/* Wallet Card */}
          <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow'>
            <h2 className='text-lg font-semibold mb-2'>Wallet</h2>
            <div className='space-y-2 text-sm text-slate-300'>
              <p>
                <span className='text-slate-500'>Connected:</span>{' '}
                {connected ? 'Yes' : 'No'}
              </p>
              <p className='break-all'>
                <span className='text-slate-500'>Address:</span>{' '}
                {publicKey?.toBase58() ?? '—'}
              </p>
            </div>
          </div>

          {/* Placeholder / Stats */}
          <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow'>
            <h2 className='text-lg font-semibold mb-2'>Coming Soon</h2>
            <p className='text-sm text-slate-400'>
              Vaults, portfolio, copy trading, and analytics will appear here.
            </p>
          </div>
        </div>
        {/* Badges + Leaderboard + Feed */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10'>
          {/* Badges */}
          <div className='lg:col-span-1'>
            <Badges />
          </div>

          {/* Leaderboard */}
          <div className='lg:col-span-1'>
            <Leaderboard />
          </div>

          {/* Social Feed */}
          <div className='lg:col-span-1'>
            <SocialFeed />
          </div>
        </div>
      </div>
    </Layout>
  )
}
