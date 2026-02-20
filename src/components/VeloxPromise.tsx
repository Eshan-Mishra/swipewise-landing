import React from 'react';
import { useGsapTextReveal, useGsapFadeIn } from '../hooks/useGsapScroll';

const VeloxPromise: React.FC = () => {
    const tagRef = useGsapFadeIn<HTMLParagraphElement>({ y: 20 });
    const quoteRef = useGsapTextReveal<HTMLParagraphElement>();
    const attrRef = useGsapFadeIn<HTMLParagraphElement>({ y: 10, delay: 0.6 });

    return (
        <section id="promise" className="relative py-28 lg:py-36 px-5 overflow-hidden">
            {/* Cinematic dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-[#050a0d] to-background pointer-events-none" />

            <div className="relative max-w-3xl mx-auto text-center">
                <p ref={tagRef} className="text-primary text-sm font-semibold uppercase tracking-widest mb-8">
                    The Velox Promise
                </p>
                <blockquote className="relative">
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-7xl font-serif text-primary/10 leading-none select-none">
                        "
                    </span>
                    <p
                        ref={quoteRef}
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary leading-snug tracking-tight"
                    >
                        We don't change how you spend. We change what you get for it.
                    </p>
                </blockquote>
                <p ref={attrRef} className="mt-6 text-text-muted text-sm font-medium tracking-wide">
                    — The Velox Mission
                </p>
            </div>
        </section>
    );
};

export default VeloxPromise;
