import { motion, AnimatePresence } from 'framer-motion'
import { useWallet } from '@solana/wallet-adapter-react'

type Props = {
  open: boolean
  onClose: () => void
}

export const CustomWalletModal = ({ open, onClose }: Props) => {
  const { wallets, select } = useWallet()

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className='fixed inset-0 bg-black/60 z-40'
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* MODAL */}
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center'
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div
              className='w-[360px] rounded-xl bg-[#0b1513] border border-[#23483B] p-4'
              onClick={e => e.stopPropagation()}
            >
              <h3 className='text-sm font-bold mb-3'>Connect Wallet</h3>

              <div className='flex flex-col gap-2'>
                {wallets.map(wallet => (
                  <button
                    key={wallet.adapter.name}
                    onClick={() => {
                      select(wallet.adapter.name)
                      onClose()
                    }}
                    disabled={wallet.readyState !== 'Installed'}
                    className='flex items-center justify-between p-3 rounded-lg bg-[#0f1f1c] hover:bg-[#122523] transition'
                  >
                    <div className='flex items-center gap-3'>
                      <img
                        src={wallet.adapter.icon}
                        alt={wallet.adapter.name}
                        className='h-6 w-6'
                      />
                      <span className='text-xs font-semibold'>
                        {wallet.adapter.name}
                      </span>
                    </div>

                    <span className='text-[10px] text-[#6f9f97]'>
                      {wallet.readyState === 'Installed'
                        ? 'Available'
                        : 'Not Installed'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
