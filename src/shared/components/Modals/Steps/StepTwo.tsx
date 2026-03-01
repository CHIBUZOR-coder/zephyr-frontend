import Card from "../Components/Card"
import FooterButtons from "../Components/FooterButtons"

type StepTwoProps = {
  onBack: () => void
  onNext: () => void
}

export const StepTwo = ({ onBack, onNext }: StepTwoProps) => {
  return (
    <>
      <div className='space-y-6 text-gray-300'>
        <div className='grid grid-cols-2 gap-4'>
          <Card label='Allocation Limit' value='25.00 SOL' />
          <Card label='Max Drawdown Stop' value='-15%' />
          <Card label='Profit Take' value='+50%' />
          <Card label='Slippage Tolerance' value='0.5%' />
        </div>

        <div className='bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg text-sm text-yellow-400'>
          Non-Custodial Initialization. You remain the sole owner of funds.
        </div>
      </div>

      <FooterButtons
        onBack={onBack}
        onNext={onNext}
        nextLabel='Confirm & Create Vault'
      />
    </>
  )
}
