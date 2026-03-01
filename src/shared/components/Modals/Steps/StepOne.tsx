import FooterButtons from "../Components/FooterButtons"
import Input from "../Components/Input"

type StepOneProps = {
  onNext: () => void
}

export const StepOne = ({ onNext }: StepOneProps) => {
  return (
    <>
      <div className='space-y-6 text-gray-300'>
        <div>
          <h3 className='text-white font-medium mb-4'>
            Required Risk Parameters
          </h3>

          <div className='grid grid-cols-2 gap-4'>
            <Input label='Max Vault Drawdown' value='20%' />
            <Input label='Max Trade Size' value='5%' />
            <Input label='Max Entry Slippage' value='0.5%' />
          </div>
        </div>
      </div>

      <FooterButtons onNext={onNext} nextLabel='Create Vault' />
    </>
  )
}
