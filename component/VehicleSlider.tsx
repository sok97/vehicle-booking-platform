import Image from 'next/image'
import { motion } from 'motion/react'
import { Star, ChevronRight } from 'lucide-react'

const vehicles = [
  { id: 1, name: 'Premium Sedan', category: 'Luxury', price: 45, rating: 4.9, img: '/car.png', tags: ['Auto', 'Leather'] },
  { id: 2, name: 'Sport Rider', category: 'Bike', price: 25, rating: 4.8, img: '/bike.png', tags: ['Fast', '600cc'] },
  { id: 3, name: 'Family SUV', category: 'Comfort', price: 35, rating: 4.7, img: '/car.png', tags: ['7 Seats', 'Safe'] },
]

const VehicleSlider = () => {
  return (
    <section className='py-32 bg-white'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16'>
          <div className='max-w-xl'>
            <motion.span 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              className='text-blue-600 font-bold uppercase tracking-[0.2em] text-xs'
            >
              Our Selection
            </motion.span>
            <h2 className='text-4xl md:text-5xl font-black text-gray-900 mt-4 leading-tight'>
              Choose the <span className='text-blue-600'>Perfect Ride</span> for Your Journey
            </h2>
          </div>
          <button className='group flex items-center gap-2 text-gray-900 font-bold hover:text-blue-600 transition-colors'>
            View Full Fleet <ChevronRight className='group-hover:translate-x-1 transition-transform' size={20} />
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {vehicles.map((v) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className='group bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500'
            >
              <div className='flex justify-between items-start mb-8'>
                <span className='px-4 py-1.5 bg-white rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 border border-gray-100 shadow-sm'>
                  {v.category}
                </span>
                <div className='flex items-center gap-1.5 text-gray-900 font-bold text-sm'>
                  <Star size={14} className='fill-yellow-400 text-yellow-400' /> {v.rating}
                </div>
              </div>

              <div className='relative h-48 mb-8'>
                <Image src={v.img} alt={v.name} fill className='object-contain group-hover:scale-110 transition-transform duration-700' />
              </div>

              <div className='space-y-6'>
                <div>
                  <h3 className='text-2xl font-black text-gray-900'>{v.name}</h3>
                  <div className='flex gap-2 mt-2'>
                    {v.tags.map(tag => <span key={tag} className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>{tag}</span>)}
                  </div>
                </div>

                <div className='flex items-center justify-between pt-6 border-t border-gray-100'>
                  <div>
                    <span className='text-2xl font-black text-gray-900'>${v.price}</span>
                    <span className='text-gray-400 font-bold text-sm ml-1'>/day</span>
                  </div>
                  <button className='p-4 bg-gray-900 text-white rounded-2xl hover:bg-blue-600 active:scale-90 transition-all shadow-lg'>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VehicleSlider