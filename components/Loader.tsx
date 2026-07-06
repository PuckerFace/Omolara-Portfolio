'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { UI, SITE } from '@/constants';

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const countRef = useRef<HTMLParagraphElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          onComplete?.();
        },
      });

      tl.to(counter, {
        val: 100,
        duration: 1.6,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = String(
              Math.round(counter.val),
            ).padStart(3, '0');
          }
        },
      })
        .to(
          '[data-loader-bar]',
          { scaleX: 1, duration: 1.6, ease: 'power2.inOut' },
          '<',
        )
        .to(
          rootRef.current,
          { yPercent: -100, duration: 0.9, ease: 'power4.inOut' },
          '+=0.15',
        );
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-80 bg-espresso text-cream flex flex-col items-center justify-center"
    >
      <p className="font-mono text-xs uppercase tracking-widest2 text-cream/50 mb-4">
        {UI.loaderLabel} &mdash; {SITE.name}
      </p>
      <p ref={countRef} className="font-display italic text-6xl md:text-8xl">
        000
      </p>
      <div className="w-40 md:w-56 h-px bg-cream/20 mt-8 overflow-hidden">
        <div
          data-loader-bar
          className="h-full w-full bg-caramel2 origin-left scale-x-0"
        />
      </div>
    </div>
  );
}
