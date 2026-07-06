'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TerminalPanelProps {
  lines: string[];
  className?: string;
}

// Cycles through code-like lines with a typewriter effect, looping.
export default function TerminalPanel({
  lines,
  className = '',
}: TerminalPanelProps) {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const textEl = textRef.current;
    const cursorEl = cursorRef.current;
    if (!textEl || !cursorEl) return;

    let cancelled = false;
    const ctx = gsap.context(() => {
      gsap.to(cursorEl, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    });

    const state = { lineIndex: 0, charIndex: 0 };
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      if (cancelled) return;
      const currentLine = lines[state.lineIndex % lines.length];

      if (state.charIndex <= currentLine.length) {
        textEl.textContent = currentLine.slice(0, state.charIndex);
        state.charIndex += 1;
        timeoutId = setTimeout(typeNext, 32 + Math.random() * 28);
      } else {
        timeoutId = setTimeout(eraseNext, 1400);
      }
    };

    const eraseNext = () => {
      if (cancelled) return;
      const currentLine = lines[state.lineIndex % lines.length];
      if (state.charIndex >= 0) {
        textEl.textContent = currentLine.slice(0, state.charIndex);
        state.charIndex -= 1;
        timeoutId = setTimeout(eraseNext, 16);
      } else {
        state.lineIndex += 1;
        state.charIndex = 0;
        timeoutId = setTimeout(typeNext, 250);
      }
    };

    timeoutId = setTimeout(typeNext, 400);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      ctx.revert();
    };
  }, [lines]);

  return (
    <div
      className={`rounded-md border border-espresso/20 bg-espresso/95 text-cream font-mono text-xs md:text-sm px-4 py-3 shadow-[0_20px_40px_-24px_rgba(46,33,24,0.5)] ${className}`}
    >
      <div className="flex items-center gap-1.5 mb-2.5 opacity-60">
        <span className="w-2 h-2 rounded-full bg-cream/40" />
        <span className="w-2 h-2 rounded-full bg-cream/40" />
        <span className="w-2 h-2 rounded-full bg-cream/40" />
      </div>
      <div className="flex items-center gap-1 min-h-[1.4em]">
        <span className="text-caramel2">&gt;&gt;&gt;</span>
        <span ref={textRef} className="text-cream/90" />
        <span
          ref={cursorRef}
          className="inline-block w-[7px] h-[1.05em] bg-caramel2 translate-y-[1px]"
        />
      </div>
    </div>
  );
}
