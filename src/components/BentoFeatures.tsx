import React from 'react';
import { useGsapStagger } from '../hooks/useGsapScroll';

import heroCards from '../assets/hero-3d-cards.png';
import aiBrain from '../assets/bento-ai-brain.png';
import rewards from '../assets/bento-rewards.png';
import shield from '../assets/bento-shield.png';

const cards = [
    {
        title: 'Shadow Ledger',
        body: 'Every card. Every reward. One unified dashboard that tracks what banks hide in the fine print.',
        image: heroCards,
        span: 'row-span-2', // tall left card
    },
    {
        title: 'AI Co-Pilot',
        body: 'Real-time recommendations on which card to use, when, and why — powered by machine learning.',
        image: aiBrain,
        span: '',
    },
    {
        title: 'Smart Alerts',
        body: 'Know the moment a reward expires, a milestone unlocks, or a better deal is waiting.',
        image: rewards,
        span: '',
    },
    {
        title: 'Privacy First',
        body: 'Bank-grade encryption. Read-only access. We never see your credentials — by design.',
        image: shield,
        span: '',
    },
];

const BentoFeatures: React.FC = () => {
    const gridRef = useGsapStagger<HTMLDivElement>({ stagger: 0.15, y: 50 });

    return (
        <section className="relative py-20 lg:py-28 px-5">
            <div className="max-w-6xl mx-auto">
                <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3 text-center">
                    Core Features
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-14 tracking-tight text-center">
                    {"What Velox Does"}
                </h2>

                {/* Asymmetric Fragmented Layout */}
                <div ref={gridRef} className="flex flex-col md:flex-row flex-wrap gap-8 justify-center">
                    {cards.map((card, index) => (
                        <div
                            key={card.title}
                            className={`
                group relative overflow-hidden rounded-[2px]
                bg-surface/40 border border-white/[0.15]
                backdrop-blur-md
                transition-all duration-500
                hover:border-primary/40 hover:bg-surface/80
                cursor-pointer
                h-[300px] w-full 
                ${index === 0 ? 'md:w-[55%]' : index === 1 ? 'md:w-[40%]' : index === 2 ? 'md:w-[35%]' : 'md:w-[60%]'}
              `}
                        >
                            {/* 3D image */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content overlay */}
                            <div className="relative z-10 h-full flex flex-col justify-end p-8">
                                <div className="bg-gradient-to-t from-background/95 via-background/70 to-transparent absolute inset-0 rounded-[2px]" />
                                <div className="relative transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                    <h3 className="text-2xl font-bold text-text-primary mb-3 tracking-tight">{card.title}</h3>
                                    <p className="text-base text-text-secondary leading-relaxed max-w-sm opacity-80 group-hover:opacity-100 transition-opacity duration-500">{card.body}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BentoFeatures;
