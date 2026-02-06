import { traders } from './data'

const riskStyle = {
  LOW: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  MODERATE: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  HIGH: 'bg-red-500/10 text-red-400 border-red-500/20'
}

export default function TopTradersTable () {
  return (
    <section className=' mt-16'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-white text-lg font-semibold tracking-wide'>
          TOP TRADERS OF THE WEEK
        </h2>
        <button className='text-teal-400 text-xs font-medium hover:underline'>
          VIEW FULL LEADERBOARD
        </button>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <div className='min-w-[960px] rounded-2xl bg-gradient-to-b from-[#0f1b1b] to-[#0b1414] border border-white/10'>
          {/* Column headers */}
          <div className='grid grid-cols-[3fr_1.5fr_1.5fr_1.5fr_1fr] px-6 py-4 text-[11px] uppercase tracking-widest text-gray-400 border-b border-white/10'>
            <span>Trader</span>
            <span>ROI (7D)</span>
            <span>Win Rate</span>
            <span>Risk Score</span>
            <span>AUM</span>
          </div>

          {/* Rows */}
          {traders.map((trader, index) => (
            <div
              key={trader.id}
              className='grid grid-cols-[3fr_1.5fr_1.5fr_1.5fr_1fr] px-6 py-5 items-center border-b border-white/5 last:border-none hover:bg-white/5 transition'
            >
              {/* Trader */}
              <div className='flex items-center gap-4'>
                <div
                  className={`h-11 w-11 rounded-full ${
                    index === 0
                      ? 'bg-gradient-to-br from-purple-500 to-indigo-400'
                      : index === 1
                      ? 'bg-gradient-to-br from-cyan-400 to-sky-500'
                      : 'bg-gradient-to-br from-pink-500 to-rose-400'
                  }`}
                />
                <div>
                  <p className='text-white font-medium leading-none'>
                    {trader.name}
                  </p>
                  <p className='text-xs text-gray-400 mt-1'>
                    Member since {trader.memberSince}
                  </p>
                </div>
              </div>

              {/* ROI */}
              <div className='text-green-400 font-semibold'>
                +{trader.roi7d}%
              </div>

              {/* Win rate */}
              <div className='text-white'>{trader.winRate}%</div>

              {/* Risk */}
              <div>
                <span
                  className={`inline-flex items-center px-3 py-1 text-[11px] font-semibold rounded-md border ${
                    riskStyle[trader.risk]
                  }`}
                >
                  {trader.risk}
                </span>
              </div>

              {/* AUM */}
              <div className='text-white'>{trader.aum}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
