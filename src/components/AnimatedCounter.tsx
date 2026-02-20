import React, { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface AnimatedCounterProps {
    end: number;
    start?: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
    end,
    start = 0,
    duration = 1200,
    prefix = '',
    suffix = '',
    className = '',
}) => {
    const [value, setValue] = useState(start);
    const { ref, isVisible } = useScrollReveal({ threshold: 0.5 });
    const prefersReduced = useReducedMotion();
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isVisible || hasAnimated.current) return;
        hasAnimated.current = true;

        if (prefersReduced) {
            setValue(end);
            return;
        }

        const startTime = performance.now();

        const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (end - start) * eased);
            setValue(current);

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);
    }, [isVisible, end, start, duration, prefersReduced]);

    return (
        <span ref={ref} className={className}>
            {prefix}{value.toLocaleString('en-IN')}{suffix}
        </span>
    );
};

export default AnimatedCounter;
