import React, { useState, useRef, FormEvent } from 'react';
import { joinWaitlist } from '../lib/waitlist';
import { useGsapFadeIn } from '../hooks/useGsapScroll';

const trustCues = [
    'Free early access',
    'Priority onboarding',
    'Exclusive launch offer',
    'No spam, ever',
];

const SubscribeSection: React.FC = () => {
    const [email, setEmail] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const mountedAt = useRef(Date.now());

    const sectionRef = useGsapFadeIn<HTMLDivElement>({ y: 50 });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            setStatus('error');
            setErrorMsg('Please enter your email address.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setStatus('error');
            setErrorMsg('Please enter a valid email.');
            return;
        }

        setStatus('loading');
        const { ok, error } = await joinWaitlist(email, 'cta', {
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
        <section id="subscribe" className="relative py-24 lg:py-32 px-5">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />

            <div ref={sectionRef} className="relative max-w-2xl mx-auto text-center">
                <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
                    Early Access
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4 tracking-tight">
                    Your rewards are already out there.
                    <br />
                    <span className="text-primary italic">{"Let's make sure they come home."}</span>
                </h2>
                <p className="text-text-secondary text-lg mb-10 max-w-lg mx-auto">
                    Velox is launching soon. Join the waitlist today and be among the first
                    to stop leaving money on the table — for good. Early members get priority
                    access, exclusive launch pricing, and a front-row seat to a smarter way
                    to own your rewards.
                </p>

                <div className="rounded-2xl p-8 max-w-md mx-auto bg-surface/60 border border-white/[0.06] backdrop-blur-sm">
                    {status === 'success' ? (
                        <div className="py-4">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#13ec6a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                            <h3 className="text-text-primary font-semibold text-lg mb-2">
                                {"You're in."}
                            </h3>
                            <p className="text-text-secondary text-sm">
                                {"We'll reach out before launch day."}
                            </p>
                            <div className="mt-4 h-0.5 w-16 mx-auto bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                        </div>
                    ) : (
                        <>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Honeypot */}
                                <div aria-hidden="true" className="absolute -left-[9999px] opacity-0 h-0 overflow-hidden pointer-events-none">
                                    <label htmlFor="website-url">Website</label>
                                    <input
                                        id="website-url"
                                        name="website"
                                        type="text"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={honeypot}
                                        onChange={(e) => setHoneypot(e.target.value)}
                                    />
                                </div>

                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        maxLength={254}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (status === 'error') setStatus('idle');
                                        }}
                                        disabled={status === 'loading'}
                                        className={`
                                            w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border text-text-primary
                                            placeholder:text-text-muted text-sm font-medium
                                            outline-none transition-all duration-200
                                            focus:border-primary/40 focus:ring-1 focus:ring-primary/20
                                            disabled:opacity-50
                                            ${status === 'error' ? 'border-red-500/50' : 'border-white/[0.08]'}
                                        `}
                                    />
                                    {status === 'error' && (
                                        <p className="text-xs text-red-400 mt-1.5 text-left">{errorMsg}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="
                                        sheen-button w-full px-6 py-3.5 rounded-xl font-semibold text-sm
                                        bg-primary text-background hover:bg-primary-hover
                                        transition-colors duration-200 cursor-pointer
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                    "
                                >
                                    {status === 'loading' ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="15" />
                                            </svg>
                                            Joining...
                                        </span>
                                    ) : (
                                        'Join the Waitlist'
                                    )}
                                </button>
                            </form>

                            {/* Trust cues */}
                            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-5">
                                {trustCues.map((cue) => (
                                    <span key={cue} className="flex items-center gap-1.5 text-[11px] text-text-muted">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#13ec6a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        {cue}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SubscribeSection;
