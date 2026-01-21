import type { Badge } from './badges.types'

type Props = {
  badge: Badge
}

const TIER_STYLES = {
  bronze: {
    ring: 'border-amber-700',
    glow: 'shadow-amber-900/40',
    icon: '🥉'
  },
  silver: {
    ring: 'border-slate-400',
    glow: 'shadow-slate-400/40',
    icon: '🥈'
  },
  gold: {
    ring: 'border-yellow-400',
    glow: 'shadow-yellow-400/40',
    icon: '🥇'
  }
}

export default function BadgeCard ({ badge }: Props) {
  const tier = TIER_STYLES[badge.tier]

  return (
    <div
      className={`relative bg-slate-900 border ${tier.ring} rounded-2xl p-4 
      shadow-lg ${tier.glow} transition-all duration-200 hover:scale-[1.02]`}
    >
      {/* Medal */}
      <div
        className='absolute -top-4 -right-4 w-10 h-10 rounded-full 
        bg-slate-950 border flex items-center justify-center text-lg'
      >
        {tier.icon}
      </div>

      {/* Content */}
      <h3 className='font-semibold text-white'>{badge.title}</h3>
      <p className='text-sm text-slate-400 mt-1'>{badge.description}</p>

      {/* Tier Label */}
      <span
        className='inline-block mt-3 text-xs uppercase tracking-wide 
        text-slate-400'
      >
        {badge.tier} badge
      </span>
    </div>
  )
}
