interface InputProps {
  label: string
  value: string
}

const Input = ({ label, value }: InputProps) => (
  <div>
    <p className='text-xs text-gray-400 mb-2'>{label}</p>
    <div className='bg-[#0a1717] border border-[#1c3535] rounded-md px-3 py-2 text-white'>
      {value}
    </div>
  </div>
)

export default Input
