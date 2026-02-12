// src/features/vault/components/CreateVaultForm.tsx

/**
 * Create Vault Form Component
 * Day 11, Milestone 2
 */

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useVaultInitialize } from '../useVaultAPI'

export default function CreateVaultForm () {
  const { publicKey } = useWallet()
  const initializeMutation = useVaultInitialize()

  // Form state
  const [masterAddress, setMasterAddress] = useState('')
  const [maxLossPct, setMaxLossPct] = useState(20)
  const [maxTradeSizePct, setMaxTradeSizePct] = useState(10)
  const [maxDrawdownPct, setMaxDrawdownPct] = useState(15)
  const [errors, setErrors] = useState<string[]>([])

  // Basic validation
  const validateForm = (): boolean => {
    const newErrors: string[] = []

    // Validate Solana address (basic check)
    if (
      !masterAddress ||
      masterAddress.length < 32 ||
      masterAddress.length > 44
    ) {
      newErrors.push(
        'Please enter a valid Solana wallet address (32-44 characters)'
      )
    }

    // Validate risk parameters
    if (maxLossPct < 5 || maxLossPct > 50) {
      newErrors.push('Max Loss must be between 5-50%')
    }

    if (maxTradeSizePct < 1 || maxTradeSizePct > 25) {
      newErrors.push('Max Trade Size must be between 1-25%')
    }

    if (maxDrawdownPct < 10 || maxDrawdownPct > 50) {
      newErrors.push('Max Drawdown must be between 10-50%')
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])

    if (!publicKey) {
      setErrors(['Please connect your wallet first'])
      return
    }

    if (!validateForm()) return

    try {
      const result = await initializeMutation.mutateAsync({
        masterAddress,
        maxLossPct,
        maxTradeSizePct,
        maxDrawdownPct
      })

      console.log('✅ Vault prepared:', result.data)

      // For Day 11, we just show the success message
      // Days 12-13 will add transaction signing
      alert(
        `Success! Vault PDA: ${result.data.vaultAddress}\n\nNext: Sign transaction with wallet (Day 13)`
      )
    } catch (error) {
      console.error('❌ Failed to initialize vault:', error)
      setErrors([
        error instanceof Error ? error.message : 'Failed to initialize vault'
      ])
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6 max-w-lg'>
      {/* Header */}
      <div>
        <h2 className='text-2xl font-bold text-white mb-2'>
          Create Copy Trading Vault
        </h2>
        <p className='text-slate-400 text-sm'>
          Automatically copy any Solana trader's strategy
        </p>
      </div>

      {/* Master Address Input */}
      <div>
        <label className='block text-sm font-medium text-slate-300 mb-2'>
          Master Trader Wallet Address
        </label>
        <input
          type='text'
          value={masterAddress}
          onChange={e => setMasterAddress(e.target.value)}
          placeholder='e.g., F8aH4qnZtG3zEj1E1k16Bax48a9GT4t3p3cXs2a1Z2rZ'
          className='w-full px-4 py-3 bg-slate-900 border border-slate-700 
                     rounded-lg text-white placeholder-slate-500
                     focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                     transition-colors'
          required
        />
        <p className='text-xs text-slate-500 mt-2'>
          💡 <strong>Tip:</strong> They don't need to be registered on Zephyr!
          You can copy any public Solana wallet.
        </p>
      </div>

      {/* Risk Parameters Section */}
      <div className='bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6'>
        <div>
          <h3 className='font-semibold text-white text-lg mb-1'>
            Risk Parameters
          </h3>
          <p className='text-xs text-slate-400'>
            Set limits to protect your capital
          </p>
        </div>

        {/* Max Loss Per Trade */}
        <div>
          <div className='flex justify-between items-center mb-3'>
            <label className='text-sm text-slate-300 font-medium'>
              Max Loss Per Trade
            </label>
            <span className='text-lg font-bold text-blue-400'>
              {maxLossPct}%
            </span>
          </div>
          <input
            type='range'
            min='5'
            max='50'
            step='1'
            value={maxLossPct}
            onChange={e => setMaxLossPct(Number(e.target.value))}
            className='w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer 
                       accent-blue-500'
          />
          <div className='flex justify-between text-xs text-slate-500 mt-2'>
            <span>5% (Conservative)</span>
            <span>50% (Aggressive)</span>
          </div>
        </div>

        {/* Max Trade Size */}
        <div>
          <div className='flex justify-between items-center mb-3'>
            <label className='text-sm text-slate-300 font-medium'>
              Max Trade Size
            </label>
            <span className='text-lg font-bold text-blue-400'>
              {maxTradeSizePct}%
            </span>
          </div>
          <input
            type='range'
            min='1'
            max='25'
            step='1'
            value={maxTradeSizePct}
            onChange={e => setMaxTradeSizePct(Number(e.target.value))}
            className='w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer 
                       accent-blue-500'
          />
          <div className='flex justify-between text-xs text-slate-500 mt-2'>
            <span>1%</span>
            <span>25%</span>
          </div>
        </div>

        {/* Max Drawdown */}
        <div>
          <div className='flex justify-between items-center mb-3'>
            <label className='text-sm text-slate-300 font-medium'>
              Max Drawdown
            </label>
            <span className='text-lg font-bold text-blue-400'>
              {maxDrawdownPct}%
            </span>
          </div>
          <input
            type='range'
            min='10'
            max='50'
            step='1'
            value={maxDrawdownPct}
            onChange={e => setMaxDrawdownPct(Number(e.target.value))}
            className='w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer 
                       accent-blue-500'
          />
          <div className='flex justify-between text-xs text-slate-500 mt-2'>
            <span>10%</span>
            <span>50%</span>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {errors.length > 0 && (
        <div className='bg-red-900/20 border border-red-500 rounded-lg p-4'>
          <div className='flex items-start gap-3'>
            <span className='text-red-400 text-xl'>⚠️</span>
            <div className='flex-1'>
              <p className='font-semibold text-red-400 mb-2'>
                Please fix the following errors:
              </p>
              <ul className='list-disc list-inside space-y-1'>
                {errors.map((error, i) => (
                  <li key={i} className='text-sm text-red-300'>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type='submit'
        disabled={initializeMutation.isPending}
        className='w-full bg-blue-500 hover:bg-blue-600 text-white 
                   py-4 rounded-lg font-semibold text-lg transition-all
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:shadow-lg hover:shadow-blue-500/50'
      >
        {initializeMutation.isPending ? (
          <span className='flex items-center justify-center gap-3'>
            <div
              className='w-5 h-5 border-2 border-white border-t-transparent 
                            rounded-full animate-spin'
            />
            Preparing Vault...
          </span>
        ) : (
          'Create Vault'
        )}
      </button>

      {/* Success Message (Day 11 placeholder) */}
      {initializeMutation.isSuccess && (
        <div className='bg-green-900/20 border border-green-500 rounded-lg p-4'>
          <div className='flex items-start gap-3'>
            <span className='text-green-400 text-2xl'>✅</span>
            <div>
              <p className='font-semibold text-green-400 mb-1'>
                Vault Prepared Successfully!
              </p>
              <p className='text-sm text-green-300 break-all'>
                Vault PDA:{' '}
                <code className='font-mono text-xs'>
                  {initializeMutation.data.data.vaultAddress}
                </code>
              </p>
              <p className='text-xs text-slate-400 mt-2'>
                🚀 Days 12-13: You'll sign a transaction to create this vault
                on-chain
              </p>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}
