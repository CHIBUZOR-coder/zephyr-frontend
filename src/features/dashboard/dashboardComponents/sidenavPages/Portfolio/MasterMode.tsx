import { fmt, fmtSol } from '../../../../../utils/currencyHelpers'
import type { PinnedVault, Strategy } from './portfolio.types'
interface MasterModeProps {
  pinnedVaults: PinnedVault[]
  activeTab: string
  strategies: Strategy[]
  removeStrategy: (id: string) => void
  setShowModal: (show: boolean) => void
}

const MasterMode = ({
  pinnedVaults,
  strategies,
  removeStrategy,
  setShowModal
}: MasterModeProps) => {
  return (
    <div>
      <div className='flex items-center justify-between gap-3 mt-8 mb-3'>
        <div className='flex items-center gap-3'>
          <span
            className='bg-center bg-cover w-[20px] h-[20px] inline-block '
            style={{ backgroundImage: `url("/images/badgechek.svg")` }}
          ></span>
          <span className='text-[14px] text-white font-[900] leading-[20px] tracking-[4.2px] uppercase'>
           Master Vault
          </span>
        </div>
        <span className='text-[9px] font-[900] text-[#009883] uppercase'>
          Locked Index
        </span>
      </div>
      {pinnedVaults.map(vault => (
        <div className='flex flex-col gap-8'>
          {/* Connected Copiers */}
          <div
            key={vault.id}
            className='bg-[#102221] border-2 border-[#009883] rounded-2xl p-6 '
          >
            {/* <span className='text-[10px] bg-[#0e1c28] border border-[#162030] px-2 py-0.5 rounded text-[#7a9ab0]'>
  {vault.walletSnippet}
</span> */}
            <div className='flex gap-4'>
              <div>
                <div className=' p-3 bg-[#0a1414] rounded-2xl flex justify-center items-center'>
                  <span
                    className='bg-center bg-cover w-[32px] h-[32px] inline-block '
                    style={{
                      backgroundImage: `url("/images/badgechek.svg")`
                    }}
                  ></span>
                </div>
              </div>

              <div>
                {/* Top Stats Row */}
                <div className='flex justify-between items-center gap-8 mb-6'>
                  {/* Left info */}
                  <div className='flex items-center gap-8'>
                    <div className='flex flex-col gap-4'>
                      <div className='bg-[#0a1414] justify-center rounded-lg flex items-center gap-2 w-[6.5rem] px-2 py-1 '>
                        <span className='text-[#3c5250] text-[9px] font-[700]'>
                          3vK1...9pX4
                        </span>
                        <span
                          className='h-[10px] w-[10px] bg-center bg-cover'
                          style={{
                            backgroundImage: `url("/images/copy.svg")`
                          }}
                        ></span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <span
                          className='h-[12px] w-[12px] bg-center bg-cover'
                          style={{
                            backgroundImage: `url("/images/totalAum.svg")`
                          }}
                        ></span>
                        <p className='text-[10px] font-[900] text-[#009883] uppercase '>
                          {vault.connectedCopiers}{' '}
                          <span>Connected Copiers</span>
                        </p>
                      </div>
                      <div className='flex items-center justify-start gap-3  '>
                        <span
                          className='h-[12px] w-[12px] bg-center bg-cover'
                          style={{
                            backgroundImage: `url("/images/time.svg")`
                          }}
                        ></span>

                        <p className='text-[10px] text-[#304947] font-[900]'>
                          Last execution: {vault.lastExecution}
                        </p>
                      </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                      <p className='text-[10px] text-[#546462] uppercase font-bold'>
                        Total Balance
                      </p>
                      <p className='text-white font-bold text-lg'>
                        {fmtSol(vault.totalBalanceSol)} SOL
                      </p>
                      <p className='text-[#546462] text-[11px] font-[700]'>
                        {fmt(vault.totalBalanceUsd)}
                      </p>
                    </div>

                    <div className='flex flex-col gap-2'>
                      <p className='text-[10px] text-[#546462] uppercase font-bold'>
                        Active Positions
                      </p>
                      <p className='text-white text-[16px] font-[900]'>
                        {vault.activePositions}
                      </p>
                      <p className='text-[#546462]  text-[11px] font-[700]'>
                        Master Executing
                      </p>
                    </div>

                    <div className='flex flex-col gap-2'>
                      <p className='text-[9px] text-[#546462] uppercase font-[900]'>
                        Risk Protection
                      </p>
                      <p className='text-white font-bold text-sm'>
                        SL: {vault.stopLoss ?? 'N/A'}
                      </p>
                      <p className='text-[#546462] text-[11px] font-[700]'>
                        TP: {vault.takeProfit ?? 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className='flex gap-3'>
                    <button className='border border-[#0a4e45] text-[#009883] rounded-lg px-5 py-2 text-[11px] font-bold tracking-[0.1em] hover:bg-[#00ffa3]/10 transition'>
                      + DEPOSIT
                    </button>
                    <button className='border border-[#0a4e45] text-[#fff] rounded-lg px-5 py-2 text-[11px] font-bold tracking-[0.1em] hover:border-[#2e4050] hover:bg-[#00ffa3]/10 transition'>
                      − WITHDRAW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Earnings Section */}
          <div className='flex justify-between items-center bg-[#102221] border-[1.2px] border-[#18312b] rounded-xl p-5'>
            <div className='flex items-center gap-5'>
              <div className='border-[1.5px] bg-earn border-earnparent p-3 rounded-2xl'>
                <span
                  style={{ backgroundImage: `url("/images/dollar.svg")` }}
                  className='bg-cover bg-center w-[40px] h-[40px] inline-block'
                ></span>
              </div>
              <div>
                <p className='text-[10px] text-[#FE9A00] tracking-[0.15em] uppercase font-bold'>
                  Earning Performance Fees
                </p>
                <p className='text-white text-[24px] font-[900]'>
                  {vault.availableFeesSol} SOL Available
                </p>
                <div className='flex items-center gap-2'>
                  <p className='text-[10px] text-[#546462] font-[900]'>
                    Historical Claimed: {vault.historicalClaimedSol} SOL
                  </p>
                  <span className='text-[8px] bg-[#2a1140] text-[#c084fc] border border-titer px-2 py-0.5 rounded font-[900] italic'>
                    {vault.tier}
                  </span>
                </div>
              </div>
            </div>

            <button className='bg-[#FE9A00]     shadow-[0_6px_12px_rgba(254,154,0,0.6)] px-8 py-3 rounded-xl hover:brightness-110 transition flex items-center gap-2'>
              <span className='text-black font-[900]  tracking-[0.15em] ' >CLAIM EARNING FEES</span>
              <span
                style={{ backgroundImage: `url("/images/claim.svg")` }}
                className='bg-cover bg-center w-[20px] h-[20px] inline-block'
              ></span>
            </button>
          </div>
        </div>
      ))}

      <div className='mt-10'>
        {/*
              ── Each strategy object is mapped directly to card JSX here ──
              No child component — the full card UI lives inline in this map.
              To add a strategy: fill in the modal → onAdd appends to the array.
              To remove one: "STOP COPY" calls removeStrategy which filters it out.
            */}

        <div className='flex items-center gap-4'>
          <span
            className='h-[20px] w-[20px]'
            style={{ backgroundImage: `url("/images/thunder.svg")` }}
          ></span>
          <p className='text-white text-[14px] font-[900] uppercase leading-5 tracking-[4.2px]'>
            Strategy Mirroring Vaults
          </p>
        </div>
        <div className='flex flex-col gap-4 mt-5'>
          {strategies.map(strategy => {
            const pnlPos = strategy.unrealizedPnlUsd >= 0

            return (
              <div
                key={strategy.id}
                className='bg-[#102221] border border-[#162030] rounded-xl flex items-center justify-between  overflow-hidden hover:border-[#1e3040] transition-colors p-4'
              >
                {/* Card body */}
                <div className='flex items-center justify-between  py-5  w-full'>
                  {/* ── Left: icon + name + meta ── */}
                  <div className='flex items-center gap-4 min-w-[230px]'>
                    {/* Icon box */}
                    <div className='rounded-lg bg-[#0a1414] p-2 flex justify-center items-center'>
                      <span
                        className='h-[32px] w-[32px] inline-block bg-center bg-cover'
                        style={{
                          backgroundImage: `url("/images/thunder.svg")`
                        }}
                      ></span>
                    </div>
                    <div className='flex flex-col gap-4'>
                      {/* Vault name — split on \n */}
                      <p className='text-[18px] font-[900] leading-[28px] tracking-[-0.45px] text-white  m-0 whitespace-pre-line'>
                        {strategy.name}
                      </p>

                      {/* Last activity */}
                      <div className='flex items-center gap-1 text-[10px] text-[#2e4050] tracking-[0.1em]'>
                        <svg
                          width='11'
                          height='11'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <circle cx='12' cy='12' r='10' />
                          <polyline points='12 6 12 12 16 14' />
                        </svg>
                        <span>LAST ACTIVITY: {strategy.lastActivityLabel}</span>
                      </div>
                    </div>
                    {/* Wallet Snppite */}
                    <div className='flex items-center gap-1.5 text-[#4a6070]'>
                      <div className=' bg-[#0a1414] border border-[#162030] px-2 py-0.5 rounded flex items-center gap-2 '>
                        <span className='text-[10px] text-[#7a9ab0] tracking-wide'>
                          {strategy.walletSnippet}
                        </span>
                        <span
                          className='h-[7px] w-[7px] inline-block bg-center bg-cover'
                          style={{
                            backgroundImage: `url("/images/copy.svg")`
                          }}
                        ></span>
                      </div>
                    </div>
                  </div>

                  {/* ── Middle: stats ── */}
                  <div className='flex items-start gap-10'>
                    {/* Balance */}
                    <div className='flex flex-col gap-0.5'>
                      <span className='text-[9px] text-[#546462] tracking-[0.18em] uppercase font-[900] mb-0.5'>
                        BALANCE
                      </span>
                      <span className='text-[16px] font-[900] text-white tracking-wide'>
                        {fmtSol(strategy.balanceSol)} SOL
                      </span>
                      <span className='text-[11px] text-[#546462] font-[700]'>
                        {fmt(strategy.balanceUsd)}
                      </span>
                    </div>
                    {/* Unrealized PnL */}
                    <div className='flex flex-col gap-0.5'>
                      <span className='text-[9px] text-[#546462] tracking-[0.18em] uppercase font-[900] mb-0.5'>
                        UNREALIZED PNL
                      </span>
                      <span
                        className={`text-[16px] font-[900] tracking-wide ${
                          pnlPos ? 'text-[#00c0a8]' : 'text-[#FA6938]'
                        }`}
                      >
                        {pnlPos ? '+' : ''}
                        {fmt(strategy.unrealizedPnlUsd)}
                      </span>
                      <span
                        className={`text-[11px] font-[700] ${
                          pnlPos ? 'text-[#00c0a8]' : 'text-[#FA6938]'
                        }`}
                      >
                        {pnlPos ? '+' : ''}
                        {strategy.unrealizedPnlPct}% Total
                      </span>
                    </div>
                    {/* Risk rules */}
                    <div className='flex flex-col gap-0.5'>
                      <span className='text-[9px] text-[#546462] tracking-[0.18em] uppercase font-[900] mb-0.5'>
                        RISK RULES
                      </span>
                      <span className='text-[16px] font-[900] text-white tracking-wide'>
                        TP: {strategy.riskRules.tp}%
                      </span>
                      <span className='text-[11px] text-[#546462]  font-[700]'>
                        SL: {strategy.riskRules.sl}%
                      </span>
                    </div>
                  </div>

                  {/* ── Right: action buttons ── */}
                  <div className='flex items-center gap-2'>
                    <button className='border border-[#1f4d47]  rounded-lg px-4 py-[5px]    cursor-pointer hover:bg-[#1f4d47]/10 hover:border-[#1f4d47]/70 transition-colors bg-transparent flex items-center gap-1.5 text-[#009883] text-[10px] font-bold tracking-[0.1em]'>
                      <span
                        className='h-[10px] w-[10px] inline-block bg-center bg-cover'
                        style={{
                          backgroundImage: `url("/images/plus.svg")`
                        }}
                      ></span>
                      <span className='text-[8px] font-[900] tracking-[0.1em] text-[#009883]'>
                        DEPOSIT
                      </span>
                    </button>
                    <button className='border border-[#1f4d47]  rounded-lg px-4 py-[5px]    cursor-pointer hover:bg-[#1f4d47]/10 hover:border-[#1f4d47]/70 transition-colors bg-transparent flex items-center gap-1.5 text-[#009883] text-[10px] font-bold tracking-[0.1em]'>
                      <span
                        className='h-[10px] w-[10px] inline-block bg-center bg-cover'
                        style={{
                          backgroundImage: `url("/images/minus.svg")`
                        }}
                      ></span>
                      <span className='text-[8px] font-[900]tracking-[0.1em] text-[#009883]'>
                        WITHDRAW
                      </span>
                    </button>
                    <button
                      onClick={() => removeStrategy(strategy.id)}
                      className='border bg-pad border-padborder  rounded-lg px-4 py-[5px]  cursor-pointer hover:bg-pad2 hover:border-padborde2 transition-colors flex items-center gap-1.5   tracking-[0.1em]'
                    >
                      <span
                        className='h-[10px] w-[10px] inline-block bg-center bg-cover'
                        style={{
                          backgroundImage: `url("/images/pad.svg")`
                        }}
                      ></span>
                      <span className='text-[8px] font-[900]  tracking-[0.1em] text-[#FA6938]'>
                        STOP COPY
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {/* ── Deploy new vault ── */}
        <button
          onClick={() => setShowModal(true)}
          className='border border-dashed border-[#162030] rounded-xl py-8 flex flex-col items-center gap-2 cursor-pointer hover:border-[#1e3040] transition-colors w-full bg-transparent  mt-5'
        >
          <span
            className='h-[24px] w-[24px] inline-block bg-center bg-cover'
            style={{
              backgroundImage: `url("/images/deploy.svg")`
            }}
          ></span>
          <span className='text-[10px] text-[#46514f] group-hover:text-[#3a4f60] tracking-[0.15em] uppercase transition-colors font-[900]'>
            DEPLOY NEW STRATEGY VAULT
          </span>
        </button>
      </div>

      <div className='flex justify-center items-center gap-3 mt-10'>
        <span
          className='h-[14px] w-[14px] inline-block bg-center bg-cover'
          style={{
            backgroundImage: `url("/images/badgechek.svg")`
          }}
        ></span>

        <p className='text-[#46514f] font-[900] text-[10px] leading-[15px] tracking-[3px] uppercase'>
          All assets remain in your control via Vault PDAs • No counterparty
          risk • Verify on Solscan
        </p>
      </div>
    </div>
  )
}

export default MasterMode
