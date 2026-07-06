'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ABOUT, EQ_BADGE } from '@/constants';
import AnimatedText from './AnimatedText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const rootRef = useRef<HTMLElement | null>(null);
  const imgWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgWrapRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.15 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: { trigger: imgWrapRef.current, start: 'top 80%' },
        },
      );

      gsap.utils.toArray('[data-pillar]').forEach((el, i) => {
        gsap.from(el as gsap.TweenTarget, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el as Element, start: 'top 90%' },
        });
      });

      gsap.fromTo(
        '[data-eq-badge]',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-eq-badge]', start: 'top 90%' },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      className="relative container-pad py-24 md:py-36"
    >
      <div className="grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-widest2 text-coffee mb-4">
            {ABOUT.eyebrow}
          </p>
          <div
            ref={imgWrapRef}
            className="relative w-full aspect-4/5 max-w-sm rounded-xs overflow-hidden bg-parchment"
          >
            <Image
              src={ABOUT.portrait.src}
              alt={ABOUT.portrait.alt}
              fill
              sizes="(max-width: 768px) 90vw, 380px"
              className="object-cover grayscale-15 contrast-[1.02]"
              priority={false}
            />
            <div className="absolute inset-0 bg-espresso/10 mix-blend-multiply" />
          </div>

          <div
            data-eq-badge
            className="mt-6 max-w-sm border-l-2 border-sage pl-4 py-1"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest2 text-sage mb-1">
              {EQ_BADGE.label}
            </p>
            <p className="font-body text-sm text-espresso/70 leading-relaxed">
              {EQ_BADGE.copy}
            </p>
          </div>
        </div>

        <div className="md:col-span-8">
          <AnimatedText
            text={ABOUT.heading}
            as="h2"
            className="font-display italic text-4xl md:text-6xl text-espresso mb-8 md:mb-12"
            stagger={0.03}
          />

          <div className="space-y-6 max-w-2xl">
            {ABOUT.paragraphs.map((p, i) => (
              <p
                key={i}
                className="font-body text-base md:text-lg text-espresso/75 leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-14 grid sm:grid-cols-3 gap-8">
            {ABOUT.pillars.map((pillar) => (
              <div
                key={pillar.index}
                data-pillar
                className="border-t border-espresso/20 pt-5"
              >
                <span className="font-mono text-xs text-caramel">
                  {pillar.index}
                </span>
                <h3 className="font-display italic text-2xl text-espresso mt-2 mb-2">
                  {pillar.title}
                </h3>
                <p className="font-body text-sm text-espresso/60 leading-relaxed">
                  {pillar.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
