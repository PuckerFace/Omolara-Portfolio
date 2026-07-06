'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  cursorLabel?: string;
  as?: ElementType;
  strength?: number;
  [key: `data-${string}`]: unknown;
}

// Button that subtly follows the cursor within its bounds ("magnetic" hover),
// with a spring back to rest on mouse leave.
export default function MagneticButton({
  href,
  onClick,
  children,
  className = '',
  cursorLabel,
  as = 'a',
  strength = 0.35,
  ...rest
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarsePointer) return;

    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        xTo(relX * strength);
        yTo(relY * strength);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);

      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      };
    }, btnRef);

    return () => ctx.revert();
  }, [strength]);

  const Comp = as as ElementType;
  const compProps = as === 'a' ? { href } : { onClick, type: 'button' };

  return (
    <Comp
      ref={btnRef}
      {...compProps}
      {...rest}
      className={`hover-target ${className}`}
      data-cursor-label={cursorLabel}
    >
      {children}
    </Comp>
  );
}
