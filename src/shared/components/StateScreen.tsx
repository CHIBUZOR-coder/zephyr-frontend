type StateScreenProps = {
  title: string
  description?: string
  tone?: 'info' | 'error' | 'warning'
  action?: React.ReactNode // ✅ ADD THIS
}

export default function StateScreen ({
  title,
  description,
  tone = 'info',
  action
}: StateScreenProps) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-950'>
      <div className='text-center space-y-4 max-w-md'>
        <h1
          className={`text-2xl font-semibold ${
            tone === 'error' ? 'text-red-400' : 'text-slate-200'
          }`}
        >
          {title}
        </h1>

        {description && <p className='text-slate-400'>{description}</p>}

        {action && <div className='pt-4 flex justify-center'>{action}</div>}
      </div>
    </div>
  )
}
