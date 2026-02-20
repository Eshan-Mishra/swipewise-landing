import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './components/Hero';
import BentoFeatures from './components/BentoFeatures';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import VeloxPromise from './components/VeloxPromise';
import SubscribeSection from './components/SubscribeSection';
import Footer from './components/Footer';

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
                <Hero />
                <BentoFeatures />
                <FeaturesSection />
                <HowItWorks />
                <VeloxPromise />
                <SubscribeSection />
            </main>

            <Footer />
        </div>
    );
}

export default App;
