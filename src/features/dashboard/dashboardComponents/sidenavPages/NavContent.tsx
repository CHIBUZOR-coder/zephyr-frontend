// // src/features/dashboard/dashboardComponents/sidenavPages/NavContent.tsx

// // / your existing main dash UI
// import LiveTrade from './Livetrade/LiveTrade'
// import Portfolio from './Portfolio'

// import Support from './Support'
// import Settings from './Settings'
// import Docs from './Docs'

// import { useNavStore } from '../../useNavStore'
// import Leaderboard from './Leaderboard'
// import Dashboard from './DashboardView'

// // This array ORDER must match your navLinks array in Dash.tsx exactly
// const NAV_VIEWS = [
//   <Dashboard />, // index 0 — 'Dashboard'
//   <LiveTrade />, // index 1 — 'Live Trade'
//   <Portfolio />, // index 2 — 'Portfolio'
//   <Leaderboard />, // index 3 — 'Leaderboard'
//   <Support />, // index 4 — 'Support'
//   <Settings />, // index 5 — 'Settings'
//   <Docs /> // index 6 — 'Docs'
// ]

// export default function NavContent () {
//   const { activeIndex } = useNavStore()

//   return (
//     <div className=' w-full  flex flex-col  cent'>
//       {NAV_VIEWS[activeIndex] ?? <Dashboard />}
//     </div>
//   )
// }



// src/features/dashboard/dashboardComponents/sidenavPages/NavContent.tsx

import LiveTrade from './Livetrade/LiveTrade'
import Portfolio from './Portfolio/Portfolio'
import Support from './Support'
import Settings from './Settings'
import Docs from './Docs'
import Leaderboard from './Leaderboard'
import Dashboard from './DashboardView'

import { useNavStore } from '../../useNavStore'
import React from 'react'

type NavContentProps = {
  setWalletModal: (open: boolean) => void
}

// ✅ Store COMPONENTS — not JSX
const NAV_VIEWS: React.ElementType[] = [
  Dashboard, // index 0
  LiveTrade, // index 1
  Portfolio, // index 2
  Leaderboard, // index 3
  Support, // index 4
  Settings, // index 5
  Docs // index 6
]

export default function NavContent ({ setWalletModal }: NavContentProps) {
  const { activeIndex } = useNavStore()

  const ActiveComponent = NAV_VIEWS[activeIndex] ?? Dashboard

  return (
    <div className='w-full flex flex-col'>
      {activeIndex === 1 ? (
        // Only LiveTrade receives wallet modal
        <LiveTrade setWalletModal={setWalletModal} />
      ) : (
        <ActiveComponent />
      )}
    </div>
  )
}
