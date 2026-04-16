"use client"
import React from 'react'
import { motion } from 'motion/react'
import { Bike, Car, Bus } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className='relative min-h-screen w-full flex items-center justify-center overflow-hidden'>
      {/* Background with overlay */}
      <div
        className='absolute inset-0 bg-cover bg-center transition-transform duration-1000'
        style={{ backgroundImage: "url('/heroImage.jpg')" }}
      >
        <div className='absolute inset-0 bg-black/40 backdrop-brightness-75'></div>
      </div>

      {/* Main Content */}
      <div className='relative z-20 w-full max-w-6xl px-6 pt-20 text-center text-white'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className='space-y-6'
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='inline-block px-4 py-1.5 mb-2 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm'
          >
            <span className='text-blue-200 text-sm font-semibold tracking-wider uppercase'>Premier Rental Service</span>
          </motion.div>

          <h1 className='text-5xl md:text-8xl font-black tracking-tight leading-tight'>
            Ride in <span className='text-blue-500'>Comfort</span>,<br />
            Move with Speed
          </h1>

          <p className='text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto font-light'>
            Experience premium vehicle booking with zero hassle. Whether it's a cross-city trip or a weekend getaway, we've got you covered.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-12'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='group relative px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-xl transition-all flex items-center gap-2 overflow-hidden'
            >
              <span>Book Your Ride</span>
              <Bike size={20} className='group-hover:translate-x-1 transition-transform' />
            </motion.button>

            <button className='px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm'>
              Browse Fleet
            </button>
          </div>
        </motion.div>


      </div>
    </div>
  )
}
export default HeroSection