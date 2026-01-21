import LeaderboardRow from './LeaderboardRow'
import type { LeaderboardUser } from './leaderboard.types'

const MOCK_LEADERBOARD: LeaderboardUser[] = [
  {
    id: '1',
    username: 'AlphaTrader',
    walletAddress: '6JkKEDopLrewoiwBJsnFh4zgyqWdqHa1hZwGkY8TxhD6',
    rank: 1,
    score: 12500,
    avatarUrl: 'https://i.pravatar.cc/40?img=1'
  },
  {
    id: '2',
    username: 'SolWhale',
    walletAddress: '4T7u7Z3xZLQ9a2zE2qF1r8S9mJq6D7KpY9N4H',
    rank: 2,
    score: 9800,
    avatarUrl: 'https://i.pravatar.cc/40?img=2'
  },
  {
    id: '3',
    username: 'ZephyrUser',
    walletAddress: '9QxFZP2sXW8Aqk7b3e6c5d4r2m1H',
    rank: 3,
    score: 8700,
    avatarUrl: 'https://i.pravatar.cc/40?img=3'
  },
  {
    id: '4',
    username: 'NewTrader',
    walletAddress: '2K9QJX7Wk9uLz3P5A2D8E',
    rank: 4,
    score: 4200
  }
]

export default function Leaderboard () {
  return (
    <section className=''>
      <h2 className='text-xl font-semibold mb-4'>Leaderboard</h2>

      <div className='space-y-3 max-h-[400px] overflow-y-auto p-4'>
        {MOCK_LEADERBOARD.map(user => (
          <LeaderboardRow key={user.id} user={user} />
        ))}
      </div>
    </section>
  )
}
