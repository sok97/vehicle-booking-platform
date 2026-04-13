import React from 'react'


const HeroSection = () => {
  return (
    <div className='relative min-h-screen w-full overflow-hidden'>
       <div className='absolute inset-0 bg-cover bg-center 'style={{backgroundImage:"url('/heroImage.jpg')"}}></div>
       <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10'></div>
       <div></div>
       </div>
  )
}
export default HeroSection