// // src/features/dashboard/DashboardPage.tsx
// import Layout from '../../shared/Layout/Layout'

// // Components
// import Badges from './dashboardComponents/Badges/Badges'
// import Leaderboard from './dashboardComponents/Leaderboard/Leaderboard'
// import SocialFeed from './dashboardComponents/SocialFeed/SocialFeed'

// // Auth & Wallet
// import { useAuthReady, useAuthStore } from '../auth/auth.store'
// import { useWallet } from '@solana/wallet-adapter-react'
// import PortfolioOverview from './dashboardComponents/PortfolioOverview/PortfolioOverview'
// import StateScreen from '../../shared/components/StateScreen'
// import { useWalletMismatch } from '../../core/hooks/useWalletMismatch'
// // import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
// import RequireWallet from '../../shared/components/RequireWallet'
// import { useUserProfile } from '../users/useUserProfile'
// // import PortfolioOverview from './dashboardComponents/PortfolioOverview/PortfolioOverview'
// // import { useWalletMismatch } from '../../core/hooks/useWalletMismatch'

// export default function DashboardPage () {
//   const { user, authenticated } = useAuthStore()
//   const { publicKey, connected } = useWallet()

//   const hydrated = useAuthReady()
//   const mismatch = useWalletMismatch()

//   if (!hydrated) {
//     return (
//       <StateScreen
//         title='Restoring session…'
//         description='Please wait a moment'
//       />
//     )
//   }

//   // if (!connected) {
//   //   return (
//   //     <StateScreen
//   //       title='Wallet not connected'
//   //       description='Please connect your wallet to continue.'
//   //       action={<WalletMultiButton />}
//   //     />
//   //   )
//   // }
//   const walletAddress = publicKey?.toBase58()

// const {
//   data: profile,
//   isLoading: profileLoading,
//   error: profileError
// } = useUserProfile(authenticated ? walletAddress : undefined)

//   if (mismatch) {
//     return (
//       <StateScreen
//         title='Wallet mismatch detected'
//         description='Please reconnect the wallet you signed in with.'
//         tone='error'
//       />
//     )
//   }

//   if (profileLoading) {
//   return (
//     <StateScreen
//       title='Loading profile…'
//       description='Fetching your account details'
//     />
//   )
// }

// if (profileError) {
//   return (
//     <StateScreen
//       title='Profile error'
//       description='Could not load your profile'
//       tone='error'
//     />
//   )
// }

//   return (
//     <Layout>
//       <RequireWallet>

//         <div className='min-h-screen bg-slate-950 text-white p-6 space-y-10'>
//           {/* Header */}

//           <div>
//             <h1 className='text-3xl font-bold'>Dashboard</h1>
//             <p className='text-slate-400 mt-1'>
//               {authenticated
//                 ? 'Your activity, achievements, and community updates'
//                 : 'Connect & sign in to view your dashboard'}
//             </p>
//           </div>
//           {/* Day 8 – Portfolio Overview */}
//           {connected && authenticated && <PortfolioOverview />}
//           {/* Top Cards */}
//           <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
//             {/* Account Card */}
//             <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow'>
//               <h2 className='text-lg font-semibold mb-2'>Account</h2>
//               <div className='space-y-2 text-sm text-slate-300'>
//                 <p>
//                   <span className='text-slate-500'>Status:</span>{' '}
//                   {authenticated ? 'Authenticated' : 'Not authenticated'}
//                 </p>
//                 <p>
//                   <span className='text-slate-500'>Role:</span>{' '}
//                   {user?.role ?? '—'}
//                 </p>
//                 <p className='break-all'>
//                   <span className='text-slate-500'>User ID:</span>{' '}
//                   {user?.id ?? '—'}
//                 </p>
//               </div>
//             </div>

//             {/* Wallet Card */}
//             <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow'>
//               <h2 className='text-lg font-semibold mb-2'>Wallet</h2>
//               <div className='space-y-2 text-sm text-slate-300'>
//                 <p>
//                   <span className='text-slate-500'>Connected:</span>{' '}
//                   {connected ? 'Yes' : 'No'}
//                 </p>
//                 <p className='break-all'>
//                   <span className='text-slate-500'>Address:</span>{' '}
//                   {publicKey?.toBase58() ?? '—'}
//                 </p>
//               </div>
//             </div>

//             {/* Placeholder / Stats */}
//             <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow'>
//               <h2 className='text-lg font-semibold mb-2'>Coming Soon</h2>
//               <p className='text-sm text-slate-400'>
//                 Vaults, portfolio, copy trading, and analytics will appear here.
//               </p>
//             </div>
//           </div>
//           {/* Badges + Leaderboard + Feed */}
//           <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10'>
//             {/* Badges */}
//             <div className='lg:col-span-1'>
//               <Badges />
//             </div>

//             {/* Leaderboard */}
//             <div className='lg:col-span-1'>
//               <Leaderboard />
//             </div>

//             {/* Social Feed */}
//             <div className='lg:col-span-1'>
//               <SocialFeed />
//             </div>
//           </div>
//         </div>
//       </RequireWallet>
//     </Layout>
//   )
// }
// src/features/dashboard/DashboardPage.tsx

// src/features/dashboard/DashboardPage.tsx
// import Layout from '../../shared/Layout/Layout'

// // Components
// import Badges from './dashboardComponents/Badges/Badges'
// import Leaderboard from './dashboardComponents/Leaderboard/Leaderboard'
// import SocialFeed from './dashboardComponents/SocialFeed/SocialFeed'
// import PortfolioOverview from './dashboardComponents/PortfolioOverview/PortfolioOverview'

// // Auth & Wallet
// import { useAuthReady, useAuthStore } from '../auth/auth.store'
// import { useWallet } from '@solana/wallet-adapter-react'
// import { useWalletMismatch } from '../../core/hooks/useWalletMismatch'

// // Shared
// import StateScreen from '../../shared/components/StateScreen'
// import RequireWallet from '../../shared/components/RequireWallet'

// // User
// import { useUserProfile } from '../users/useUserProfile'

// export default function DashboardPage () {
//   // 🔁 ALWAYS call hooks first
//   const { user, authenticated } = useAuthStore()
//   const { publicKey, connected } = useWallet()
//   const hydrated = useAuthReady()
//   const mismatch = useWalletMismatch()

//   const walletAddress = publicKey?.toBase58()

//   // 👤 profile hook (execution controlled internally)
// const {
//   data: profile,
//   isLoading: profileLoading,
//   error: profileError
// } = useUserProfile(hydrated && authenticated ? walletAddress : undefined)

//   // ⛔ now safe to early-return
//   if (!hydrated) {
//     return (
//       <StateScreen
//         title='Restoring session…'
//         description='Please wait a moment'
//       />
//     )
//   }

//   if (mismatch) {
//     return (
//       <StateScreen
//         title='Wallet mismatch detected'
//         description='Please reconnect the wallet you signed in with.'
//         tone='error'
//       />
//     )
//   }

//   return (
//     <Layout>
//       <RequireWallet>
//         <div className='min-h-screen bg-slate-950 text-white p-6 space-y-10'>
//           {/* Header */}
//           <div className='flex items-center gap-4'>
//             {profile?.avatar && (
//               <img
//                 src={profile.avatar}
//                 alt={profile.displayName}
//                 className='w-12 h-12 rounded-full border border-slate-700'
//               />
//             )}

//             <div>
//               <h1 className='text-3xl font-bold'>Dashboard</h1>
//               <p className='text-slate-400 mt-1'>
//                 {authenticated
//                   ? `Welcome back${
//                       profile?.displayName ? `, ${profile.displayName}` : ''
//                     }`
//                   : 'Connect & sign in to view your dashboard'}
//               </p>
//             </div>
//           </div>

//           {/* Profile feedback (non-blocking) */}
//           {profileLoading && (
//             <p className='text-sm text-slate-500'>Loading profile…</p>
//           )}

//           {profileError && (
//             <p className='text-sm text-red-400'>
//               Failed to load profile details
//             </p>
//           )}

//           {/* Portfolio */}
//           {connected && authenticated && <PortfolioOverview />}

//           {/* Cards */}
//           <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
//             {/* Account */}
//             <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6'>
//               <h2 className='text-lg font-semibold mb-2'>Account</h2>
//               <p>
//                 Status: {authenticated ? 'Authenticated' : 'Not authenticated'}
//               </p>
//               <p>Role: {user?.role ?? '—'}</p>
//               <p className='break-all'>User ID: {user?.id ?? '—'}</p>
//             </div>

//             {/* Wallet */}
//             <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6'>
//               <h2 className='text-lg font-semibold mb-2'>Wallet</h2>
//               <p>Connected: {connected ? 'Yes' : 'No'}</p>
//               <p className='break-all'>Address: {walletAddress ?? '—'}</p>
//             </div>

//             {/* Placeholder */}
//             <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6'>
//               <h2 className='text-lg font-semibold mb-2'>Coming Soon</h2>
//               <p className='text-slate-400'>Vaults, copy trading, analytics.</p>
//             </div>
//           </div>

//           {/* Feed */}
//           <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
//             <Badges />
//             <Leaderboard />
//             <SocialFeed />
//           </div>
//         </div>
//       </RequireWallet>
//     </Layout>
//   )
// }


// src/features/dashboard/DashboardPage.tsx
// src/features/dashboard/DashboardPage.tsx
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
  const { data: profile, isLoading, error } = useUserProfile(walletAddress)

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
