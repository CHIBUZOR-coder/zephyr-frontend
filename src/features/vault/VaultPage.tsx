// src/features/vault/VaultPage.tsx

/**
 * Vault Page - Main vault creation page
 * Day 11, Milestone 2
 */

import Layout from '../../shared/Layout/Layout'
import RequireWallet from '../../shared/components/RequireWallet'
import CreateVaultForm from './components/CreateVaultForm'

export default function VaultPage () {
  return (
    <Layout>
      <RequireWallet>
        <div className='min-h-screen bg-slate-950 p-6'>
          <div className='max-w-3xl mx-auto py-8'>
            {/* Breadcrumb */}
            <div className='mb-6'>
              <a
                href='/dashboard'
                className='text-sm text-slate-400 hover:text-white transition-colors'
              >
                ← Back to Dashboard
              </a>
            </div>

            {/* Main Form */}
            <CreateVaultForm />
          </div>
        </div>
      </RequireWallet>
    </Layout>
  )
}
