import Layout from '../../shared/Layout/Layout'

const HomePage = () => {
  return (
    <Layout>
      <div className='min-h-screen py-6'>
        {/****HERO SECTION*****/}
        <div className='Hero bg-gradient-to-tr from-black to-herolight py-5 w-full flex flex-col lg:flex-row justify-center items-center px-3 md:px-[120px] gap-10 md:gap-[100px] lg:gap-[60px] '>
          {/* child1 */}
          <div className='herochild flex flex-col gap-5'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse' />
              <span className='text-xs uppercase font-mono tracking-tighter text-emerald-500'>
                LIVE ON SOLANA MAINNET
              </span>
            </div>
            <p className='font-[900] text-[30px] md:text-[60px]  text-white  text-start leading-[0.5] '>
              On-chain social
            </p>
            <div>
              <p
                className='font-[900] text-[30px] md:text-[60px]
 text-start text-transparent bg-gradient-to-tr from-textshade to-textshade2 bg-clip-text'
              >
                copy trading
              </p>
            </div>
            <p className='text-[18px] text-[#577884] font-[400]'>
              Experience the future of DeFi with secure, transparent, and
              non-custodial copy trading. Professional risk controls enforced by
              smart contracts.
            </p>
            <div className='flex justify-between gap-4 mt-4 w-full flex-col md:flex-row'>
              <button className='bg-btnprimary text-btnsecondary px-6 py-3 rounded-lg  font-[600] hover:scale-105 transition-transform duration-200 w-full md:w-[40%]'>
                Lunch App
              </button>
              <button className='bg-btnprimary text-btnsecondary px-6 py-3 rounded-lg  font-[600] hover:scale-105 transition-transform duration-200 w-full md:w-[60%]'>
                View Top Traders
              </button>
            </div>
            <div className='flex items-center  justify-start w-[80%] md:w-[60%] gap-0 md:gap-4'>
              <div className='flex w-[30%] relative fan min-h-10   justify-center items-center'>
                <div className='smallcircl bg-circle1 left-0'>TV</div>
                <div className='smallcircl bg-circle2 left-7'>JD</div>
                <div className='smallcircl bg-circle3 left-14'>AS</div>
              </div>

              <div className='w-[70%] min-h-10 flex flex-col justify-center items-center '>
                <p className='text-[#577884] text-[13.125px] font-[500]'>
                  Join 2,400+ active traders
                </p>
              </div>
            </div>
          </div>
          {/* child2 */}
          <div className='herochild h-[386px] '>
            <div className='rounded-md overflow-hidden p-4 h-full w-full border-[1px] border-textshade'>
              <div className="rounded-md img bg-[url('/images/dash.png')] h-full w-full bg-cover bg-center overflow-hidden "></div>
            </div>
          </div>
        </div>
        {/* ******* */}
        {/****STATS SECTION*****/}
        <div className='stats  grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 items-center text-white px-3 md:px-[120px] mt-24 py-4'>
          <div className='num'>
            <p>
              $142M <span>+</span>
            </p>
            <p className='label'>Trading Volume</p>
          </div>

          <div className='num'>
            <p>
              45k <span>+</span>
            </p>
            <p className='label'>Total Trades</p>
          </div>
          <div className='num'>
            <p>
              12<span>s</span>
            </p>
            <p className='label'>Avg Execution</p>
          </div>
          <div className='num'>
            <p>
              0%<span>s</span>
            </p>
            <p className='label'>Custody Risk</p>
          </div>
        </div>
        {/* ******* */}
        {/****CONTAINER1*****/}
        <div className='container1 flex flex-col justify-center items-center px-3 md:px-[120px] mt-24  '>
          <p className='text-center font-jebrains tracking-[1.169px] font-jetbrains uppercase text-[#00A991]'>
            The ZEPHYR Process
          </p>

          <p className='font-[900] text-[38px] lg:text-[45px] text-white text-center md:text-start'>
            Start mirroring in 3 steps
          </p>
        </div>
        {/* ******* */}
        {/****CONTAINER2*****/}
        <div className='container2 grid grid-cols-1  lg:grid-cols-3 gap-5 px-3 md:px-[120px] mt-24 justify-center items-center justify-items-center'>
          <div className='box '>
            <div className='boximgcon'>
              <p className="boximg bg-[url('/images/icon.svg')] "></p>
            </div>
            <div className='boxtextcon '>
              <p className='numero'>1</p>
              <p className='boxtext'>Connect</p>
            </div>

            <p className='boxinfo'>
              Securely link your Phantom or Solflare wallet. You maintain 100%
              control over your private keys at all times.
            </p>
          </div>
          <div className='box '>
            <div className='boximgcon'>
              <p className="boximg bg-[url('/images/person.svg')] "></p>
            </div>
            <div className='boxtextcon '>
              <p className='numero'>2</p>
              <p className='boxtext'>Choose</p>
            </div>

            <p className='boxinfo'>
              Securely link your Phantom or Solflare wallet. You maintain 100%
              control over your private keys at all times.
            </p>
          </div>
          <div className='box '>
            <div className='boximgcon'>
              <p className="boximg bg-[url('/images/sheild.svg')] "></p>
            </div>
            <div className='boxtextcon '>
              <p className='numero'>3</p>
              <p className='boxtext'>Set Risk</p>
            </div>

            <p className='boxinfo'>
              Securely link your Phantom or Solflare wallet. You maintain 100%
              control over your private keys at all times.
            </p>
          </div>
        </div>
        {/****CONTAINER2 DONE*****/}
      </div>
    </Layout>
  )
}

export default HomePage
