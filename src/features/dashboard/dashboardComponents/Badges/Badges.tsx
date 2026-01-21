import BadgeCard from './BadgeCard'
import type { Badge } from './badges.types'

const MOCK_BADGES: Badge[] = [
  {
    id: '1',
    title: 'Wallet Connected',
    description: 'Successfully connected a Solana wallet',
    tier: 'bronze'
  },
  {
    id: '2',
    title: 'Verified User',
    description: 'Signed a message to verify wallet ownership',
    tier: 'silver'
  },
  {
    id: '3',
    title: 'Early Explorer',
    description: 'Joined the platform early',
    tier: 'gold'
  }
]

export default function Badges () {
  return (
    <section>
      <h2 className='text-xl font-semibold mb-4'>Achievements</h2>

      <div className='grid grid-cols-1  gap-4'>
        {MOCK_BADGES.map(badge => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
    </section>
  )
}
