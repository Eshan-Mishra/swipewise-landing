import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Check if user prefers reduced motion */
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Fade-up + stagger children on scroll.
 *
 * Usage:
 *   const ref = useGsapStagger<HTMLDivElement>();
 *   <div ref={ref}> <child/> <child/> </div>
 */
export function useGsapStagger<T extends HTMLElement>(
  opts: { stagger?: number; y?: number; duration?: number; start?: string } = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;

    const children = ref.current.children;
    if (!children.length) return;

    gsap.set(children, { opacity: 0, y: opts.y ?? 60 });

    const tl = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: opts.duration ?? 0.7,
      stagger: opts.stagger ?? 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: opts.start ?? 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, []);

  return ref;
}

/**
 * Fade-in a single element on scroll.
 */
export function useGsapFadeIn<T extends HTMLElement>(
  opts: { y?: number; duration?: number; delay?: number; start?: string } = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;

    gsap.set(ref.current, { opacity: 0, y: opts.y ?? 40 });

    const tl = gsap.to(ref.current, {
      opacity: 1,
      y: 0,
      duration: opts.duration ?? 0.8,
      delay: opts.delay ?? 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: opts.start ?? 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, []);

  return ref;
}

/**
 * Parallax — element moves at a different rate while scrolling.
 */
export function useGsapParallax<T extends HTMLElement>(
  opts: { speed?: number } = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;

    const tl = gsap.to(ref.current, {
      yPercent: opts.speed ?? -15,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, []);

  return ref;
}

/**
 * Word-by-word text reveal.
 */
export function useGsapTextReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;

    const el = ref.current;
    const text = el.textContent || '';
    const words = text.split(' ');
    el.innerHTML = words
      .map((w) => `<span class="inline-block opacity-0 translate-y-3">${w}</span>`)
      .join(' ');

    const spans = el.querySelectorAll('span');

    const tl = gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.04,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      el.textContent = text;
    };
  }, []);

  return ref;
}
