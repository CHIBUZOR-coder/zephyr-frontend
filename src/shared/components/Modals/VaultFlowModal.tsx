import { AnimatePresence, motion } from 'framer-motion'

import { useGeneralContext } from '../../../Context/GeneralContext'
import { StepThree } from './Steps/StepThree'
import { StepTwo } from './Steps/StepTwo'
import { StepOne } from './Steps/StepOne'
import { FiX } from 'react-icons/fi'

const stepVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 }
}

const VaultFlowModal = () => {
  const { vaultFlowOpen, closeVaultFlow, vaultStep, setVaultStep } =
    useGeneralContext()

  return (
    <AnimatePresence>
      {vaultFlowOpen && (
        <>
          {/* ================= BACKDROP ================= */}
          <motion.div
            key='backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVaultFlow}
            className='fixed inset-0 bg-black/70 backdrop-blur-sm z-40'
          />

          {/* ================= MODAL WRAPPER ================= */}
          <motion.div
            key='modal-wrapper'
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* ================= INNER MODAL ================= */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className='w-full max-w-[390px] rounded-2xl bg-[#0d1f1f] border border-[#1f3c3c] shadow-2xl overflow-hidden'
              onClick={e => e.stopPropagation()}
            >
              {/* ================= HEADER ================= */}
              <div className='flex items-center justify-between px-6 py-5 border-b border-[#1c3535]'>
                <h2 className='text-white text-lg font-semibold'>
                  {vaultStep === 1 && 'Copy Trading Setup'}
                  {vaultStep === 2 && 'Create Copier Vault'}
                  {vaultStep === 3 && 'Set Up Copy Trading'}
                </h2>

                <button onClick={closeVaultFlow}>
                  <FiX className='text-gray-400' size={18} />
                </button>
              </div>

              {/* ================= PROGRESS BAR ================= */}
              <div className='px-6 pt-4'>
                <div className='flex justify-between text-xs text-gray-400 mb-2'>
                  <span>CONFIG RISK</span>
                  <span>CREATE VAULT</span>
                  <span>DEPOSIT</span>
                  <span>ACTIVE</span>
                </div>

                <div className='h-1 bg-[#1a3333] rounded-full overflow-hidden'>
                  <motion.div
                    animate={{
                      width:
                        vaultStep === 1
                          ? '25%'
                          : vaultStep === 2
                          ? '50%'
                          : '75%'
                    }}
                    transition={{ duration: 0.4 }}
                    className='h-full bg-teal-400'
                  />
                </div>
              </div>

              {/* ================= STEP CONTENT ================= */}
              <div className='p-6 min-h-[400px]'>
                <AnimatePresence mode='wait'>
                  {vaultStep === 1 && (
                    <motion.div
                      key='step1'
                      variants={stepVariants}
                      initial='initial'
                      animate='animate'
                      exit='exit'
                      transition={{ duration: 0.3 }}
                    >
                      <StepOne onNext={() => setVaultStep(2)} />
                    </motion.div>
                  )}

                  {vaultStep === 2 && (
                    <motion.div
                      key='step2'
                      variants={stepVariants}
                      initial='initial'
                      animate='animate'
                      exit='exit'
                      transition={{ duration: 0.3 }}
                    >
                      <StepTwo
                        onBack={() => setVaultStep(1)}
                        onNext={() => setVaultStep(3)}
                      />
                    </motion.div>
                  )}

                  {vaultStep === 3 && (
                    <motion.div
                      key='step3'
                      variants={stepVariants}
                      initial='initial'
                      animate='animate'
                      exit='exit'
                      transition={{ duration: 0.3 }}
                    >
                      <StepThree onBack={() => setVaultStep(2)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default VaultFlowModal
