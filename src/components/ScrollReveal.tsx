import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ScrollRevealProps {
    children: React.ReactNode;
    direction?: 'up' | 'left' | 'right' | 'fade';
    delay?: number;
    duration?: number;
    className?: string;
    threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 700,
    className = '',
    threshold = 0.15,
}) => {
    const { ref, isVisible } = useScrollReveal({ threshold });
    const prefersReduced = useReducedMotion();

    const baseStyle: React.CSSProperties = {
        transitionProperty: 'opacity, transform',
        transitionDuration: prefersReduced ? '0ms' : `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: prefersReduced ? '0ms' : `${delay}ms`,
    };

    const hiddenTransform: Record<string, string> = {
        up: 'translateY(30px)',
        left: 'translateX(-40px)',
        right: 'translateX(40px)',
        fade: 'none',
    };

    const style: React.CSSProperties = {
        ...baseStyle,
        opacity: isVisible || prefersReduced ? 1 : 0,
        transform: isVisible || prefersReduced ? 'none' : hiddenTransform[direction],
    };

    return (
        <div ref={ref} style={style} className={className}>
            {children}
        </div>
    );
};

export default ScrollReveal;
