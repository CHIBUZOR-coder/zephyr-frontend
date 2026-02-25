import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RiskRules {
  tp: number;
  sl: number;
}

interface Strategy {
  id: string;
  name: string;       // use "\n" to split into two lines e.g. "ALPHASEEKER\nCOPY VAULT"
  walletSnippet: string;
  balanceSol: number;
  balanceUsd: number;
  unrealizedPnlUsd: number;
  unrealizedPnlPct: number;
  riskRules: RiskRules;
  lastActivityLabel: string; // e.g. "14M AGO"
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const INITIAL_STRATEGIES: Strategy[] = [
  {
    id: "1",
    name: "ALPHASEEKER\nCOPY VAULT",
    walletSnippet: "7Mp...3q2",
    balanceSol: 14.2,
    balanceUsd: 2023.5,
    unrealizedPnlUsd: 142,
    unrealizedPnlPct: 7.2,
    riskRules: { tp: 20, sl: 5 },
    lastActivityLabel: "14M AGO",
  },
  {
    id: "2",
    name: "SOLWHALE\nAGGRESSIVE VAULT",
    walletSnippet: "9u1...k2b",
    balanceSol: 42,
    balanceUsd: 5985,
    unrealizedPnlUsd: -12.5,
    unrealizedPnlPct: -0.2,
    riskRules: { tp: 15, sl: 3 },
    lastActivityLabel: "2D AGO",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const fmtSol = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ─── Add Strategy Modal ───────────────────────────────────────────────────────

interface AddModalProps {
  onClose: () => void;
  onAdd: (s: Strategy) => void;
}

function AddStrategyModal({ onClose, onAdd }: AddModalProps) {
  const [form, setForm] = useState({
    name: "",
    walletSnippet: "",
    balanceSol: "",
    balanceUsd: "",
    unrealizedPnlUsd: "",
    unrealizedPnlPct: "",
    tp: "",
    sl: "",
    lastActivityLabel: "JUST NOW",
  });

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const s: Strategy = {
      id: Date.now().toString(),
      name: form.name || "NEW VAULT",
      walletSnippet: form.walletSnippet || "xxx...xxx",
      balanceSol: parseFloat(form.balanceSol) || 0,
      balanceUsd: parseFloat(form.balanceUsd) || 0,
      unrealizedPnlUsd: parseFloat(form.unrealizedPnlUsd) || 0,
      unrealizedPnlPct: parseFloat(form.unrealizedPnlPct) || 0,
      riskRules: { tp: parseFloat(form.tp) || 0, sl: parseFloat(form.sl) || 0 },
      lastActivityLabel: form.lastActivityLabel || "JUST NOW",
    };
    onAdd(s);
    onClose();
  };

  const fields = [
    { label: "Vault Name", key: "name", placeholder: "e.g. MOONSEEKER VAULT" },
    { label: "Wallet Snippet", key: "walletSnippet", placeholder: "e.g. 4Xb...9qR" },
    { label: "Balance (SOL)", key: "balanceSol", placeholder: "e.g. 25.50" },
    { label: "Balance (USD)", key: "balanceUsd", placeholder: "e.g. 3620.00" },
    { label: "Unrealized PnL (USD)", key: "unrealizedPnlUsd", placeholder: "e.g. -45.00" },
    { label: "Unrealized PnL (%)", key: "unrealizedPnlPct", placeholder: "e.g. -1.2" },
    { label: "Take-Profit (%)", key: "tp", placeholder: "e.g. 20" },
    { label: "Stop-Loss (%)", key: "sl", placeholder: "e.g. 5" },
    { label: "Last Activity", key: "lastActivityLabel", placeholder: "e.g. 3H AGO" },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#0e1821] border border-[#1e2d3d] rounded-2xl p-8 w-[560px] max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-7">
          <span className="text-[13px] font-extrabold tracking-[0.15em] text-white">
            DEPLOY NEW STRATEGY VAULT
          </span>
          <button
            onClick={onClose}
            className="text-[#4a5a6a] hover:text-white transition-colors bg-transparent border-none text-xl leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-5 gap-y-5 mb-7">
            {fields.map(({ label, key, placeholder }) => (
              <label key={key} className="flex flex-col gap-2">
                <span className="text-[10px] text-[#4a5a6a] tracking-[0.15em] uppercase font-bold">
                  {label}
                </span>
                <input
                  className="bg-[#080f16] border border-[#1a2a3a] rounded-lg text-[#c8d8e8] font-mono text-xs px-3 py-2.5 outline-none focus:border-[#00ffa3]/60 transition-colors placeholder:text-[#2a3a4a]"
                  value={(form as Record<string, string>)[key]}
                  onChange={set(key)}
                  placeholder={placeholder}
                />
              </label>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="border border-[#1e2d3d] text-[#6b7a8d] rounded-lg px-6 py-2.5 text-[11px] font-bold tracking-[0.12em] cursor-pointer hover:border-[#2e3d4d] hover:text-[#9aabbc] transition-colors bg-transparent font-mono"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="bg-[#00ffa3] text-[#050e15] rounded-lg px-6 py-2.5 text-[11px] font-extrabold tracking-[0.12em] cursor-pointer hover:bg-[#00e692] transition-colors font-mono"
            >
              DEPLOY VAULT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [strategies, setStrategies] = useState<Strategy[]>(INITIAL_STRATEGIES);
  const [activeTab, setActiveTab] = useState<"vaults" | "activity">("vaults");
  const [showModal, setShowModal] = useState(false);

  const totalBalance = strategies.reduce((s, v) => s + v.balanceUsd, 0);
  const total24hChange = strategies.reduce((s, v) => s + v.unrealizedPnlUsd, 0);
  const changePositive = total24hChange >= 0;

  const addStrategy = (s: Strategy) => setStrategies((prev) => [...prev, s]);
  const removeStrategy = (id: string) =>
    setStrategies((prev) => prev.filter((s) => s.id !== id));

  return (
    <div className="min-h-screen  text-[#c8d8e8] ">

      {/* ── Header ── */}
      <header className="flex justify-between items-center px-10 py-7 border-b border-[#111d27]">
        {/* Left: title */}
        <div>
          <p className="text-[32px] font-[900]  text-white  m-0">
            PORTFOLIO
          </p>
          <p className="text-[13px] font-[500] text-[#B0E4DD] tracking-wide mt-1 m-0">
            Financial control center for non-custodial assets.
          </p>
        </div>

        {/* Right: stats */}
        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-[#3d5060] tracking-[0.18em] uppercase flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              TOTAL BALANCE
            </span>
            <span className="text-[22px] font-bold text-white tracking-tight">
              {fmt(totalBalance)}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-[#3d5060] tracking-[0.18em] uppercase flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              24H CHANGE
            </span>
            <span className={`text-[22px] font-bold tracking-tight ${changePositive ? "text-[#00ffa3]" : "text-[#ff4d6d]"}`}>
              {changePositive ? "+" : ""}{fmt(total24hChange)}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-[#3d5060] tracking-[0.18em] uppercase flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              TOTAL VAULTS
            </span>
            <span className="text-[22px] font-bold text-white tracking-tight">
              {strategies.length}
            </span>
          </div>
        </div>
      </header>

      {/* ── Tab bar ── */}
      <div className="flex justify-between items-center px-10 border-b border-[#111d27]">
        <div className="flex">
          {(["vaults", "activity"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 pt-4 pb-3 text-[11px] font-bold tracking-[0.14em] border-b-2 transition-all cursor-pointer bg-transparent font-mono ${
                activeTab === tab
                  ? "text-white border-[#00ffa3]"
                  : "text-[#3d5060] border-transparent hover:text-[#7a9ab0]"
              }`}
            >
              {tab === "vaults" ? "MY STRATEGY VAULTS" : "VAULT ACTIVITY"}
            </button>
          ))}
        </div>
        <span className="text-[10px] text-[#3d5060] tracking-[0.15em] uppercase">
          SYNC STATUS:{" "}
          <span className="text-[#00ffa3] font-bold">LIVE INDEXER</span>
        </span>
      </div>

      {/* ── Content ── */}
      <main className="px-10 py-5 flex flex-col gap-3">
        {activeTab === "vaults" ? (
          <>
            {/*
              ── Each strategy object is mapped directly to card JSX here ──
              No child component — the full card UI lives inline in this map.
              To add a strategy: fill in the modal → onAdd appends to the array.
              To remove one: "STOP COPY" calls removeStrategy which filters it out.
            */}
            {strategies.map((strategy) => {
              const pnlPos = strategy.unrealizedPnlUsd >= 0;

              return (
                <div
                  key={strategy.id}
                  className="bg-[#0b1520] border border-[#162030] rounded-xl flex items-center justify-between gap-6 overflow-hidden hover:border-[#1e3040] transition-colors"
                >
                  {/* Green accent bar on left edge */}
                  <div className="w-[3px] self-stretch bg-[#00ffa3]/20 shrink-0" />

                  {/* Card body */}
                  <div className="flex items-center justify-between gap-6 flex-1 pr-6 py-5">

                    {/* ── Left: icon + name + meta ── */}
                    <div className="flex items-center gap-4 min-w-[230px]">
                      {/* Icon box */}
                      <div className="w-[46px] h-[46px] rounded-xl bg-[#080f16] border border-[#162030] flex items-center justify-center shrink-0">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill="#00ffa3" />
                        </svg>
                      </div>

                      <div className="flex flex-col gap-1">
                        {/* Vault name — split on \n */}
                        <p className="text-[13px] font-extrabold tracking-[0.07em] text-white leading-snug m-0 whitespace-pre-line">
                          {strategy.name}
                        </p>

                        {/* Wallet badge */}
                        <div className="flex items-center gap-1.5 text-[#4a6070]">
                          <span className="text-[10px] bg-[#0e1c28] border border-[#162030] px-2 py-0.5 rounded text-[#7a9ab0] tracking-wide">
                            {strategy.walletSnippet}
                          </span>
                          {/* Copy icon */}
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        </div>

                        {/* Last activity */}
                        <div className="flex items-center gap-1 text-[10px] text-[#2e4050] tracking-[0.1em]">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>LAST ACTIVITY: {strategy.lastActivityLabel}</span>
                        </div>
                      </div>
                    </div>

                    {/* ── Middle: stats ── */}
                    <div className="flex items-start gap-10 flex-1">
                      {/* Balance */}
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] text-[#2e4050] tracking-[0.18em] uppercase font-bold mb-0.5">
                          BALANCE
                        </span>
                        <span className="text-[14px] font-bold text-[#c8d8e8] tracking-wide">
                          {fmtSol(strategy.balanceSol)} SOL
                        </span>
                        <span className="text-[11px] text-[#4a6070]">
                          {fmt(strategy.balanceUsd)}
                        </span>
                      </div>

                      {/* Unrealized PnL */}
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] text-[#2e4050] tracking-[0.18em] uppercase font-bold mb-0.5">
                          UNREALIZED PNL
                        </span>
                        <span className={`text-[14px] font-bold tracking-wide ${pnlPos ? "text-[#00ffa3]" : "text-[#ff4d6d]"}`}>
                          {pnlPos ? "+" : ""}{fmt(strategy.unrealizedPnlUsd)}
                        </span>
                        <span className={`text-[11px] ${pnlPos ? "text-[#00ffa3]" : "text-[#ff4d6d]"}`}>
                          {pnlPos ? "+" : ""}{strategy.unrealizedPnlPct}% Total
                        </span>
                      </div>

                      {/* Risk rules */}
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] text-[#2e4050] tracking-[0.18em] uppercase font-bold mb-0.5">
                          RISK RULES
                        </span>
                        <span className="text-[14px] font-bold text-[#c8d8e8] tracking-wide">
                          TP: {strategy.riskRules.tp}%
                        </span>
                        <span className="text-[11px] text-[#4a6070]">
                          SL: {strategy.riskRules.sl}%
                        </span>
                      </div>
                    </div>

                    {/* ── Right: action buttons ── */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button className="border border-[#00ffa3]/40 text-[#00ffa3] rounded-lg px-4 py-2 text-[10px] font-bold tracking-[0.1em] cursor-pointer hover:bg-[#00ffa3]/10 hover:border-[#00ffa3]/70 transition-colors bg-transparent font-mono">
                        + DEPOSIT
                      </button>
                      <button
                        onClick={() => console.log("Withdraw", strategy.id)}
                        className="border border-[#1e2d3d] text-[#7a9ab0] rounded-lg px-4 py-2 text-[10px] font-bold tracking-[0.1em] cursor-pointer hover:border-[#2e4050] hover:text-[#9ab0c4] transition-colors bg-transparent font-mono"
                      >
                        − WITHDRAW
                      </button>
                      <button
                        onClick={() => removeStrategy(strategy.id)}
                        className="bg-[#1a0810] border border-[#ff4d6d]/25 text-[#ff4d6d] rounded-lg px-4 py-2 text-[10px] font-bold tracking-[0.1em] cursor-pointer hover:border-[#ff4d6d]/50 hover:bg-[#200a12] transition-colors font-mono"
                      >
                        🔒 STOP COPY
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ── Deploy new vault ── */}
            <button
              onClick={() => setShowModal(true)}
              className="border border-dashed border-[#162030] rounded-xl py-8 flex flex-col items-center gap-2 cursor-pointer hover:border-[#1e3040] transition-colors w-full bg-transparent font-mono group mt-1"
            >
              <span className="text-xl text-[#2a3a4a] group-hover:text-[#3a4f60] transition-colors leading-none select-none">
                +
              </span>
              <span className="text-[11px] text-[#2a3a4a] group-hover:text-[#3a4f60] tracking-[0.15em] uppercase transition-colors">
                DEPLOY NEW STRATEGY VAULT
              </span>
            </button>
          </>
        ) : (
          <div className="text-center text-[#2a3a4a] text-[12px] py-20 tracking-[0.15em] uppercase">
            No recent vault activity to display.
          </div>
        )}
      </main>

      {/* ── Add Strategy Modal ── */}
      {showModal && (
        <AddStrategyModal onClose={() => setShowModal(false)} onAdd={addStrategy} />
      )}
    </div>
  );
}
