'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CONTACT, SOCIAL_LINKS } from '@/constants';
import AnimatedText from './AnimatedText';
import MagneticButton from './MagneticButton';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-social-link]', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-social-wrap]', start: 'top 90%' },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={rootRef} className="relative container-pad py-24 md:py-40">
      <p className="font-mono text-xs uppercase tracking-widest2 text-coffee mb-6">
        {CONTACT.eyebrow}
      </p>

      <AnimatedText
        text={CONTACT.heading}
        as="h2"
        className="font-display italic text-5xl md:text-8xl text-espresso leading-[0.95] max-w-4xl"
        stagger={0.02}
      />

      <p className="font-body text-base md:text-lg text-espresso/65 leading-relaxed max-w-xl mt-8">
        {CONTACT.description}
      </p>

      <MagneticButton
        href={CONTACT.ctaHref}
        cursorLabel="Email"
        className="hover-target inline-flex items-center gap-3 mt-10 font-mono text-sm md:text-base border-b border-espresso pb-1 text-espresso"
      >
        {CONTACT.ctaLabel}
        <span aria-hidden="true">&#8599;</span>
      </MagneticButton>

      <div data-social-wrap className="mt-16 md:mt-24 flex flex-wrap gap-x-10 gap-y-4">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            data-social-link
            className="hover-target font-mono text-xs uppercase tracking-widest2 text-espresso/50 hover:text-espresso transition-colors"
            data-cursor-label={social.label}
            target={social.href.startsWith('http') ? '_blank' : undefined}
            rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {social.label}
          </a>
        ))}
      </div>
    </section>
  );
}
