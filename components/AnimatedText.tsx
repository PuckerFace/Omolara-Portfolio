'use client';

import { useEffect, useRef, type ElementType } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  stagger?: number;
  delay?: number;
  start?: string;
  once?: boolean;
}

// Splits text into words, each masked in an overflow-hidden wrapper,
// and reveals them with a staggered rise on scroll into view.
export default function AnimatedText({
  text,
  as: Tag = 'p',
  className = '',
  wordClassName = '',
  stagger = 0.03,
  delay = 0,
  start = 'top 85%',
  once = true,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll('[data-word]');
      gsap.set(words, { yPercent: 110 });

      gsap.to(words, {
        yPercent: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger,
        delay,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [stagger, delay, start, once]);

  const words = text.split(' ');

  return (
    <Tag ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top pb-[0.15em]">
          <span data-word className={`inline-block will-change-transform ${wordClassName}`}>
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}
