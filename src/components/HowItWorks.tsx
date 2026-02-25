import React from 'react';
import { useGsapStagger, useGsapFadeIn } from '../hooks/useGsapScroll';

const steps = [
    {
        num: '01',
        title: 'Add Your Cards',
        body: 'Select the credit cards you own from our database of 50+ Indian bank cards. Velox loads all the reward rules — rates, categories, caps, milestones — automatically. No manual entry. No guesswork.',
    },
    {
        num: '02',
        title: 'Connect Your Transactions',
        body: "Sync your spending securely via India's Account Aggregator network or through email and SMS parsing. Velox sees what you spend, where, and on which card — and builds your reward profile in real time.",
    },
    {
        num: '03',
        title: 'Let the Co-Pilot Work',
        body: "From here, Velox runs in the background. Before any big purchase, ask which card to use. Set a redemption goal. Watch the alerts come in. Everything you've been leaving on the table starts coming back.",
    },
    {
        num: '04',
        title: "Redeem What's Actually Yours",
        body: "When it's time to use your points, Velox shows you what they're genuinely worth — not what the bank claims. Transfer to airline miles. Redeem at partner merchants. Get real value, not discounted gift cards.",
    },
];

const HowItWorks: React.FC = () => {
    const headingRef = useGsapFadeIn<HTMLDivElement>({ y: 40 });
    const gridRef = useGsapStagger<HTMLDivElement>({ stagger: 0.15, y: 60 });

    return (
        <section id="how-it-works" className="relative py-24 lg:py-32 px-5">
            <div className="max-w-5xl mx-auto">
                <div ref={headingRef}>
                    <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4 text-center">
                        How It Works
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-text-primary mb-4 tracking-tight">
                        Set up in minutes.
                        <br />
                        <span className="text-primary">Save thousands over time.</span>
                    </h2>
                    <p className="text-text-secondary text-center max-w-xl mx-auto text-lg mb-16">
                        {"Getting started takes less time than reading the fine print on your card's reward brochure."}
                    </p>
                </div>

                <div ref={gridRef} className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {steps.map((step) => (
                        <div
                            key={step.num}
                            className="group relative rounded-[2px] p-6 sm:p-10 h-full flex flex-col
                                bg-surface/40 border border-white/[0.15]
                                backdrop-blur-md cursor-pointer
                                transition-all duration-500 ease-out transform
                                hover:bg-surface/60 hover:border-primary/40
                                hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),0_0_20px_-5px_rgba(19,236,106,0.15)]"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-4xl font-bold text-primary/40 font-display transition-colors duration-500 group-hover:text-primary">{step.num}</span>
                                <div className="h-px flex-1 bg-white/[0.15] transition-colors duration-500 group-hover:bg-primary/40" />
                            </div>
                            <h3 className="text-xl text-text-primary font-bold mb-4 tracking-tight">{step.title}</h3>
                            <p className="text-base text-text-secondary leading-relaxed flex-1 opacity-80 group-hover:opacity-100 transition-opacity duration-500">{step.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
