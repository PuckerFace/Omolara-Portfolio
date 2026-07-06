'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { PROJECTS } from '@/constants';
import AnimatedText from './AnimatedText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-project-row]').forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 90%' },
          }
        );

        const line = row.querySelector('[data-row-line]');
        row.addEventListener('mouseenter', () => {
          gsap.to(line, { scaleX: 1, duration: 0.5, ease: 'power3.out' });
          gsap.to(row.querySelector('[data-row-title]'), {
            x: 12,
            duration: 0.4,
            ease: 'power3.out',
          });
        });
        row.addEventListener('mouseleave', () => {
          gsap.to(line, { scaleX: 0, duration: 0.4, ease: 'power3.out' });
          gsap.to(row.querySelector('[data-row-title]'), {
            x: 0,
            duration: 0.4,
            ease: 'power3.out',
          });
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={rootRef} className="relative container-pad py-24 md:py-36">
      <div className="max-w-3xl mb-14 md:mb-20">
        <p className="font-mono text-xs uppercase tracking-widest2 text-coffee mb-4">
          {PROJECTS.eyebrow}
        </p>
        <AnimatedText
          text={PROJECTS.heading}
          as="h2"
          className="font-display italic text-4xl md:text-6xl text-espresso"
          stagger={0.03}
        />
      </div>

      <div className="border-t border-espresso/20">
        {PROJECTS.items.map((project) => (
          <a
            key={project.id}
            href={project.href}
            data-project-row
            className="hover-target relative flex flex-col md:flex-row md:items-center gap-3 md:gap-8 py-8 md:py-10 border-b border-espresso/20 group"
            data-cursor-label="View project"
          >
            <span
              data-row-line
              className="absolute left-0 top-0 h-px w-full bg-caramel origin-left scale-x-0"
            />

            <span className="font-mono text-xs text-coffee md:w-12 shrink-0">
              {project.index}
            </span>

            <div className="flex-1">
              <div className="flex flex-wrap items-baseline gap-x-4">
                <h3
                  data-row-title
                  className="font-display italic text-2xl md:text-4xl text-espresso"
                >
                  {project.title}
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-widest2 text-espresso/40">
                  {project.category} · {project.year}
                </span>
              </div>
              <p className="font-body text-sm md:text-base text-espresso/60 mt-3 max-w-2xl leading-relaxed">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] uppercase tracking-widest2 text-espresso/50 border border-espresso/15 rounded-full px-3 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <span className="font-mono text-xs text-espresso/40 md:w-16 text-right shrink-0 hidden md:block">
              &rarr;
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
