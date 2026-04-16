import React from 'react'
import HeroSection from './HeroSection'
import {motion} from 'motion/react'
import Footer from './Footer'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className='fixed top-6 left-0 right-0 z-50 flex justify-center px-4'>
      <motion.nav 
        initial={{ y: -20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className='flex items-center gap-8 bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)]'
      >
        {/* Logo/Brand */}
        <div className='flex items-center gap-3 pr-4 border-r border-white/10'>
          <div className='relative w-8 h-8 rounded-full overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center p-1.5'>
            <Image src='/logo.png' alt='logo' width={24} height={24} priority className='brightness-0 invert' />
          </div>
          <span className='hidden sm:block text-white font-black tracking-tighter text-lg uppercase italic'>Swift<span className='text-blue-500'>Ride</span></span>
        </div>

        {/* Links */}
        <div className='hidden md:flex items-center gap-6'>
          {['Home', 'Vehicles', 'Services'].map((item) => (
            <button key={item} className='relative group'>
              <span className='text-gray-400 text-sm font-semibold hover:text-white transition-colors duration-300'>{item}</span>
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300'></span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className='flex items-center gap-4 pl-4 border-l border-white/10'>
          <button className='text-gray-400 text-sm font-bold hover:text-white transition-colors'>Sign In</button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all'
          >
            Go
          </motion.button>
        </div>
      </motion.nav>
    </div>
  )
}

export default Navbar