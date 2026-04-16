"use client"
import HeroSection from './HeroSection'
import { useState } from 'react'
import VehicleSlider from './VehicleSlider'
import AuthModal from './AuthModal'
import Footer from './Footer'
import Navbar from './Nav'

const PublicHome = () => {
    const [authOpen, setAuthOpen] = useState(true)
    return (
        <div>
            <Navbar />
            <HeroSection />
            <VehicleSlider />
            <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
            <Footer />
        </div>
    )
}

export default PublicHome