import React, { useState, useRef, FormEvent } from 'react';
import AnimatedCounter from './AnimatedCounter';
import heroCards from '../assets/hero-3d-cards.png';
import { joinWaitlist } from '../lib/waitlist';
import { useGsapFadeIn } from '../hooks/useGsapScroll';

const Hero: React.FC = () => {
    const [email, setEmail] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const mountedAt = useRef(Date.now());

    const leftRef = useGsapFadeIn<HTMLDivElement>({ y: 30, duration: 0.8 });
    const rightRef = useGsapFadeIn<HTMLDivElement>({ y: 30, duration: 0.8, delay: 0.2 });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            setStatus('error');
            setErrorMsg('Please enter your email address.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setStatus('error');
            setErrorMsg('Please enter a valid email address.');
            return;
        }
        setStatus('loading');
        const { ok, error } = await joinWaitlist(email, 'hero', {
            honeypot,
            mountedAt: mountedAt.current,
        });
        if (ok) {
            setStatus('success');
        } else {
            setStatus('error');
            setErrorMsg(error || 'Something went wrong. Please try again.');
        }
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden px-5 py-24 lg:py-0"
        >
            {/* Background glows */}
            <div className="absolute inset-0 hero-glow pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.06] blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left: Copy */}
                <div ref={leftRef} className="order-2 lg:order-1 text-center lg:text-left">
                    {/* Logo */}
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-8">
                        <img src="/logo.svg" alt="Velox Logo" className="w-8 h-8" />
                        <span className="text-primary font-bold text-2xl tracking-tight uppercase">Velox</span>
                    </div>

                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs text-text-secondary font-medium tracking-wide uppercase">
                            Launching Soon in India
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                        <span className="text-text-primary">Every Swipe</span>
                        <br />
                        <span className="text-text-primary">Has a Score.</span>
                        <br />
                        <span className="text-primary">Most People</span>
                        <br />
                        <span className="text-primary">Never See It.</span>
                    </h1>

                    <p className="text-text-secondary text-lg sm:text-xl max-w-lg mx-auto lg:mx-0 mb-6">
                        {"India's AI-powered credit card rewards co-pilot — built to make every rupee you spend work harder than you ever expected."}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-8">
                        <div className="text-center lg:text-left">
                            <div className="text-2xl sm:text-3xl font-bold text-primary">
                                <AnimatedCounter end={113} start={100} duration={1200} />M+
                            </div>
                            <div className="text-[10px] sm:text-xs text-text-muted uppercase tracking-wider mt-1">
                                Active Credit Cards
                            </div>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-center lg:text-left">
                            <div className="text-2xl sm:text-3xl font-bold text-text-primary">
                                {"₹"}<AnimatedCounter end={8000} start={7900} duration={1500} /> Cr
                            </div>
                            <div className="text-[10px] sm:text-xs text-text-muted uppercase tracking-wider mt-1">
                                Rewards Unredeemed/yr
                            </div>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-center lg:text-left">
                            <div className="text-2xl sm:text-3xl font-bold text-primary">
                                <AnimatedCounter end={30} start={0} duration={1000} />%+
                            </div>
                            <div className="text-[10px] sm:text-xs text-text-muted uppercase tracking-wider mt-1">
                                More Value Recovered
                            </div>
                        </div>
                    </div>

                    {/* Subscribe form */}
                    <div>
                        {status === 'success' ? (
                            <div className="flex items-center gap-3 px-5 py-4 rounded-xl border border-primary/20 bg-primary/[0.06]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#13ec6a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                <span className="text-primary font-medium">{"You're in. We'll reach out before launch day."}</span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                                {/* Honeypot */}
                                <div aria-hidden="true" className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden pointer-events-none">
                                    <label htmlFor="hero-url">URL</label>
                                    <input id="hero-url" name="url" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                                </div>

                                <div className="flex-1 relative">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        maxLength={254}
                                        onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                                        disabled={status === 'loading'}
                                        className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border text-text-primary placeholder:text-text-muted text-sm font-medium outline-none transition-all duration-200 focus:border-primary/40 focus:ring-1 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed ${status === 'error' ? 'border-red-500/50' : 'border-white/[0.08]'}`}
                                    />
                                    {status === 'error' && (
                                        <p className="absolute -bottom-5 left-1 text-xs text-red-400">{errorMsg}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="sheen-button px-6 py-3.5 rounded-xl font-semibold text-sm bg-primary text-background hover:bg-primary-hover transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                >
                                    {status === 'loading' ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="15" />
                                            </svg>
                                            Joining...
                                        </span>
                                    ) : (
                                        'Claim My Spot'
                                    )}
                                </button>
                            </form>
                        )}
                        {status !== 'success' && (
                            <p className="text-[11px] text-text-muted mt-3 text-center lg:text-left">
                                Free to join. No credit card required. Be first when we launch.
                            </p>
                        )}
                    </div>
                </div>

                {/* Right: 3D Cards */}
                <div 
                    ref={rightRef} 
                    className="order-1 lg:order-2 flex justify-center perspective-[1000px]"
                    onMouseMove={(e) => {
                        const bounds = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - bounds.left;
                        const y = e.clientY - bounds.top;
                        
                        const centerX = bounds.width / 2;
                        const centerY = bounds.height / 2;
                        
                        // Calculate rotation based on cursor position (max 15 degrees)
                        const rotateX = ((y - centerY) / centerY) * -15;
                        const rotateY = ((x - centerX) / centerX) * 15;
                        
                        gsap.to(e.currentTarget.querySelector('.tilt-target'), {
                            rotateX: rotateX,
                            rotateY: rotateY,
                            duration: 0.5,
                            ease: 'power2.out',
                        });
                    }}
                    onMouseLeave={(e) => {
                        gsap.to(e.currentTarget.querySelector('.tilt-target'), {
                            rotateX: 0,
                            rotateY: 0,
                            duration: 0.7,
                            ease: 'elastic.out(1, 0.3)',
                        });
                    }}
                >
                    <div className="relative tilt-target transition-transform" style={{ transformStyle: 'preserve-3d' }}>
                        <div className="absolute inset-0 bg-primary/[0.08] rounded-full blur-[100px] scale-110 -translate-z-[50px]" />
                        <img
                            src={heroCards}
                            alt="3D glass credit cards stacked in Velox green"
                            className="relative w-72 sm:w-80 lg:w-[420px] drop-shadow-2xl translate-z-[50px]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
