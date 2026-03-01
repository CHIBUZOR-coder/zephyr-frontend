interface FooterButtonsProps {
  onBack?: () => void
  onNext?: () => void
  nextLabel: string
}

const FooterButtons = ({ onBack, onNext, nextLabel }: FooterButtonsProps) => (
  <div className='flex justify-between mt-8'>
    {onBack ? (
      <button
        onClick={onBack}
        className='px-5 py-2 rounded-lg border border-[#1c3535] text-gray-400'
      >
        Back
      </button>
    ) : (
      <div />
    )}

    <button
      onClick={onNext}
      className='px-6 py-2 rounded-lg bg-teal-400 text-black font-medium'
    >
      {nextLabel}
    </button>
  </div>
)

export default FooterButtons
