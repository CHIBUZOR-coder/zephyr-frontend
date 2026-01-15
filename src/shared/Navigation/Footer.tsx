// src/components/Footer.tsx

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='px-6 py-8 bg-slate-950 border-t border-slate-900 text-slate-500 text-sm'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
        <div className='flex flex-col items-center md:items-start gap-2'>
          <span className='font-semibold text-slate-300 uppercase tracking-widest text-xs'>
            Zephyr / Stratos
          </span>
          <p>© {currentYear} All rights reserved.</p>
        </div>

        <div className='flex gap-6'>
          <a href='#' className='hover:text-slate-300 transition-colors'>
            Documentation
          </a>
          <a href='#' className='hover:text-slate-300 transition-colors'>
            Terms
          </a>
          <a href='#' className='hover:text-slate-300 transition-colors'>
            Twitter
          </a>
        </div>

        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse' />
          <span className='text-xs uppercase font-mono tracking-tighter text-emerald-500'>
            Solana Mainnet: Stable
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
