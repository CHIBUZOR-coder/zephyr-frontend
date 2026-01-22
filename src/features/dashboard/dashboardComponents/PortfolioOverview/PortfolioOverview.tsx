import { usePortfolioOverview } from '../../usePortfolioOverview'

export default function PortfolioOverview () {
  const { connected, isLoading, data } = usePortfolioOverview()

  if (!connected) {
    return (
      <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6'>
        <p className='text-slate-400 text-sm'>
          Connect your wallet to view portfolio summary.
        </p>
      </div>
    )
  }

  if (isLoading || !data) {
    return (
      <section className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </section>
    )
  }

  return (
    <section className='grid grid-cols-1 md:grid-cols-4 gap-6'>
      <Card title='Total Balance' value={`${data.totalBalance} SOL`} />
      <Card title='PnL' value={`${data.totalPnL} SOL`} />
      <Card title='Active Vaults' value={data.vaultCount} />
      <Card title='AUM' value={`${data.aum} SOL`} />
    </section>
  )
}

function Card ({ title, value }: { title: string; value: string | number }) {
  return (
    <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6'>
      <p className='text-sm text-slate-400'>{title}</p>
      <p className='text-2xl font-bold mt-2 text-white'>{value}</p>
    </div>
  )
}

function SkeletonCard () {
  return (
    <div className='bg-slate-900 border border-slate-800 rounded-2xl p-6 animate-pulse'>
      <div className='h-4 bg-slate-700 rounded w-1/2 mb-3' />
      <div className='h-8 bg-slate-700 rounded w-3/4' />
    </div>
  )
}
