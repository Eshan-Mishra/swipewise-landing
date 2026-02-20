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

                {/* Bento Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[260px] md:auto-rows-[280px]">
                    {cards.map((card) => (
                        <div
                            key={card.title}
                            className={`
                group relative overflow-hidden rounded-2xl
                bg-surface/60 border border-white/[0.06]
                backdrop-blur-sm
                transition-all duration-300
                hover:border-primary/20 hover:bg-surface/80
                cursor-pointer
                ${card.span}
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
                            <div className="relative z-10 h-full flex flex-col justify-end p-6">
                                <div className="bg-gradient-to-t from-background/90 via-background/60 to-transparent absolute inset-0 rounded-2xl" />
                                <div className="relative">
                                    <h3 className="text-xl font-bold text-text-primary mb-2">{card.title}</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed max-w-xs">{card.body}</p>
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
