'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SKILLS } from '@/constants';
import AnimatedText from './AnimatedText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Skills() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('[data-skill-cell]').forEach((cell, i) => {
        gsap.from(cell, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: cell, start: 'top 88%' },
        });

        const chips = cell.querySelectorAll('[data-chip]');
        gsap.from(chips, {
          opacity: 0,
          x: -8,
          duration: 0.5,
          stagger: 0.04,
          delay: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: cell, start: 'top 88%' },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={rootRef} className="relative container-pad py-24 md:py-36 bg-parchment/50">
      <div className="max-w-3xl mb-14 md:mb-20">
        <p className="font-mono text-xs uppercase tracking-widest2 text-coffee mb-4">
          {SKILLS.eyebrow}
        </p>
        <AnimatedText
          text={SKILLS.heading}
          as="h2"
          className="font-display italic text-4xl md:text-6xl text-espresso"
          stagger={0.03}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
        {SKILLS.groups.map((group, i) => (
          <div
            key={group.label}
            data-skill-cell
            className="border border-espresso/15 rounded-md bg-cream/60 p-6 md:p-7"
          >
            <div className="flex items-baseline justify-between mb-5">
              <h3 className="font-display italic text-xl md:text-2xl text-espresso">
                {group.label}
              </h3>
              <span className="font-mono text-[11px] text-caramel">
                In&nbsp;[{String(i + 1).padStart(2, '0')}]:
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  data-chip
                  className="hover-target font-mono text-xs px-3.5 py-2 rounded-full border border-espresso/20 text-espresso/75 hover:border-caramel hover:text-espresso hover:bg-caramel/10 transition-colors duration-300"
                  data-cursor-label={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
