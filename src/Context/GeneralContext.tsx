/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Trader } from '../features/dashboard/dashboardComponents/sidenavPages/Leaderboard/leaderboar.types'


/* ------------------------------------------------ */
/* TYPES */
/* ------------------------------------------------ */

type VaultStep = 1 | 2 | 3 | 4

type GeneralContextType = {
  walletModal: boolean
  setWalletModal: (val: boolean) => void

  // Vault Flow Modal
  vaultFlowOpen: boolean
  vaultStep: VaultStep
  openVaultFlow: (step?: VaultStep, trader?: Trader) => void
  closeVaultFlow: () => void
  setVaultStep: (step: VaultStep) => void

  // 🔥 Selected Trader
  selectedTrader: Trader | null
  setSelectedTrader: (trader: Trader | null) => void
}

/* ------------------------------------------------ */
/* CONTEXT */
/* ------------------------------------------------ */

const GeneralContext = createContext<GeneralContextType | undefined>(undefined)

/* ------------------------------------------------ */
/* PROVIDER */
/* ------------------------------------------------ */

export const GeneralProvider = ({ children }: { children: ReactNode }) => {
  const [walletModal, setWalletModal] = useState(false)

  // 🔥 Vault Flow State
  const [vaultFlowOpen, setVaultFlowOpen] = useState(false)
  const [vaultStep, setVaultStep] = useState<VaultStep>(1)

  /* Open modal and optionally jump to a step */
  const openVaultFlow = (step: VaultStep = 1, trader: Trader | null = null) => {
    setVaultStep(step)
    setSelectedTrader(trader)
    setVaultFlowOpen(true)
  }

  /* Close and reset step */
  const closeVaultFlow = () => {
    setVaultFlowOpen(false)
    setVaultStep(1)
  }
  const [selectedTrader, setSelectedTrader] = useState<Trader | null>(null)

  return (
    <GeneralContext.Provider
      value={{
        walletModal,
        setWalletModal,
        vaultFlowOpen,
        vaultStep,
        openVaultFlow,
        closeVaultFlow,
        setVaultStep,
        selectedTrader,
        setSelectedTrader
      }}
    >
      {children}
    </GeneralContext.Provider>
  )
}

/* ------------------------------------------------ */
/* HOOK */
/* ------------------------------------------------ */

export const useGeneralContext = () => {
  const context = useContext(GeneralContext)

  if (context === undefined) {
    throw new Error('useGeneralContext must be used within GeneralProvider')
  }

  return context
}
