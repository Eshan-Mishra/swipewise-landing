import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './components/Hero';
import BentoFeatures from './components/BentoFeatures';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import SwipeWisePromise from './components/VeloxPromise';
import SubscribeSection from './components/SubscribeSection';
import StickyWaitlistCounter from './components/StickyWaitlistCounter';
import Footer from './components/Footer';
import { Analytics } from "@vercel/analytics/react"

gsap.registerPlugin(ScrollTrigger);

function App() {
    useEffect(() => {
        // Refresh ScrollTrigger positions after all images load
        const handleLoad = () => ScrollTrigger.refresh();
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }, []);

    return (
        <div className="min-h-screen bg-background text-text-primary font-display">
            <main>
                <Analytics />
                <Hero />
                <BentoFeatures />
                <FeaturesSection />
                <HowItWorks />
                <SwipeWisePromise />
                <SubscribeSection />
            </main>

            <Footer />
            <StickyWaitlistCounter />
        </div>
    );
}

export default App;
