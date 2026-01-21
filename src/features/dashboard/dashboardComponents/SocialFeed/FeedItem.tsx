import type { FeedItemType } from './socialFeed.types'
import { formatDistanceToNow } from 'date-fns' 

type Props = {
  item: FeedItemType
}

export default function FeedItem ({ item }: Props) {
  return (
    <div className='bg-slate-900 border border-slate-800 rounded-xl p-4 shadow hover:shadow-lg transition-shadow duration-200'>
      <div className='flex items-center gap-3 mb-2'>
        {item.avatarUrl ? (
          <img
            src={item.avatarUrl}
            alt={item.username}
            className='w-10 h-10 rounded-full object-cover border border-slate-700'
          />
        ) : (
          <div className='w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400'>
            {item.username.charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          <p className='font-semibold'>{item.username}</p>
          <p className='text-xs text-slate-400'>
            {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
          </p>
        </div>
      </div>

      <p className='text-slate-300 mb-3'>{item.content}</p>

      <div className='flex items-center gap-4 text-slate-400 text-sm'>
        <span className='hover:text-red-400 cursor-pointer'>
          ♥ {item.likes ?? 0}
        </span>
        <span className='hover:text-blue-400 cursor-pointer'>
          💬 {item.comments ?? 0}
        </span>
        <span className='hover:text-green-400 cursor-pointer'>🔗 Share</span>
      </div>
    </div>
  )
}
