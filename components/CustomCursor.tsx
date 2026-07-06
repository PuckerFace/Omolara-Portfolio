'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
//Things to note about this cursor:
// A crosshair + trailing dot cursor evokes plotting a data point.
// Scales/expands when hovering elements tagged with .hover-target.
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarsePointer) return;

    const ctx = gsap.context(() => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      const label = labelRef.current;
      if (!dot || !ring) return;

      gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

      const xToDot = gsap.quickTo(dot, 'x', {
        duration: 0.12,
        ease: 'power3.out',
      });
      const yToDot = gsap.quickTo(dot, 'y', {
        duration: 0.12,
        ease: 'power3.out',
      });
      const xToRing = gsap.quickTo(ring, 'x', {
        duration: 0.35,
        ease: 'power3.out',
      });
      const yToRing = gsap.quickTo(ring, 'y', {
        duration: 0.35,
        ease: 'power3.out',
      });

      let lastX = window.innerWidth / 2;
      let lastY = window.innerHeight / 2;

      const move = (e: MouseEvent) => {
        lastX = e.clientX;
        lastY = e.clientY;
        xToDot(lastX);
        yToDot(lastY);
        xToRing(lastX);
        yToRing(lastY);
        if (label) {
          gsap.to(label, {
            x: lastX + 18,
            y: lastY + 18,
            duration: 0.25,
            ease: 'power3.out',
          });
        }
      };

      const onEnter = (e: MouseEvent) => {
        const target = (e.target as HTMLElement | null)?.closest(
          '.hover-target',
        );
        if (!target) return;
        const text = target.getAttribute('data-cursor-label');
        gsap.to(ring, {
          scale: 2.4,
          opacity: 0.35,
          duration: 0.35,
          ease: 'power3.out',
        });
        gsap.to(dot, { scale: 0, duration: 0.25, ease: 'power3.out' });
        if (text && label) {
          label.textContent = text;
          gsap.to(label, { opacity: 1, duration: 0.25 });
        }
      };

      const onLeave = (e: MouseEvent) => {
        const target = (e.target as HTMLElement | null)?.closest(
          '.hover-target',
        );
        if (!target) return;
        gsap.to(ring, {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          ease: 'power3.out',
        });
        gsap.to(dot, { scale: 1, duration: 0.25, ease: 'power3.out' });
        if (label) gsap.to(label, { opacity: 0, duration: 0.2 });
      };

      const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.15 });
      const onUp = () => gsap.to(ring, { scale: 1, duration: 0.25 });

      window.addEventListener('mousemove', move);
      document.addEventListener('mouseover', onEnter);
      document.addEventListener('mouseout', onLeave);
      window.addEventListener('mousedown', onDown);
      window.addEventListener('mouseup', onUp);

      gsap.to([dot, ring], { opacity: 1, duration: 0.4, delay: 0.3 });

      return () => {
        window.removeEventListener('mousemove', move);
        document.removeEventListener('mouseover', onEnter);
        document.removeEventListener('mouseout', onLeave);
        window.removeEventListener('mousedown', onDown);
        window.removeEventListener('mouseup', onUp);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-70 hidden md:block"
      aria-hidden="true"
    >
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-espresso opacity-0"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-caramel opacity-0"
        style={{ willChange: 'transform' }}
      />
      <span
        ref={labelRef}
        className="fixed top-0 left-0 font-mono text-[10px] uppercase tracking-widest text-espresso/70 opacity-0"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
