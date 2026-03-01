import type { Trader } from './leaderboar.types'
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart
} from 'recharts'
import React, { useState } from 'react'
import { useGeneralContext } from '../../../../../Context/GeneralContext'

const Leaderboard: React.FC = () => {
  const { openVaultFlow } = useGeneralContext()
  const performanceData = [
    { date: 'Day 1', roi: 0 },
    { date: 'Day 3', roi: 8 },
    { date: 'Day 5', roi: 6 },
    { date: 'Day 7', roi: 15 },
    { date: 'Day 10', roi: 12 },
    { date: 'Day 14', roi: 25 },
    { date: 'Day 18', roi: 22 },
    { date: 'Day 22', roi: 35 },
    { date: 'Day 26', roi: 42 },
    { date: 'Day 30', roi: 60 }
  ]

  const traders: Trader[] = [
    {
      id: 1,
      rank: 1,
      name: 'Stableking',
      tag: 'Verified Alpha',
      image: '',
      tiers: 'Verified Alpha',
      type: 'PRO',
      pnl: '+18.2%',
      aum: '$0.31M',
      winRate: '88.5%',
      drawdown: '-4.2%',
      trades: 155,
      copiers: 315,
      rio: 112.4,
      follows: 840,
      sol: '2,810'
    },
    {
      id: 2,
      rank: 2,
      name: 'AlphaPrime',
      tag: 'Institutional',
      image: '',
      type: 'PRO',
      tiers: 'PRO',
      pnl: '+142.9%',
      aum: '$1.25M',
      winRate: '70.4%',
      drawdown: '-12.2%',
      trades: 128,
      copiers: 840,
      rio: 112.4,
      follows: 840,
      sol: '2,810'
    },
    {
      id: 3,
      rank: 3,
      name: 'SolWhale',
      tag: 'Elite',
      image: '',
      tiers: 'Legendary',
      type: 'PRO',
      pnl: '+98.2%',
      aum: '$0.84M',
      winRate: '72.1%',
      drawdown: '-19.9%',
      trades: 612,
      copiers: 412,
      rio: 112.4,
      follows: 840,
      sol: '2,810'
    },
    {
      id: 4,
      rank: 4,
      name: 'RiskManaged',
      tag: 'Elite',
      image: '',
      tiers: 'Legendary',
      type: 'PRO',
      pnl: '+34.3%',
      aum: '$0.33M',
      winRate: '71.8%',
      drawdown: '-14.2%',
      trades: 189,
      copiers: 128,
      rio: 112.4,
      follows: 840,
      sol: '2,810'
    },
    {
      id: 5,
      rank: 5,
      name: 'CryptoFlow',
      tag: 'Community',
      image: '',
      tiers: 'Community',
      type: 'PRO',
      pnl: '+28.5%',
      aum: '$0.94M',
      winRate: '74.2%',
      drawdown: '-8.6%',
      trades: 97,
      copiers: 80,
      rio: 112.4,
      follows: 840,
      sol: '2,810'
    },
    {
      id: 6,
      rank: 6,
      name: 'ZenTrade',
      tag: 'Verified Alpha',
      image: '',
      tiers: 'Verified Alpha',
      type: 'PRO',
      pnl: '+66.4%',
      aum: '$0.42M',
      winRate: '68.9%',
      drawdown: '-18.2%',
      trades: 425,
      copiers: 238,
      rio: 112.4,
      follows: 840,
      sol: '2,810'
    },
    {
      id: 7,
      rank: 7,
      name: 'DefiSage',
      tag: 'Verified Alpha',
      image: '',
      tiers: 'Proven Caller',
      type: 'PRO',
      pnl: '+42.1%',
      aum: '$0.38M',
      winRate: '64.2%',
      drawdown: '-22.1%',
      trades: 275,
      copiers: 162,
      rio: 112.4,
      follows: 840,
      sol: '2,810'
    },
    {
      id: 8,
      rank: 8,
      name: 'TrendFollower',
      tag: 'Rising',
      image: '',
      tiers: 'Rising',
      type: 'PRO',
      pnl: '+55.2%',
      aum: '$0.05M',
      winRate: '62.1%',
      drawdown: '-25.4%',
      trades: 142,
      copiers: 34,
      rio: 112.4,
      follows: 840,
      sol: '2,810'
    },
    {
      id: 9,
      rank: 9,
      name: 'MoonShot',
      tag: 'Rising',
      image: '',
      tiers: 'Alpha Caller',
      type: 'PRO',
      pnl: '+112.8%',
      aum: '$0.10M',
      winRate: '58.7%',
      drawdown: '-35.4%',
      trades: 94,
      copiers: 89,
      rio: 112.4,
      follows: 840,
      sol: '2,810'
    },
    {
      id: 10,
      rank: 10,
      name: 'ApeMaster',
      tag: 'Community',
      image: '',
      tiers: 'Elite Alpha',
      type: 'PRO',
      pnl: '+84.2%',
      aum: '$0.06M',
      winRate: '52.4%',
      drawdown: '-42.1%',
      trades: 32,
      copiers: 42,
      rio: 112.4,
      follows: 840,
      sol: '2,810'
    }
  ]

  const [activePeriod, setPeriod] = useState<'7D' | '30D' | '90D' | 'ALLTIME'>(
    '30D'
  )
  const [searchTerm, setSearchTerm] = useState('')

  const [activeTier, setActiveTier] = useState('ALL TIERS')
  const [tierOpen, setTierOpen] = useState(false)

  const tiers = [
    'ALL TIERS',
    'Legendary',
    'PRO',
    'Verified Alpha',
    'Elite',
    'Community',
    'Rising'
  ]

  // Filter traders dynamically based on period & search
  // const filteredTraders = traders.filter(trader => {
  //   // SEARCH FILTER
  //   const matchesSearch =
  //     trader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     trader.tag.toLowerCase().includes(searchTerm.toLowerCase())

  //   // PnL FILTER BASED ON ACTIVE PERIOD
  //   const pnlValue = parseFloat(trader.pnl.replace('%', ''))
  //   let matchesPeriod = true
  //   switch (activePeriod) {
  //     case '7D':
  //       matchesPeriod = pnlValue >= 50
  //       break
  //     case '30D':
  //       matchesPeriod = pnlValue >= 20
  //       break
  //     case '90D':
  //       matchesPeriod = pnlValue >= 0
  //       break
  //     case 'ALLTIME':
  //       matchesPeriod = true
  //       break
  //   }

  //   return matchesSearch && matchesPeriod
  // })
  const filteredTraders = traders.filter(trader => {
    const matchesSearch =
      trader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trader.tag.toLowerCase().includes(searchTerm.toLowerCase())

    const pnlValue = parseFloat(trader.pnl.replace('%', ''))

    let matchesPeriod = true
    switch (activePeriod) {
      case '7D':
        matchesPeriod = pnlValue >= 50
        break
      case '30D':
        matchesPeriod = pnlValue >= 20
        break
      case '90D':
        matchesPeriod = pnlValue >= 0
        break
      case 'ALLTIME':
        matchesPeriod = true
        break
    }

    const matchesTier =
      activeTier === 'ALL TIERS'
        ? true
        : trader.tag === activeTier || trader.type === activeTier

    return matchesSearch && matchesPeriod && matchesTier
  })

  return (
    <div className='min-h-screen bg-[#031b1f] text-white p-6 lg:p-10'>
      {/* TITLE */}
      <div className='mb-8'>
        <h1 className='text-xl font-bold flex items-center gap-2'>
          🏆 LEADERBOARD
        </h1>
        <p className='text-xs text-[#5f7d84] mt-1'>
          Ranked by verified on-chain performance and risk-adjusted consistency.
        </p>
      </div>
      {/* FILTER / SEARCH */}
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8'>
        {/* PERIOD BUTTONS */}
        <div className='flex items-center gap-2 bg-[#0a1d20] p-1 rounded-xl border border-[#123c42] w-fit'>
          {(['7D', '30D', '90D', 'ALLTIME'] as const).map(period => (
            <button
              key={period}
              onClick={() => setPeriod(period)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition ${
                activePeriod === period
                  ? 'bg-[#19d3c5] text-black'
                  : 'text-[#5f7d84] hover:text-white'
              }`}
            >
              {period === 'ALLTIME' ? 'ALL-TIME' : period}
            </button>
          ))}
        </div>
        {/* TIER DROPDOWN */}
        <div className='relative'>
          <button
            onClick={() => setTierOpen(!tierOpen)}
            className='flex items-center justify-between gap-3 bg-[#0a1d20] border border-[#123c42] rounded-xl px-4 py-2 text-xs text-white min-w-[140px] hover:border-[#19d3c5] transition'
          >
            <span className='uppercase text-[#5f7d84]'>{activeTier}</span>

            {/* Chevron */}
            <svg
              className={`w-3 h-3 transition-transform ${
                tierOpen ? 'rotate-180' : ''
              }`}
              fill='none'
              stroke='#5f7d84'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </button>

          {/* DROPDOWN MENU */}
          {tierOpen && (
            <div className='absolute mt-2 w-full bg-[#0f2a2f] border border-[#123c42] rounded-xl shadow-xl z-50 overflow-hidden'>
              {tiers.map(tier => (
                <button
                  key={tier}
                  onClick={() => {
                    setActiveTier(tier)
                    setTierOpen(false)
                  }}
                  className='w-full text-left px-4 py-2 text-xs text-[#5f7d84] hover:bg-[#102221] hover:text-white transition'
                >
                  {tier}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* SEARCH INPUT */}
        <input
          type='text'
          placeholder='Search trader...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='bg-[#0a1d20] border border-[#123c42] rounded-xl px-4 py-2 text-xs text-white placeholder-[#5f7d84] focus:outline-none focus:border-[#19d3c5] transition w-48'
        />
      </div>
      {/* Table */}
      <div className='rounded-lg border border-[#0f3a40]  overflow-hidden  bg-slate-700 '>
        <div className='overflow-x-auto scrollbar-hide   '>
          <table className='w-full min-w-[900px] lg:min-w-0 border-collapse '>
            {/* TABLE HEAD */}
            <thead className='bg-[#0a1414] h-[50px]'>
              <tr className='text-[8px] text-[#5f7d84] uppercase'>
                <th className=' thh  '>Rank</th>
                <th className=' thh'>Trader</th>
                <th className=' thh'>Type</th>
                <th className=' thh'>PnL</th>
                <th className=' thh'>AUM</th>
                <th className=' thh'>Win Rate</th>
                <th className=' thh'>Drawdown</th>
                <th className=' thh'>Trades</th>
                <th className=' thh'>Copiers</th>
                <th className=' thh'>Action</th>
              </tr>
            </thead>
            {/* TABLE BODY */}
            <tbody>
              {filteredTraders.map(trader => (
                <tr
                  key={trader.id}
                  className='border-t bg-[#102221] border-[#0f3a40] hover:bg-[#0f2a2a] transition'
                >
                  <td className='pdd text-[11px]'>{trader.rank}</td>
                  <td className='pdd'>
                    <p className='font-[900] text-[14px]'>{trader.name}</p>
                    <p className='text-[8px] text-[#5f7d84]'>{trader.tag}</p>
                  </td>
                  <td className='pdd text-[10px] text-[#709692] uppercase font-[700]'>
                    {trader.type}
                  </td>
                  <td className='dd text-[#19d3c5] font-bold'>{trader.pnl}</td>
                  <td className='pdd'>{trader.aum}</td>
                  <td className='pdd'>{trader.winRate}</td>
                  <td className='pdd text-red-400 font-semibold'>
                    {trader.drawdown}
                  </td>
                  <td className='pdd'>{trader.trades}</td>
                  <td className='pdd'>{trader.copiers}</td>
                  <td className='pdd'>
                    <button
                      onClick={() => openVaultFlow(1, trader)}
                      className='bg-[#19d3c5] text-white hover:opacity-90 transition text-[10px] font-[900] px-3 py-1 rounded-lg'
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* TRADER SPOTLIGHT */}
      <div className='mt-14'>
        {/* TITLE */}
        <h2 className='text-sm font-bold uppercase tracking-wider mb-6 flex items-center gap-2'>
          🏆 TRADER SPOTLIGHT
        </h2>

        <div className='grid lg:grid-cols-3 gap-6'>
          {/* MAIN SPOTLIGHT CARD */}
          <div className='lg:col-span-2 bg-gradient-to-br from-[#0f2a2f] to-[#0b1f23] border border-[#123c42] rounded-2xl p-6 flex flex-col lg:flex-row gap-8'>
            {/* LEFT SIDE */}
            <div className='flex-1'>
              <span className='text-[10px] bg-[#2a2a00] text-yellow-400 px-3 py-1 rounded-full uppercase tracking-wider'>
                Trader of the Week
              </span>

              <h3 className='mt-4 text-xl font-bold bg-[#0d3b40] inline-block px-2 py-1 rounded'>
                @AlphaPrime
              </h3>

              <p className='text-xs text-[#7a9398] mt-3 max-w-xs'>
                Specializing in high-frequency Solana DEX liquidity analysis and
                momentum trading.
              </p>

              {/* STATS */}
              <div className='flex gap-4 mt-6'>
                <div className='bg-[#0a1d20] px-4 py-3 rounded-xl text-center'>
                  <p className='text-[9px] text-[#5f7d84] uppercase'>
                    PNL (30D)
                  </p>
                  <p className='text-[#19d3c5] font-bold text-sm'>+142.5%</p>
                </div>

                <div className='bg-[#0a1d20] px-4 py-3 rounded-xl text-center'>
                  <p className='text-[9px] text-[#5f7d84] uppercase'>
                    Win Rate
                  </p>
                  <p className='font-bold text-sm'>78.4%</p>
                </div>

                <div className='bg-[#0a1d20] px-4 py-3 rounded-xl text-center'>
                  <p className='text-[9px] text-[#5f7d84] uppercase'>Max DD</p>
                  <p className='text-red-400 font-bold text-sm'>-12.2%</p>
                </div>
              </div>

              {/* BUTTON */}
              <button className='mt-8 bg-[#19d3c5] hover:opacity-90 transition text-black font-bold text-sm px-6 py-3 rounded-xl'>
                COPY MASTER STRATEGY ⚡
              </button>
            </div>

            {/* RIGHT GRAPH SIDE */}
            <div className='flex-1 bg-[#0a1d20] rounded-xl p-6 flex flex-col justify-between'>
              <div className='flex justify-between text-[10px] text-[#5f7d84] uppercase'>
                <span>Performance History</span>
                <span className='text-[#19d3c5]'>● Cumulative ROI</span>
              </div>

              <div className='h-44 mt-6 '>
                <ResponsiveContainer width='100%' height='100%'>
                  <AreaChart
                    data={performanceData}
                    margin={{ top: 10, right: 20, left: 5, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id='colorRoi' x1='0' y1='0' x2='0' y2='1'>
                        <stop
                          offset='0%'
                          stopColor='#19d3c5'
                          stopOpacity={0.4}
                        />
                        <stop
                          offset='100%'
                          stopColor='#19d3c5'
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      stroke='#123c42'
                      strokeDasharray='3 3'
                      vertical={false}
                    />

                    <XAxis
                      dataKey='date'
                      tick={{ fill: '#5f7d84', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      tick={{ fill: '#5f7d84', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      width={10}
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0a1d20',
                        border: '1px solid #123c42',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />

                    <Area
                      type='monotone'
                      dataKey='roi'
                      stroke='#19d3c5'
                      strokeWidth={3}
                      fillOpacity={1}
                      fill='url(#colorRoi)'
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ALPHA SIGNALS */}
          <div className='bg-gradient-to-br from-[#0f2a2f] to-[#0b1f23] border border-[#123c42] rounded-2xl p-6'>
            <h4 className='text-sm font-bold mb-6'>ALPHA SIGNALS</h4>

            <div className='space-y-6 text-sm'>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-[10px] text-[#5f7d84] uppercase'>
                    Risk-Adjusted Ratio
                  </p>
                  <p className='font-bold text-lg'>4.8</p>
                </div>
                <span className='text-xs bg-[#0d3b40] text-[#19d3c5] px-3 py-1 rounded-full'>
                  OPTIMAL
                </span>
              </div>

              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-[10px] text-[#5f7d84] uppercase'>
                    Avg Trade Hold
                  </p>
                  <p className='font-bold text-lg'>4.2h</p>
                </div>
                <span className='text-xs bg-[#0d3b40] text-[#19d3c5] px-3 py-1 rounded-full'>
                  STABLE
                </span>
              </div>

              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-[10px] text-[#5f7d84] uppercase'>
                    Total Copier Equity
                  </p>
                  <p className='font-bold text-lg'>$2.4M</p>
                </div>
                <span className='text-xs bg-[#0d3b40] text-[#19d3c5] px-3 py-1 rounded-full'>
                  GROWING
                </span>
              </div>
            </div>

            <div className='mt-8 text-[10px] text-[#5f7d84] bg-[#0a1d20] p-4 rounded-xl'>
              “Consistent sizing and disciplined exit strategy are the bedrock
              of my trading. Risk management is the only holy grail.”
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
