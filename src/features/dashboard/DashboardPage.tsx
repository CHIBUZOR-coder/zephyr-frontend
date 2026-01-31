import Layout from '../../shared/Layout/Layout'

// Components
import Badges from './dashboardComponents/Badges/Badges'
import Leaderboard from './dashboardComponents/Leaderboard/Leaderboard'
import SocialFeed from './dashboardComponents/SocialFeed/SocialFeed'
import PortfolioOverview from './dashboardComponents/PortfolioOverview/PortfolioOverview'

// Auth & Wallet
import { useAuthReady, useAuthStore } from '../auth/auth.store'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletMismatch } from '../../core/hooks/useWalletMismatch'

// Shared
import StateScreen from '../../shared/components/StateScreen'
import RequireWallet from '../../shared/components/RequireWallet'

// User
import { useUserProfile } from '../users/useUserProfile'

export default function DashboardPage () {
  const { user, authenticated } = useAuthStore()
  const { publicKey, connected } = useWallet()
  const hydrated = useAuthReady()
  const mismatch = useWalletMismatch()

  const walletAddress = publicKey?.toBase58()

  // Fetch user profile (safe, always call hook)
  const { data: profile, isLoading, error } = useUserProfile()
  const authReady = useAuthReady()

  if (!authReady) {
    return (
      <StateScreen
        title='Restoring session…'
        description='Please wait a moment'
      />
    )
  }

  if (!hydrated) {
    return (
      <StateScreen
        title='Restoring session…'
        description='Please wait a moment'
      />
    )
  }

  if (mismatch) {
    return (
      <StateScreen
        title='Wallet mismatch detected'
        description='Please reconnect the wallet you signed in with.'
        tone='error'
      />
    )
  }

  return (
    <Layout>
      <RequireWallet>
        <div className='min-h-screen bg-slate-950 text-white p-6 space-y-10'>
          {/* Header */}
          <div className='flex items-center gap-4'>
            {profile?.avatar && (
              <img
                src={profile.avatar}
                alt={profile.displayName}
                className='w-12 h-12 rounded-full border border-slate-700'
              />
            )}
            <div>
              <h1 className='text-3xl font-bold'>Dashboard</h1>
              <p className='text-slate-400 mt-1'>
                {authenticated
                  ? `Welcome back${
                      profile?.displayName ? `, ${profile.displayName}` : ''
                    }`
                  : 'Connect & sign in to view your dashboard'}
              </p>
            </div>
          </div>

          {/* Profile feedback */}
          {isLoading && (
            <p className='text-sm text-slate-500'>Loading profile…</p>
          )}
          {error && (
            <p className='text-sm text-red-400'>
              Failed to load profile details
            </p>
          )}

          {/* Portfolio */}
          {connected && authenticated && <PortfolioOverview />}

          {/* Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Account */}
            <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6'>
              <h2 className='text-lg font-semibold mb-2'>Account</h2>
              <p>
                Status: {authenticated ? 'Authenticated' : 'Not authenticated'}
              </p>
              <p>Role: {user?.role ?? '—'}</p>
              <p className='break-all'>User ID: {user?.id ?? '—'}</p>
            </div>

            {/* Wallet */}
            <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6'>
              <h2 className='text-lg font-semibold mb-2'>Wallet</h2>
              <p>Connected: {connected ? 'Yes' : 'No'}</p>
              <p className='break-all'>Address: {walletAddress ?? '—'}</p>
            </div>

            {/* Placeholder */}
            <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6'>
              <h2 className='text-lg font-semibold mb-2'>Coming Soon</h2>
              <p className='text-slate-400'>Vaults, copy trading, analytics.</p>
            </div>
          </div>

          {/* Feed */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            <Badges />
            <Leaderboard />
            <SocialFeed />
          </div>
        </div>
      </RequireWallet>
    </Layout>
  )
}
