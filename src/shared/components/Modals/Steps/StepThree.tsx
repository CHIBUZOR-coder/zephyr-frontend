import FooterButtons from "../Components/FooterButtons"
import Input from "../Components/Input"

type StepThreeProps = {
  onBack: () => void
}

export const StepThree = ({ onBack }: StepThreeProps) => {
  return (
    <>
      <div className='space-y-6 text-gray-300'>
        <div className='bg-green-500/10 border border-green-500/20 p-3 rounded-md text-green-400 text-sm'>
          Vault successfully initialized on-chain.
        </div>

        <div>
          <h3 className='text-white font-medium mb-4'>Deposit Funds</h3>

          <div className='grid grid-cols-2 gap-4'>
            <Input label='Asset' value='SOL' />
            <Input label='Network' value='Solana Mainnet' />
          </div>

          <Input label='Amount' value='0.00' />
        </div>

        <div className='bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg text-sm text-yellow-400'>
          You are depositing into a vault you control.
        </div>
      </div>

      <FooterButtons onBack={onBack} nextLabel='Deposit Funds' />
    </>
  )
}
