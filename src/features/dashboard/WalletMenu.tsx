import { motion, AnimatePresence } from 'framer-motion'
import { useWallet } from '@solana/wallet-adapter-react'
import { useAuthStore } from '../auth/auth.store'

type Props = {
  open: boolean
  onClose: () => void
}

export const WalletMenu = ({ open, onClose }: Props) => {
  const { disconnect } = useWallet()
const { logout } = useAuthStore()
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <div className='fixed inset-0 z-40' onClick={onClose} />

          {/* MENU */}
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className='absolute right-0 mt-2 z-50 w-[180px] rounded-xl border border-[#23483B] bg-[#0b1513] shadow-xl'
          >
            {/* DISCONNECT */}
            <button
              className='w-full flex items-center gap-2 px-4 py-3 text-xs text-red-400 hover:bg-red-500/10'
              onClick={async () => {
                await disconnect()
                onClose()
                logout() // Clear auth state on disconnect
              }}
            >
              <div className='h-[40px] w-[40px] flex justify-center items-center bg-[#102221] border rounded-2xl border-[#23483B]'>
                <span
                  style={{
                    backgroundImage: `url("/images/disconnected.svg")`
                  }}
                  className='bg-center bg-cover h-[20px] w-[20px]'
                ></span>
              </div>

              <span className='text-[14px] font-[700] text-white'>
                Disconnect
              </span>
            </button>
            <div className='h-px bg-[#23483B]' />
            {/* PROFILE */}
            <button
              className='w-full flex items-center gap-2 px-4 py-3 text-xs text-[#9fd5cc] hover:bg-[#122523]'
              onClick={onClose}
            >
              <div className='h-[40px] w-[40px] flex justify-center items-center bg-[#102221] border rounded-2xl border-[#23483B]'>
                <span
                  style={{
                    backgroundImage: `url("/images/profile.svg")`
                  }}
                  className='bg-center bg-cover h-[20px] w-[20px]'
                ></span>
              </div>
              <span className='text-[14px] font-[700] text-white'>Profile</span>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
