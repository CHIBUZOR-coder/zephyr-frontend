interface CardProps {
  label: string
  value: string
}

const Card = ({ label, value }: CardProps) => (
  <div className='bg-[#0a1717] border border-[#1c3535] rounded-lg p-4'>
    <p className='text-xs text-gray-400 mb-2'>{label}</p>
    <p className='text-white font-semibold'>{value}</p>
  </div>
)

export default Card
