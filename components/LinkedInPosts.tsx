'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { LINKEDIN } from '@/constants';
import AnimatedText from './AnimatedText';
import MagneticButton from './MagneticButton';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface LinkedInMarkProps {
  className?: string;
}

function LinkedInMark({ className }: LinkedInMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.44v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export default function LinkedInPosts() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-li-card]').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 44, rotateZ: i % 2 === 0 ? -1.5 : 1.5 },
          {
            opacity: 1,
            y: 0,
            rotateZ: 0,
            duration: 0.9,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          },
        );

        const glyph = card.querySelector('[data-li-glyph]');
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -6,
            boxShadow: '0 24px 40px -20px rgba(46,33,24,0.25)',
            duration: 0.4,
            ease: 'power3.out',
          });
          gsap.to(glyph, {
            rotate: 8,
            scale: 1.15,
            duration: 0.4,
            ease: 'back.out(3)',
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            boxShadow: '0 0px 0px -20px rgba(46,33,24,0)',
            duration: 0.4,
            ease: 'power3.out',
          });
          gsap.to(glyph, {
            rotate: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power3.out',
          });
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="linkedin"
      ref={rootRef}
      className="relative container-pad py-24 md:py-36"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest2 text-coffee mb-4">
            {LINKEDIN.eyebrow}
          </p>
          <AnimatedText
            text={LINKEDIN.heading}
            as="h2"
            className="font-display italic text-4xl md:text-6xl text-espresso"
            stagger={0.03}
          />
          <p className="font-body text-base md:text-lg text-espresso/65 leading-relaxed mt-6 max-w-xl">
            {LINKEDIN.description}
          </p>
        </div>

        <MagneticButton
          href={LINKEDIN.profileHref}
          cursorLabel="Follow"
          className="hover-target inline-flex items-center gap-2 border border-espresso/25 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-espresso/80 hover:text-espresso hover:border-espresso/60 transition-colors shrink-0"
        >
          <LinkedInMark className="w-4 h-4" />
          {LINKEDIN.profileLabel}
        </MagneticButton>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-7">
        {LINKEDIN.posts.map((post) => (
          <a
            key={post.id}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            data-li-card
            className="hover-target group relative flex flex-col justify-between rounded-md border border-espresso/15 bg-parchment/40 p-6 md:p-7 transition-colors duration-300 hover:bg-parchment/70"
            data-cursor-label="Read post"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span
                  data-li-glyph
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-espresso text-cream"
                >
                  <LinkedInMark className="w-4 h-4" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest2 text-espresso/45">
                  {post.date}
                </span>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-widest2 text-caramel mb-3">
                {post.tag}
              </p>

              <p className="font-body text-sm md:text-base text-espresso/80 leading-relaxed whitespace-pre-line">
                &ldquo;{post.excerpt}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between mt-8 pt-4 border-t border-espresso/10">
              {/* <span className="font-mono text-[11px] text-espresso/50">
                {post.reactions} reactions &middot; {post.comments} comments
              </span> */}
              <span className="font-mono text-[11px] text-espresso/40 group-hover:text-espresso group-hover:translate-x-1 transition-all duration-300">
                &rarr;
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
