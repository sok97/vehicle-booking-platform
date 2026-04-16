import React from 'react'

;
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ArrowRight, Phone, Lock, User, ShieldCheck } from 'lucide-react';
import Image from 'next/image';




interface AuthModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
}

type AuthView = 'login' | 'signup' | 'otp';

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [view, setView] = useState<AuthView>('login');
  const [phone, setPhone] = useState('');

  const renderContent = () => {
    switch (view) {
      case 'login':
        return (
          <motion.div key='login' initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className='text-3xl font-black text-gray-900 tracking-tight'>Welcome Back</h2>
            <p className='text-gray-400 font-bold text-xs uppercase tracking-widest mt-2 mb-8'>Sign in to SwiftRide</p>
            
            <div className='space-y-4'>
              <div className='relative group'>
                <Phone className='absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors' size={18} />
                <input type='tel' placeholder='Phone Number' className='w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500/20 transition-all text-gray-900 font-medium' />
              </div>
              <div className='relative group'>
                <Lock className='absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors' size={18} />
                <input type='password' placeholder='Password' className='w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500/20 transition-all text-gray-900 font-medium' />
              </div>
            </div>

            <button className='w-full mt-8 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:bg-blue-700 transition-all active:scale-95'>Sign In</button>
            
            <p className='text-center mt-8 text-sm font-bold text-gray-400 uppercase tracking-widest'>
              New to SwiftRide? <button onClick={() => setView('signup')} className='text-blue-600 hover:underline'>Create Account</button>
            </p>
          </motion.div>
        );
      case 'signup':
        return (
          <motion.div key='signup' initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className='text-3xl font-black text-gray-900 tracking-tight'>Join SwiftRide</h2>
            <p className='text-gray-400 font-bold text-xs uppercase tracking-widest mt-2 mb-8'>Start your journey today</p>
            
            <div className='space-y-4'>
              <div className='relative group'>
                <User className='absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors' size={18} />
                <input type='text' placeholder='Full Name' className='w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500/20 transition-all text-gray-900 font-medium' />
              </div>
              <div className='relative group'>
                <Phone className='absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors' size={18} />
                <input type='tel' placeholder='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} className='w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-2 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500/20 transition-all text-gray-900 font-medium' />
              </div>
            </div>

            <button onClick={() => setView('otp')} className='w-full mt-8 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2'>
              Send OTP <ArrowRight size={18} />
            </button>
            
            <p className='text-center mt-8 text-sm font-bold text-gray-400 uppercase tracking-widest'>
              Have an account? <button onClick={() => setView('login')} className='text-blue-600 hover:underline'>Login</button>
            </p>
          </motion.div>
        );
      case 'otp':
        return (
          <motion.div key='otp' initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className='w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100'>
              <ShieldCheck className='text-blue-600' size={32} />
            </div>
            <h2 className='text-3xl font-black text-gray-900 tracking-tight'>Verify OTP</h2>
            <p className='text-gray-400 font-medium mt-2 mb-8'>Enter the 4-digit code sent to <span className='text-gray-900 font-bold'>+91 {phone || 'XXXXX XXXXX'}</span></p>
            
            <div className='flex justify-between gap-4 mb-8'>
              {[1, 2, 3, 4].map(idx => (
                <input key={idx} type='text' maxLength={1} className='w-14 h-16 text-center text-2xl font-black bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white transition-all focus:outline-none' />
              ))}
            </div>

            <button className='w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:bg-blue-700 transition-all active:scale-95'>Verify & Continue</button>
            
            <div className='text-center mt-8 space-y-2'>
              <p className='text-sm font-bold text-gray-400 uppercase tracking-widest'>Didn't receive code?</p>
              <button className='text-blue-600 font-black hover:underline uppercase tracking-widest text-xs'>Resend OTP</button>
            </div>
          </motion.div>
        );
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[100] p-4'
          onClick={() => onClose(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className='relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden'
          >
            <div className='p-8 sm:p-12'>
              <button onClick={() => onClose(false)} className='absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-all'><X size={20} /></button>
              <AnimatePresence mode='wait'>
                {renderContent()}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AuthModal