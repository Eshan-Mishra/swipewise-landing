import React from 'react';
import { useGsapStagger, useGsapFadeIn } from '../hooks/useGsapScroll';
import {
    AnalyticsIcon,
    AiSparkIcon,
    AlertIcon,
    CreditCardIcon,
    ShieldIcon,
    LockIcon,
} from './icons';

const features = [
    {
        icon: <AnalyticsIcon size={24} className="text-primary" />,
        tag: 'Shadow Ledger',
        title: 'One Dashboard. Every Card.',
        body: "See all your reward points, cashback balances, and expiry dates from every bank in one place. No more app-hopping. No more surprises. Just complete, real-time clarity on what you've earned across all your cards.",
    },
    {
        icon: <AiSparkIcon size={24} className="text-primary" />,
        tag: 'AI Co-Pilot',
        title: 'Which Card. Right Now.',
        body: 'About to pay at a restaurant? Booking a flight? Buying on Amazon? Velox tells you exactly which card to swipe for maximum rewards — before you pay. Ask in plain language, get a clear answer instantly.',
    },
    {
        icon: <AlertIcon size={24} className="text-primary" />,
        tag: 'Smart Alerts',
        title: 'Never Miss a Milestone Again.',
        body: "Every card has hidden milestones that unlock bonus rewards or waive annual fees. Velox tracks them all and alerts you when you're close. \"Spend \u20B93,000 more on this card this month to unlock your annual bonus.\"",
    },
    {
        icon: <CreditCardIcon size={24} className="text-primary" />,
        tag: 'Goal Engine',
        title: 'Set a Goal. Take the Fastest Path.',
        body: 'Want a free flight to Goa? A new gadget? Tell Velox your goal and it maps the fastest route — factoring in transfer partners, indirect value, and the best redemption windows. Your points become a plan, not a mystery.',
    },
    {
        icon: <ShieldIcon size={24} className="text-primary" />,
        tag: 'Conflict-Free Advice',
        title: 'No Hidden Agenda. Ever.',
        body: "Velox doesn't push cards that earn us a commission. It tells you which card truly wins for your lifestyle. And if a different card would genuinely serve you better, we say so — with honest pros and cons.",
    },
    {
        icon: <LockIcon size={24} className="text-primary" />,
        tag: 'Privacy First',
        title: 'Secure by Design.',
        body: "Read-only access. Bank-grade encryption. Built on India's RBI-regulated Account Aggregator framework — the same infrastructure used by the country's top financial institutions. Your data is yours. Always.",
    },
];

const FeaturesSection: React.FC = () => {
    const headingRef = useGsapFadeIn<HTMLDivElement>({ y: 40 });
    const gridRef = useGsapStagger<HTMLDivElement>({ stagger: 0.1, y: 50 });

    return (
        <section id="features" className="relative py-24 lg:py-32 px-5">
            <div className="max-w-6xl mx-auto">
                <div ref={headingRef}>
                    <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 text-center">
                        Why Velox?
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-text-primary mb-4 tracking-tight">
                        Your money. Working harder.
                        <br />
                        <span className="text-text-secondary">Without changing how you spend.</span>
                    </h2>
                    <p className="text-text-secondary text-center max-w-xl mx-auto text-lg mb-16">
                        Velox sits between you and your banks — always watching, always optimizing, always on your side.
                    </p>
                </div>

                <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="group relative rounded-[2px] p-8 h-full flex flex-col
                                bg-surface/40 border border-white/[0.15]
                                backdrop-blur-md cursor-pointer
                                transition-all duration-500 ease-out transform
                                hover:bg-surface/60 hover:border-primary/40
                                hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),0_0_20px_-5px_rgba(19,236,106,0.15)]"
                        >
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-12 h-12 rounded-[2px] bg-white/[0.04] border border-white/[0.15] flex items-center justify-center transition-all duration-500 group-hover:border-primary/40 group-hover:scale-110">
                                    {f.icon}
                                </div>
                                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
                                    {f.tag}
                                </span>
                            </div>
                            <h3 className="text-text-primary font-bold text-lg mb-3">{f.title}</h3>
                            <p className="text-text-secondary text-sm leading-relaxed flex-1">{f.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
