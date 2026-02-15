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
            className='fixed inset-0 bg-black/70 backdrop-blur-[2px] z-40'
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* MODAL */}
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center'
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
          >
            <div
              className='
                w-[340px]
                rounded-2xl
                bg-[#22403f]
                border border-[#2a6b63]
                px-4 py-5
              '
              onClick={e => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className='flex items-start justify-between mb-4'>
                <div className='w-full flex flex-col gap-4'>
                  <h3 className='text-[17px] font-[900] text-white'>
                    Connect Wallet
                  </h3>
                  <div>
                    <p className='text-[10px]  font-[700] text-white '>
                      Select Wallet
                    </p>
                    {/* SELECT WALLET DIVIDER */}
                    <div className='relative mb-4 mt-2 w-full'>
                      {/* full line */}
                      <div className='h-px w-full bg-[#303c62]' />

                      {/* active indicator */}
                      <div className='absolute left-0 top-0 h-[2px] w-10 bg-white rounded-full' />
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className='text-[#9fd5cc] hover:text-white transition'
                >
                  ✕
                </button>
              </div>
              {/* SECURITY NOTICE */}
              <p className='mb-4 text-[11px] leading-relaxed text-[#b7e9df] bg-[#03463d]'>
                Choose your preferred wallet to start trading on Solana. Your
                privacy and security are our top priorities.
              </p>
              <div className='mb-4  bg-[#03463d] p-3 '>
                <p className='text-[11px] font-semibold text-[#7fffd4] mb-1'>
                  🔒 Non-Custodial Security
                </p>
                <p className='text-[10px] text-[#b7e9df] leading-relaxed'>
                  Zephyr never has access to your private keys or funds. All
                  transactions are signed by you.
                </p>
              </div>
              {/* WALLET LIST */}
              <div className='flex flex-col gap-2'>
                {wallets.map(wallet => (
                  <button
                    key={wallet.adapter.name}
                    onClick={() => {
                      select(wallet.adapter.name)
                      onClose()
                    }}
                    disabled={wallet.readyState !== 'Installed'}
                    className='
                      flex items-center justify-between
                      rounded-lg
                      px-3 py-2.5
                      bg-[#03463d]
                      hover:bg-[#13443e]
                      transition
                    '
                  >
                    {/* LEFT */}
                    <div className='flex items-center gap-3'>
                      <img
                        src={wallet.adapter.icon}
                        alt={wallet.adapter.name}
                        className='h-5 w-5'
                      />

                      <div className='flex flex-col items-start'>
                        <span className='text-[11px] font-semibold'>
                          {wallet.adapter.name}
                        </span>

                        {wallet.adapter.name === 'Phantom' && (
                          <span className='text-[9px] text-[#00f5c4]'>
                            Recommended
                          </span>
                        )}
                      </div>
                    </div>

                    {/* RIGHT ARROW */}
                    <span className='text-[#6f9f97] text-sm'>→</span>
                  </button>
                ))}
              </div>
              {/* FOOTER */}
              <p className='mt-4 text-center text-[10px] text-[#9fd5cc]'>
                New to Solana?
                <span className='ml-1 text-[#00f5c4] cursor-pointer hover:underline'>
                  Learn how to set up a wallet
                </span>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
