import { useState } from 'react'

import type { PinnedVault, Strategy } from './portfolio.types'
import { fmt, fmtCompactCurrency } from '../../../../../utils/currencyHelpers'
import MasterMode from './MasterMode'
import { useTradingModeStore } from '../../../useTradingModeStore'
import { useWallet } from '@solana/wallet-adapter-react'
import CopierMode from './CopierMode'

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Seed data ────────────────────────────────────────────────────────────────

const INITIAL_STRATEGIES: Strategy[] = [
  {
    id: '1',
    name: 'ALPHASEEKER\nCOPY VAULT',
    walletSnippet: '7xWp...3aQ1',
    balanceSol: 14.2,
    balanceUsd: 2023.5,
    unrealizedPnlUsd: 142,
    unrealizedPnlPct: 7.2,
    riskRules: { tp: 20, sl: 5 },
    lastActivityLabel: '14M AGO'
  },
  {
    id: '2',
    name: 'SOLWHALE\nAGGRESSIVE VAULT',
    walletSnippet: '9zL1...5k2b',
    balanceSol: 42,
    balanceUsd: 5985,
    unrealizedPnlUsd: -12.5,
    unrealizedPnlPct: -0.2,
    riskRules: { tp: 15, sl: 3 },
    lastActivityLabel: '2D AGO'
  }
]

const INITIAL_PINNED_VAULTS: PinnedVault[] = [
  {
    id: 'p1',
    name: 'PINNED MASTER VAULT',
    walletSnippet: '3vK1...9pX4',
    connectedCopiers: 152,
    lastExecution: '2M AGO',
    totalBalanceSol: 1420.5,
    totalBalanceUsd: 202421.25,
    activePositions: 3,
    stopLoss: null,
    takeProfit: null,
    availableFeesSol: 12.42,
    historicalClaimedSol: 142.5,
    tier: 'ELITE ALPHA TIER'
  }
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

// ─── Add Strategy Modal ───────────────────────────────────────────────────────

interface AddModalProps {
  onClose: () => void
  onAdd: (s: Strategy) => void
}

function AddStrategyModal ({ onClose, onAdd }: AddModalProps) {
  const [form, setForm] = useState({
    name: '',
    walletSnippet: '',
    balanceSol: '',
    balanceUsd: '',
    unrealizedPnlUsd: '',
    unrealizedPnlPct: '',
    tp: '',
    sl: '',
    lastActivityLabel: 'JUST NOW'
  })

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const s: Strategy = {
      id: Date.now().toString(),
      name: form.name || 'NEW VAULT',
      walletSnippet: form.walletSnippet || 'xxx...xxx',
      balanceSol: parseFloat(form.balanceSol) || 0,
      balanceUsd: parseFloat(form.balanceUsd) || 0,
      unrealizedPnlUsd: parseFloat(form.unrealizedPnlUsd) || 0,
      unrealizedPnlPct: parseFloat(form.unrealizedPnlPct) || 0,
      riskRules: { tp: parseFloat(form.tp) || 0, sl: parseFloat(form.sl) || 0 },
      lastActivityLabel: form.lastActivityLabel || 'JUST NOW'
    }
    onAdd(s)
    onClose()
  }

  const fields = [
    { label: 'Vault Name', key: 'name', placeholder: 'e.g. MOONSEEKER VAULT' },
    {
      label: 'Wallet Snippet',
      key: 'walletSnippet',
      placeholder: 'e.g. 4Xb...9qR'
    },
    { label: 'Balance (SOL)', key: 'balanceSol', placeholder: 'e.g. 25.50' },
    { label: 'Balance (USD)', key: 'balanceUsd', placeholder: 'e.g. 3620.00' },
    {
      label: 'Unrealized PnL (USD)',
      key: 'unrealizedPnlUsd',
      placeholder: 'e.g. -45.00'
    },
    {
      label: 'Unrealized PnL (%)',
      key: 'unrealizedPnlPct',
      placeholder: 'e.g. -1.2'
    },
    { label: 'Take-Profit (%)', key: 'tp', placeholder: 'e.g. 20' },
    { label: 'Stop-Loss (%)', key: 'sl', placeholder: 'e.g. 5' },
    {
      label: 'Last Activity',
      key: 'lastActivityLabel',
      placeholder: 'e.g. 3H AGO'
    }
  ]

  return (
    <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
      <div className='bg-[#0e1821] border border-[#1e2d3d] rounded-2xl p-8 w-[560px] max-h-[90vh] overflow-y-auto shadow-2xl'>
        <div className='flex justify-between items-center mb-7'>
          <span className='text-[13px] font-extrabold tracking-[0.15em] text-white'>
            DEPLOY NEW STRATEGY VAULT
          </span>
          <button
            onClick={onClose}
            className='text-[#4a5a6a] hover:text-white transition-colors bg-transparent border-none text-xl leading-none cursor-pointer'
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-x-5 gap-y-5 mb-7'>
            {fields.map(({ label, key, placeholder }) => (
              <label key={key} className='flex flex-col gap-2'>
                <span className='text-[10px] text-[#4a5a6a] tracking-[0.15em] uppercase font-bold'>
                  {label}
                </span>
                <input
                  className='bg-[#080f16] border border-[#1a2a3a] rounded-lg text-[#c8d8e8] font-mono text-xs px-3 py-2.5 outline-none focus:border-[#00ffa3]/60 transition-colors placeholder:text-[#2a3a4a]'
                  value={(form as Record<string, string>)[key]}
                  onChange={set(key)}
                  placeholder={placeholder}
                />
              </label>
            ))}
          </div>

          <div className='flex justify-end gap-3 pt-2'>
            <button
              type='button'
              onClick={onClose}
              className='border border-[#1e2d3d] text-[#6b7a8d] rounded-lg px-6 py-2.5 text-[11px] font-bold tracking-[0.12em] cursor-pointer hover:border-[#2e3d4d] hover:text-[#9aabbc] transition-colors bg-transparent font-mono'
            >
              CANCEL
            </button>
            <button
              type='submit'
              className='bg-[#00ffa3] text-[#050e15] rounded-lg px-6 py-2.5 text-[11px] font-extrabold tracking-[0.12em] cursor-pointer hover:bg-[#00e692] transition-colors font-mono'
            >
              DEPLOY VAULT
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

export default function Portfolio ({
  setWalletModal
}: {
  setWalletModal: (open: boolean) => void
}) {
  const { connected } = useWallet()

  const [strategies, setStrategies] = useState<Strategy[]>(INITIAL_STRATEGIES)
  const [activeTab, setActiveTab] = useState<'vaults' | 'activity'>('vaults')
  const [showModal, setShowModal] = useState(false)
  const [pinnedVaults] = useState<PinnedVault[]>(INITIAL_PINNED_VAULTS)
  const { masterMode } = useTradingModeStore()

  const totalBalance = strategies.reduce((s, v) => s + v.balanceUsd, 0)
  const total24hChange = strategies.reduce((s, v) => s + v.unrealizedPnlUsd, 0)
  const changePositive = total24hChange >= 0

  const addStrategy = (s: Strategy) => setStrategies(prev => [...prev, s])
  const removeStrategy = (id: string) =>
    setStrategies(prev => prev.filter(s => s.id !== id))

  const stats = [
    {
      tittle: 'Total Balance',
      icon: '/images/balance.svg',
      value: totalBalance,
      type: 'currency'
    },
    {
      tittle: '24h Change',
      icon: '/images/change.svg',
      value: total24hChange,
      type: 'currency',
      positive: changePositive
    },
    {
      tittle: 'Total Vaults',
      icon: '/images/total.svg',
      value: strategies.length,
      type: 'number'
    },
    {
      tittle: 'Claimable Fees',
      value: 1240.5,
      type: 'currency'
    },
    {
      tittle: 'Total AUM',
      icon: '/images/totalAum.svg',
      value: 4800000,
      type: 'compactCurrency'
    }
  ]

  return (
    <div className='min-h-screen   '>
      {/* ── Header ── */}
      <header className='flex bg-[#091114] justify-between items-center px-10 py-7 border-b border-[#111d27]'>
        {/* Left: title */}
        <div>
          <p className='text-[32px] font-[900]  text-white  m-0'>PORTFOLIO</p>
          <p className='text-[13px] font-[500] text-[#5c7a78] tracking-wide mt-1 m-0'>
            Financial control center for non-custodial assets.
          </p>
        </div>

        {/* Right: stats */}
        <div className='flex items-center gap-10'>
          {stats &&
            stats.map((item, i) => (
              <div key={i} className='flex flex-col gap-1'>
                <div className='flex items-center gap-1'>
                  <span
                    className='bg-center bg-cover h-[12px] w-[12px]'
                    style={{ backgroundImage: `url(${item.icon})` }}
                  ></span>
                  <span className='text-[10px] text-[#2e4041] font-[900] uppercase flex items-center gap-1'>
                    {item.tittle}
                  </span>
                </div>
                <span
                  className={`text-[22px] font-bold ${
                    item.tittle === '24h Change'
                      ? 'text-[#00C0A8]'
                      : item.tittle === 'Claimable Fees'
                      ? 'text-[#FE9A00]'
                      : ''
                  } tracking-tight`}
                >
                  {item.type === 'compactCurrency'
                    ? fmtCompactCurrency(item.value)
                    : item.type === 'currency'
                    ? fmt(item.value)
                    : item.value}
                </span>
              </div>
            ))}
        </div>
      </header>

      {/* ── Tab bar ── */}
      <div className='flex justify-between items-center px-10 border-b border-[#111d27]'>
        <div className='flex'>
          {(['vaults', 'activity'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 pt-4 pb-3 text-[11px] font-[900] tracking-[0.14em] border-b-2 transition-all cursor-pointer bg-transparent  ${
                activeTab === tab
                  ? 'text-white border-[#00ffa3]'
                  : 'text-[#273634] border-transparent hover:text-[#7a9ab0]'
              }`}
            >
              {tab === 'vaults' ? 'MY STRATEGY VAULTS' : 'VAULT ACTIVITY'}
            </button>
          ))}
        </div>
        <span className='text-[11px] text-[#273634] tracking-[0.15em] uppercase font-[900]'>
          SYNC STATUS:
          <span className='text-[#00ffa3] font-[900]  '>LIVE INDEXER</span>
        </span>
      </div>

      {/* ── Content ── */}
      <main className='px-10 py-5 flex flex-col gap-3 '>
        {/* PINNED VAULTS */}

        {activeTab === 'vaults' ? (
          <>
            {connected ? (
              <>
                {masterMode ? (
                  <>
                    <MasterMode
                      activeTab={activeTab}
                      pinnedVaults={pinnedVaults}
                      strategies={strategies}
                      removeStrategy={removeStrategy}
                      setShowModal={setShowModal}
                    />
                  </>
                ) : (
                  <>
                    <CopierMode
                      activeTab={activeTab}
                      strategies={strategies}
                      removeStrategy={removeStrategy}
                      setShowModal={setShowModal}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <div className='w-full rounded-2xl p-10 md:p-16 bg-[#102221]  border border-teal-900/40 flex flex-col items-center justify-center text-center space-y-6'>
                  {/* Icon Circle */}
                  <div className='h-[72px] w-[72px] rounded-full bg-teal-500/10 flex items-center justify-center'>
                    <span
                      className='h-[32px] w-[32px] bg-center bg-cover'
                      style={{
                        backgroundImage: `url("/images/wallet.svg")`
                      }}
                    ></span>
                  </div>

                  {/* Title */}
                  <h2 className='text-lg md:text-xl font-bold text-white tracking-wide uppercase '>
                    ⚠️ No Wallet, No Vault!
                  </h2>

                  {/* Description */}
                  <p className='text-sm text-[#B0E4DD80] max-w-md leading-relaxed'>
                    Connect your wallet to unlock your vaults, track your
                    trades, and manage your copy positions. Non-custodial.
                    Always yours.
                  </p>

                  {/* Button */}
                  <button
                    onClick={() => setWalletModal(true)}
                    className='px-8 py-3 bg-teal-500 hover:bg-teal-600 rounded-xl font-semibold text-sm transition shadow-[0_0_25px_rgba(20,184,166,0.35)]'
                  >
                    CONNECT WALLET
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {connected ? (
              <div className='text-center text-[#2a3a4a] text-[12px] py-20 tracking-[0.15em] uppercase'>
                No recent vault activity to display.
              </div>
            ) : (
              <>
                <div className='w-full rounded-2xl p-10 md:p-16 bg-[#102221]  border border-teal-900/40 flex flex-col items-center justify-center text-center space-y-6'>
                  {/* Icon Circle */}
                  <div className='h-[72px] w-[72px] rounded-full bg-teal-500/10 flex items-center justify-center'>
                    <span
                      className='h-[32px] w-[32px] bg-center bg-cover'
                      style={{
                        backgroundImage: `url("/images/wallet.svg")`
                      }}
                    ></span>
                  </div>

                  {/* Title */}
                  <h2 className='text-lg md:text-xl font-bold text-white tracking-wide uppercase '>
                    ⚠️ No Wallet, No Vault!
                  </h2>

                  {/* Description */}
                  <p className='text-sm text-[#B0E4DD80] max-w-md leading-relaxed'>
                    Connect your wallet to unlock your vaults, track your
                    trades, and manage your copy positions. Non-custodial.
                    Always yours.
                  </p>

                  {/* Button */}
                  <button
                    onClick={() => setWalletModal(true)}
                    className='px-8 py-3 bg-teal-500 hover:bg-teal-600 rounded-xl font-semibold text-sm transition shadow-[0_0_25px_rgba(20,184,166,0.35)]'
                  >
                    CONNECT WALLET
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </main>

      {/* ── Add Strategy Modal ── */}
      {showModal && (
        <AddStrategyModal
          onClose={() => setShowModal(false)}
          onAdd={addStrategy}
        />
      )}
    </div>
  )
}
