// src/features/dashboard/dashboardComponents/sidenavPages/DashboardView.tsx

import { Navigation, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import 'swiper/css'
import 'swiper/css/navigation'

const leaders = [
  {
    name: 'AlphaSeeker',
    imag: '/images/img2.png',
    rio: 112.4,
    follows: 840,
    sol: '2,810'
  },
  {
    name: 'Degenerate',
    imag: '/images/img3.png',
    rio: 89.2,
    follows: 3.1,
    sol: '3,010'
  },
  {
    name: 'SolWhale',
    imag: '/images/img1.png',
    rio: 245.8,
    follows: 1.2,
    sol: '1,120'
  },
  {
    name: 'AlphaSeeker',
    imag: '/images/img2.png',
    rio: 112.4,
    follows: 840,
    sol: '1,750'
  },
  {
    name: 'Degenerate',
    imag: '/images/img3.png',
    rio: 89.2,
    follows: 3.1,
    sol: '2,450'
  }
]

const DashboardView = () => {
  return (
    <div className='w-full '>
      {/* Market overview */}
      <section className='w-full'>
        <div className='flex justify-between items-center'>
          <p className='font-[700] text-white'>Market overview</p>
          <p className='text-white text-[10.5px]'>View All Markets</p>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4'>
          {['SOL/USD', 'Network Volume', 'Trending Token'].map((title, i) => (
            <div
              key={i}
              className='bg-[#0f1a18] border-[1px] border-[#23483B] rounded-md p-4 flex flex-col gap-2'
            >
              <span className='text-xs text-gray-400'>{title}</span>
              <span className='text-xl font-semibold'>
                {i === 0 && '$142.50'}
                {i === 1 && '$4.21B'}
                {i === 2 && '$BONK'}
              </span>
              <span className='text-xs text-green-400'>+12.4% 24h</span>
            </div>
          ))}
        </div>
      </section>

      {/* Content grid */}
      <section className='w-full mt-10'>
        <div className='w-full'>
          <h3 className='font-semibold'>Top Traders Leaderboard</h3>
          <div className='flex flex-col gap-8 mt-4'>
            <Swiper
              modules={[Navigation, Autoplay]}
              loop
              speed={1400}
              navigation={{ prevEl: '.swiper-prev', nextEl: '.swiper-next' }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              className='w-full relative px-3'
            >
              <button className='flex justify-center items-center swiper-prev bg-swipnav border-[1.5px] border-[#23483B] z-30 rounded-full absolute top-1/2 left-5'>
                <MdKeyboardArrowLeft className='h-6 w-6' />
              </button>
              <button className='flex justify-center items-center swiper-next bg-swipnav border-[1.5px] border-[#23483B] z-30 rounded-full absolute top-1/2 right-5'>
                <MdKeyboardArrowRight className='h-6 w-6' />
              </button>

              {leaders.map((item, i) => (
                <SwiperSlide
                  key={i}
                  className='rounded-xl flex flex-col items-center gap-3 overflow-hidden border-[#23483B] border-[1px] w-[100%]'
                >
                  <div
                    className='h-80 lg:h-44 w-full flex flex-col justify-end p-4 bg-center bg-cover relative'
                    style={{ backgroundImage: `url(${item.imag})` }}
                  >
                    <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-lead to-transparent'></div>
                    <div className='relative z-10'>
                      <span className='text-sm font-medium text-[12px]'>
                        @{item.name}
                      </span>
                      <p className='text-[10px] font-[900] text-[#22C55E]'>
                        ROI: {item.rio}%
                      </p>
                    </div>
                  </div>
                  <div className='bg-[#0f1a18] w-full p-4'>
                    <div className='flex gap-6 lg:gap-2'>
                      <div className='flex flex-col gap-3 w-[50%]'>
                        <p className='text-[#B0E4DD] text-[9px] font-[400]'>
                          Win Rate: 78%
                        </p>
                        <button className='bg-teal-500 px-3 py-2 rounded text-xs text-white border border-transparent hover:border-teal-500 hover:text-teal-500 hover:bg-transparent transition ease-in-out duration-500 cursor-pointer'>
                          Copy
                        </button>
                      </div>
                      <div className='flex flex-col gap-3 w-[50%]'>
                        <p className='text-[#B0E4DD] text-[9px] font-[400] text-end'>
                          Followers: {item.follows}
                          {item.follows < 500 ? 'K' : ''}
                        </p>
                        <button className='border border-teal-500 text-teal-400 px-3 py-2 rounded text-xs hover:bg-teal-500 transition ease-in-out duration-500 cursor-pointer hover:text-white'>
                          Follow
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Hot Performers */}
            <div className='bg-[#0f1a18] rounded-xl w-full py-4 mt-6 md:mt-auto'>
              <h4 className='text-[15px] font-[700] px-4'>Hot Performers</h4>
              <div className='mt-4 h-[295px] overflow-y-auto scrollbar-hide'>
                {leaders.map((item, i) => (
                  <div
                    key={i}
                    className='flex justify-between text-sm border-[#23483B] border-t-[1px] p-4'
                  >
                    <div className='flex justify-between gap-4'>
                      <div
                        className='bg-center bg-cover h-10 w-10 rounded-md'
                        style={{ backgroundImage: `url(${item.imag})` }}
                      ></div>
                      <div>
                        <span className='text-[10.5px] font-[700]'>
                          @{item.name}
                        </span>
                        <p className='text-[#B0E4DD] text-[9px] font-[400]'>
                          7d ROI: +{item.rio}%
                        </p>
                      </div>
                    </div>
                    <div className='flex justify-between gap-3 items-center'>
                      <div>
                        <p className='text-[9px] text-[#B0E4DD] font-[400]'>
                          AUM
                        </p>
                        <p className='text-[10.5px] text-white font-[700]'>
                          {item.sol} SOL
                        </p>
                      </div>
                      <button className='border border-[#0098834D] text-teal-400 px-3 py-2 rounded text-xs hover:bg-teal-500 transition ease-in-out duration-500 cursor-pointer hover:text-white'>
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardView
