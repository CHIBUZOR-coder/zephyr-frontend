import FeedItem from './FeedItem'
import type { FeedItemType } from './socialFeed.types'

const MOCK_FEED: FeedItemType[] = [
  {
    id: '1',
    username: 'AlphaTrader',
    avatarUrl: 'https://i.pravatar.cc/40?img=4',
    content: 'Just connected my wallet to Zephyr! Excited to explore!',
    timestamp: new Date().toISOString(),
    likes: 10,
    comments: 2
  },
  {
    id: '2',
    username: 'SolWhale',
    avatarUrl: 'https://i.pravatar.cc/40?img=5',
    content: 'Completed my first vault deposit! #Solana',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    likes: 7,
    comments: 1
  },
  {
    id: '3',
    username: 'ZephyrUser',
    content: 'Can anyone recommend a good trading strategy for beginners?',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    likes: 3,
    comments: 4
  }
]

export default function SocialFeed () {
  return (
    <div  className=''>

      <section className=''>
        <h2 className='text-xl font-semibold mb-4'>Social Feed</h2>

        <div className='space-y-3 max-h-[500px] overflow-y-auto'>
          {MOCK_FEED.map(item => (
            <FeedItem key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
