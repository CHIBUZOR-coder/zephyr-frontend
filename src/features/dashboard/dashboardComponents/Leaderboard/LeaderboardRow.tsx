import type { LeaderboardUser } from './leaderboard.types'

type Props = {
  user: LeaderboardUser
}

export default function LeaderboardRow ({ user }: Props) {
  const isTopThree = user.rank <= 3

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all 
      duration-200 hover:scale-[1.01] hover:bg-slate-800 cursor-pointer
      ${
        isTopThree
          ? 'bg-yellow-900/20 border-yellow-500'
          : 'bg-slate-900 border-slate-800'
      }`}
    >
      {/* Rank + Avatar + Name */}
      <div className='flex items-center gap-4'>
        <span
          className={`w-8 text-center font-bold ${
            isTopThree ? 'text-yellow-400' : 'text-slate-400'
          }`}
        >
          #{user.rank}
        </span>

        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.username}
            className='w-10 h-10 rounded-full object-cover border border-slate-700'
          />
        ) : (
          <div className='w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400'>
            {user.username.charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          <p className='font-medium'>{user.username}</p>
          <p className='text-xs text-slate-400'>
            {user.walletAddress.slice(0, 4)}...
            {user.walletAddress.slice(-4)}
          </p>
        </div>
      </div>

      {/* Score */}
      <div className='text-sm font-semibold text-emerald-400 flex items-center gap-1'>
        <span>{user.score.toLocaleString()}</span>
        {isTopThree && <span className='text-yellow-400 text-lg'>★</span>}
      </div>
    </div>
  )
}
