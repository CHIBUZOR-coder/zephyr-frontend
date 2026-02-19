// src/features/dashboard/dashboardComponents/sidenavPages/NavContent.tsx

// / your existing main dash UI
import LiveTrade from './LiveTrade'
import Portfolio from './Portfolio'

import Support from './Support'
import Settings from './Settings'
import Docs from './Docs'

import { useNavStore } from '../../useNavStore'
import Leaderboard from './Leaderboard'
import Dashboard from './DashboardView'

// This array ORDER must match your navLinks array in Dash.tsx exactly
const NAV_VIEWS = [
  <Dashboard />, // index 0 — 'Dashboard'
  <LiveTrade />, // index 1 — 'Live Trade'
  <Portfolio />, // index 2 — 'Portfolio'
  <Leaderboard />, // index 3 — 'Leaderboard'
  <Support />, // index 4 — 'Support'
  <Settings />, // index 5 — 'Settings'
  <Docs /> // index 6 — 'Docs'
]

export default function NavContent () {
  const { activeIndex } = useNavStore()

  return (
    <div className=' w-full lg:w-[60%] flex flex-col  cent'>
      {NAV_VIEWS[activeIndex] ?? <Dashboard />}
    </div>
  )
}
