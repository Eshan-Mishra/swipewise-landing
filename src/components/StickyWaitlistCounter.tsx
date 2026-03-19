import React, { useEffect, useState } from 'react';
import { getWaitlistCount } from '../lib/waitlist';

const StickyWaitlistCounter: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getWaitlistCount().then((c) => {
            setCount(c);
            if (c > 0) setTimeout(() => setVisible(true), 1500);
        });
    }, []);

    // Listen for custom event dispatched after signup
    useEffect(() => {
        const handler = () => {
            getWaitlistCount().then(setCount);
        };
        window.addEventListener('waitlist-signup', handler);
        return () => window.removeEventListener('waitlist-signup', handler);
    }, []);

    if (count <= 0) return null;

    return (
        <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${
                visible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
        >
            <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-surface/80 border border-white/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                </span>
                <span className="text-sm text-text-secondary">
                    <span className="text-primary font-bold text-base tabular-nums">
                        {count.toLocaleString('en-IN')}
                    </span>
                    {' '}people joined the waitlist
                </span>
            </div>
        </div>
    );
};

export default StickyWaitlistCounter;
