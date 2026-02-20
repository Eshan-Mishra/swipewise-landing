import React from 'react';
import ScrollReveal from './ScrollReveal';
import { SyncIcon, AiSparkIcon, CreditCardIcon } from './icons';
import illustrationAI from '../assets/illustration-ai-engine.png';

const bullets = [
    { icon: <SyncIcon size={20} />, text: 'Aggregates transactions across every bank' },
    { icon: <AiSparkIcon size={20} />, text: 'Simulates reward accrual in real-time' },
    { icon: <CreditCardIcon size={20} />, text: 'Tells you exactly which card to use' },
];

const InsightSection: React.FC = () => (
    <section id="insight" className="relative py-24 lg:py-32 px-5">
        <div className="section-line max-w-4xl mx-auto mb-24" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div>
                <ScrollReveal direction="left">
                    <p className="text-sapphire-light text-sm font-semibold uppercase tracking-widest mb-4">
                        The Breakthrough
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6 tracking-tight leading-tight">
                        Not a tracker.
                        <br />
                        <span className="text-primary">A Shadow Ledger.</span>
                    </h2>
                    <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                        A private financial intelligence layer sitting above all your banks.
                        Not owned by any issuer. Not biased. Not gamified.
                        Just mathematically correct.
                    </p>
                </ScrollReveal>

                <div className="space-y-4">
                    {bullets.map((b, i) => (
                        <ScrollReveal key={i} direction="left" delay={200 + i * 120}>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-colors duration-200 hover:bg-white/[0.06]">
                                <span className="text-primary flex-shrink-0">{b.icon}</span>
                                <span className="text-text-primary text-sm font-medium">{b.text}</span>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* Illustration */}
            <ScrollReveal direction="right" delay={150}>
                <div className="flex justify-center">
                    <img
                        src={illustrationAI}
                        alt="AI optimization engine connecting credit cards"
                        className="w-full max-w-md rounded-2xl opacity-90"
                        loading="lazy"
                    />
                </div>
            </ScrollReveal>
        </div>
    </section>
);

export default InsightSection;
