import React from 'react';

const keywords = [
    'Unified Dashboard',
    'Real-Time Card Recommendations',
    'Expiry Alerts',
    'Milestone Optimizer',
    'AI Financial Co-Pilot',
    'Goal-Driven Tracking',
    'Reward Marketplace',
    'Bank-Grade Security',
    'Conflict-Free Advice',
    'Privacy First',
];

const ScrollingTicker: React.FC = () => {
    const items = [...keywords, ...keywords]; // duplicate for seamless loop

    return (
        <div className="relative overflow-hidden py-5 border-y border-white/[0.06] bg-white/[0.02]">
            <div className="flex animate-scroll-x whitespace-nowrap">
                {items.map((word, i) => (
                    <span
                        key={i}
                        className="inline-flex items-center gap-3 px-6 text-sm font-medium text-text-secondary tracking-wide"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                        {word}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ScrollingTicker;
