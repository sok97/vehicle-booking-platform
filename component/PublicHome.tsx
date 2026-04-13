"use client"
import HeroSection from './HeroSection'
import { useState } from 'react'
import VehicleSlider from './VehicleSlider'
import AuthModal from './AuthModal'
import Footer from './Footer'

const PublicHome = () => {
    const [authOpen, setAuthOpen] = useState(false)
    return (
        <div>
            <HeroSection />
            <VehicleSlider />
            <AuthModal open={authOpen} onClose ={()=>setAuthOpen(false)} />
            <Footer />
        </div>
    )
}

export default PublicHome