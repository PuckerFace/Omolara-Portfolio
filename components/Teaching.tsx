'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { TEACHING } from '@/constants';
import AnimatedText from './AnimatedText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Teaching() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('[data-program]').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });

      gsap.fromTo(
        '[data-quote]',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: '[data-quote]', start: 'top 85%' },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="teaching" ref={rootRef} className="relative container-pad py-24 md:py-36 bg-espresso text-cream overflow-hidden">
      <div className="max-w-3xl mb-14 md:mb-20">
        <p className="font-mono text-xs uppercase tracking-widest2 text-caramel2 mb-4">
          {TEACHING.eyebrow}
        </p>
        <AnimatedText
          text={TEACHING.heading}
          as="h2"
          className="font-display italic text-4xl md:text-6xl text-cream"
          stagger={0.03}
        />
        <p className="font-body text-base md:text-lg text-cream/70 leading-relaxed mt-6 max-w-2xl">
          {TEACHING.description}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {TEACHING.programs.map((program) => (
          <div
            key={program.title}
            data-program
            className="border border-cream/15 rounded-md p-6 md:p-7 hover:border-caramel2/60 transition-colors duration-500"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest2 text-caramel2 mb-4">
              {program.audience}
            </p>
            <h3 className="font-display italic text-2xl text-cream mb-3">{program.title}</h3>
            <p className="font-body text-sm text-cream/65 leading-relaxed">{program.copy}</p>
          </div>
        ))}
      </div>

      <div data-quote className="mt-16 md:mt-24 max-w-3xl opacity-0">
        <p className="font-display italic text-2xl md:text-4xl leading-snug text-cream/90">
          &ldquo;{TEACHING.quote.text}&rdquo;
        </p>
        <p className="font-mono text-xs uppercase tracking-widest2 text-caramel2 mt-5">
          &mdash; {TEACHING.quote.attribution}
        </p>
      </div>
    </section>
  );
}
