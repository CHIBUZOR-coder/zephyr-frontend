import React, { useState } from 'react'

type Trader = {
  name: string
  tyter: string
  trade: string
  amout: string
  wallet: string
  action: 'BUY' | 'SELL'
  time: string
}

const LiveTrade: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'positions'>('all')

  const liveTraders: Trader[] = [
    {
      name: '@sol_whale',
      tyter: 'Elite Alpha',
      trade: 'SOL/USDC',
      amout: '142.50 SOL',
      wallet: '5K2b...9zL1',
      action: 'BUY',
      time: '12s ago'
    },
    {
      name: '@alpha_seeker',
      tyter: 'Verified Alpha',
      trade: 'SOL/USDC',
      amout: '25,000 JUP',
      wallet: '2A7x...4mP9',
      action: 'BUY',
      time: '45s ago'
    },
    {
      name: '@zephyr_mod',
      tyter: 'Verified Alpha',
      trade: 'BONK/SOL',
      amout: '4.2B BONK',
      wallet: '9L1v...2qW8',
      action: 'SELL',
      time: '1m ago'
    },
    {
      name: '@degenslayer',
      tyter: 'Community',
      trade: 'BONK/SOL',
      amout: '1,200 PYTH',
      wallet: '3H5b...7fR4',
      action: 'SELL',
      time: '2m ago'
    },
    {
      name: '@macro_king',
      tyter: 'Elite Alpha',
      trade: 'SOL/USDC',
      amout: '85.00 SOL',
      wallet: '8M2k...1tY3',
      action: 'BUY',
      time: '3m ago'
    },
    {
      name: '@onchain_guru',
      tyter: 'Legendary',
      trade: 'WIF/SOL',
      amout: '450.20 WIF',
      wallet: '8M2k...1tY3',
      action: 'BUY',
      time: '5m ago'
    },
    {
      name: '@smart_money',
      tyter: 'Verified Alpha',
      trade: 'DRIFT/USDC',
      amout: '15,000 DRIFT',
      wallet: '1Z3m...5uI9',
      action: 'SELL',
      time: '8m ago'
    },
    {
      name: '@velocity_cap',
      tyter: 'Elite Alpha',
      trade: 'SOL/USDC',
      amout: '200.00 SOL',
      wallet: '1Z3m...5uI9',
      action: 'BUY',
      time: '8m ago'
    }
  ]

  const badgeColor = (type: string) => {
    switch (type) {
      case 'Elite Alpha':
        return 'bg-purple-600/20 text-purple-400'
      case 'Verified Alpha':
        return 'bg-green-600/20 text-green-400'
      case 'Legendary':
        return 'bg-yellow-500/20 text-yellow-400'
      default:
        return 'bg-gray-600/20 text-gray-300'
    }
  }

  // 🔥 Filter based on active tab
  const filteredTrades =
    activeTab === 'all'
      ? liveTraders
      : liveTraders.filter(trader => trader.name === '@sol_whale') // simulate "my positions"

  return (
    <div className='min-h-screen text-white  '>
      {/* Header */}
      <div className='flex justify-between items-center mb-8 bg-[#091114] p-8 flex-col lg:flex-row gap-5'>
        <div>
          <h1 className='text-2xl font-bold'>LIVE TRADES</h1>
          <p className='text-sm text-[#B0E4DD80] text-[13px] font-[500]'>
            Real-time execution layer across the Zephyr protocol.
          </p>
        </div>

        {/* 🔥 Toggle Switch */}
        <div className='flex bg-[#0B2025] p-1 rounded-xl border border-teal-900/40'>
          <button
            onClick={() => setActiveTab('all')}
            className={`flex justify-between items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === 'all'
                ? 'bg-teal-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span
              style={{ backgroundImage: `url("/images/all.svg")` }}
              className='bg-center bg-cover h-[12px] w-[12px]'
            ></span>
            <span> All Zephyr Trades</span>
          </button>

          <button
            onClick={() => setActiveTab('positions')}
            className={`flex justify-between items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === 'positions'
                ? 'bg-teal-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span
              style={{ backgroundImage: `url("/images/position.svg")` }}
              className='bg-center bg-cover h-[12px] w-[12px]'
            ></span>
            <span className='text-[#B0E4DD66]'> My Positions </span>
          </button>
        </div>
      </div>

      <div className='w-full px-4 md:px-8 '>
        {/* Scroll Wrapper */}
        <div className='overflow-x-auto'>
          <div className='min-w-[900px]'>
            {/* Table Head */}
            <div className='grid grid-cols-4 text-xs text-[#B0E4DD4D] font-[900] px-4 mb-3'>
              <span>TRADER</span>
              <span>TRADE DETAILS</span>
              <span>EXECUTION</span>
              <span className='text-right'>VERIFICATION</span>
            </div>

            {/* Trades */}
            <div className='space-y-4'>
              {filteredTrades.map((trader, index) => (
                <div
                  key={index}
                  className='grid grid-cols-4 items-center px-4 py-4 rounded-xl 
            bg-[#102221] border border-teal-900/40 
            hover:border-teal-500/40 transition'
                >
                  {/* Trader */}
                  <div className='flex items-center gap-2'>
                    <div className='rounded-lg bg-[#00000066] py-2 px-3'>
                      
                      <span
                        className='bg-center bg-cover h-[20px] w-[20px] inline-block'
                        style={{
                          backgroundImage: `url("/images/liveperson.svg")`
                        }}
                      ></span>
                    </div>

                    <div>
                      <p className='font-semibold text-sm md:text-base'>
                        {trader.name}
                      </p>
                      <span
                        className={`text-[10px] px-2 py-1 rounded-full ${badgeColor(
                          trader.tyter
                        )}`}
                      >
                        {trader.tyter}
                      </span>
                    </div>
                  </div>

                  {/* Trade Details */}
                  <div>
                    <div className='flex items-center gap-2'>
                      <span className='font-semibold text-sm'>
                        {trader.trade}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-1 rounded ${
                          trader.action === 'BUY'
                            ? 'bg-green-600/20 text-green-400'
                            : 'bg-red-600/20 text-red-400'
                        }`}
                      >
                        {trader.action}
                      </span>
                    </div>
                    <p className='text-sm text-gray-400'>{trader.amout}</p>
                  </div>

                  {/* Execution */}
                  <div>
                    <div className='text-green-400 font-semibold text-sm flex items-center gap-2'>
                      <span
                        className='bg-center bg-cover h-[16px] w-[16px]'
                        style={{
                          backgroundImage: `url("/images/greencheck.svg")`
                        }}
                      ></span>
                      <span>EXECUTED</span>
                    </div>

                    <div className='text-xs text-gray-400 flex items-center gap-2'>
                      <span
                        className='bg-center bg-cover h-[12px] w-[12px]'
                        style={{
                          backgroundImage: `url("/images/time.svg")`
                        }}
                      ></span>
                      <span>{trader.time}</span>
                    </div>
                  </div>

                  {/* Wallet */}
                  <div className='flex justify-end'>
                    <div
                      className='flex items-center gap-3 px-3 py-1 
              bg-[#00000066] rounded-lg text-xs text-gray-300 
              border border-teal-800 whitespace-nowrap'
                    >
                      <p>{trader.wallet}</p>
                      <span
                        className='bg-center bg-cover h-[12px] w-[12px] cursor-pointer'
                        style={{
                          backgroundImage: `url("/images/redirectlive.svg")`
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='px-8 py-4'>
        <div className='flex justify-center items-center gap-4 '>
          <span
            className='bg-center bg-cover h-[14px] w-[14px] '
            style={{
              backgroundImage: `url("/images/blackshild.svg")`
            }}
          ></span>
          <p className='text-[#B0E4DD4D] text-[10px] text-center font-[700] leading-[15px] uppercase tracking-[2px]'>
            Verified Real-time Stream • Institutional Transparency •
            Non-Custodial Execution
          </p>
        </div>
      </div>
    </div>
  )
}

export default LiveTrade
