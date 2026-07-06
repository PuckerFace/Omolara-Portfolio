'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HERO } from '@/constants';
import AnimatedText from './AnimatedText';
import MagneticButton from './MagneticButton';
import TerminalPanel from './TerminalPanel';

interface Point {
  id: number;
  baseX: number;
  baseY: number;
  r: number;
}

interface LineDef {
  id: string;
  aId: number;
  bId: number;
}

interface Vec2 {
  x: number;
  y: number;
}

// Deterministic pseudo-random generator so server & client render identically.
function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function generatePoints(count: number, seed: number): Point[] {
  const rand = seededRandom(seed);
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    points.push({
      id: i,
      baseX: rand() * 100,
      baseY: rand() * 100,
      r: 1.3 + rand() * 2.3,
    });
  }
  return points;
}

function nearestLines(points: Point[], maxLines: number): LineDef[] {
  const lines: LineDef[] = [];
  for (let i = 0; i < points.length && lines.length < maxLines; i += 3) {
    const a = points[i];
    let best: Point | null = null;
    let bestDist = Infinity;
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      const b = points[j];
      const d = Math.hypot(a.baseX - b.baseX, a.baseY - b.baseY);
      if (d < bestDist) {
        bestDist = d;
        best = b;
      }
    }
    if (best) lines.push({ id: `${a.id}-${best.id}`, aId: a.id, bId: best.id });
  }
  return lines;
}

const POINTS = generatePoints(48, 7);
const LINES = nearestLines(POINTS, 16);
const REPEL_RADIUS = 22; // in viewBox units (0-100)
const REPEL_STRENGTH = 11;

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const metricsRef = useRef<HTMLDivElement | null>(null);
  const headlineWrapRef = useRef<HTMLDivElement | null>(null);
  const subheadWrapRef = useRef<HTMLDivElement | null>(null);
  const pointElsRef = useRef<Map<number, SVGCircleElement>>(new Map());
  const lineElsRef = useRef<Map<string, SVGLineElement>>(new Map());
  const posRef = useRef<Map<number, Vec2>>(new Map());
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -999,
    y: -999,
    active: false,
  });

  // Entrance animations, count-up metrics.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from('[data-hero-eyebrow]', { opacity: 0, y: 16, duration: 0.7 })
        .from(
          '[data-hero-cta]',
          { opacity: 0, y: 16, duration: 0.7, stagger: 0.1 },
          '-=0.3',
        )
        .from(
          '[data-hero-terminal]',
          { opacity: 0, y: 16, duration: 0.7 },
          '-=0.4',
        )
        .from('[data-hero-scroll]', { opacity: 0, duration: 0.8 }, '-=0.5');

      const points = svgRef.current?.querySelectorAll('[data-point]') ?? [];
      const lines = svgRef.current?.querySelectorAll('[data-line]') ?? [];

      gsap.set(points, { transformOrigin: '50% 50%', scale: 0, opacity: 0 });
      gsap.set(lines, { opacity: 0 });

      gsap.to(points, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: { each: 0.012, from: 'random' },
        delay: 0.4,
        ease: 'back.out(2)',
      });

      gsap.to(lines, { opacity: 0.3, duration: 1, delay: 1, stagger: 0.05 });

      const metricEls =
        metricsRef.current?.querySelectorAll<HTMLElement>(
          '[data-metric-value]',
        ) ?? [];
      metricEls.forEach((el) => {
        const target = el.getAttribute('data-metric-value') ?? '';
        const numeric = parseFloat(target);
        const suffix = target.replace(/[0-9.]/g, '');
        if (Number.isNaN(numeric)) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: numeric,
          duration: 1.6,
          delay: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${Math.round(counter.val)}${suffix}`;
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Interactive, cursor-reactive data field: points drift continuously and
  // repel away from the pointer; connecting lines follow their endpoints.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    POINTS.forEach((p) => posRef.current.set(p.id, { x: p.baseX, y: p.baseY }));

    const toSvgSpace = (clientX: number, clientY: number): Vec2 => {
      const rect = svg.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) / rect.width) * 100,
        y: ((clientY - rect.top) / rect.height) * 100,
      };
    };

    const onMove = (e: MouseEvent) => {
      const { x, y } = toSvgSpace(e.clientX, e.clientY);
      mouseRef.current = { x, y, active: true };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    if (!isCoarsePointer) {
      window.addEventListener('mousemove', onMove, { passive: true });
      svg.addEventListener('mouseleave', onLeave);
    }

    const tick = (time: number) => {
      const t = time / 1000;
      const mouse = mouseRef.current;

      POINTS.forEach((p, i) => {
        const drift = {
          x: Math.sin(t * 0.5 + i) * 1.4,
          y: Math.cos(t * 0.4 + i * 1.3) * 1.4,
        };

        let repelX = 0;
        let repelY = 0;
        if (mouse.active) {
          const dx = p.baseX + drift.x - mouse.x;
          const dy = p.baseY + drift.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPEL_RADIUS && dist > 0.001) {
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            repelX = (dx / dist) * force;
            repelY = (dy / dist) * force;
          }
        }

        const current = posRef.current.get(p.id);
        if (!current) return;
        const targetX = p.baseX + drift.x + repelX;
        const targetY = p.baseY + drift.y + repelY;
        current.x += (targetX - current.x) * 0.09;
        current.y += (targetY - current.y) * 0.09;

        const el = pointElsRef.current.get(p.id);
        if (el) {
          el.setAttribute('cx', current.x.toFixed(2));
          el.setAttribute('cy', current.y.toFixed(2));
        }
      });

      LINES.forEach((l) => {
        const a = posRef.current.get(l.aId);
        const b = posRef.current.get(l.bId);
        const el = lineElsRef.current.get(l.id);
        if (el && a && b) {
          el.setAttribute('x1', a.x.toFixed(2));
          el.setAttribute('y1', a.y.toFixed(2));
          el.setAttribute('x2', b.x.toFixed(2));
          el.setAttribute('y2', b.y.toFixed(2));
        }
      });
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('mousemove', onMove);
      svg.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // Subtle parallax tilt on the headline and subhead, following the pointer.
  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarsePointer) return;

    const cleanups: Array<() => void> = [];

    const wrap = headlineWrapRef.current;
    if (wrap) {
      const ctx = gsap.context(() => {
        const xTo = gsap.quickTo(wrap, 'x', {
          duration: 0.7,
          ease: 'power3.out',
        });
        const yTo = gsap.quickTo(wrap, 'y', {
          duration: 0.7,
          ease: 'power3.out',
        });
        const rotTo = gsap.quickTo(wrap, 'rotate', {
          duration: 0.7,
          ease: 'power3.out',
        });

        const onMove = (e: MouseEvent) => {
          const nx = (e.clientX / window.innerWidth - 0.5) * 2;
          const ny = (e.clientY / window.innerHeight - 0.5) * 2;
          xTo(nx * 10);
          yTo(ny * 6);
          rotTo(nx * 0.6);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
      }, headlineWrapRef);

      cleanups.push(() => ctx.revert());
    }

    const wrap2 = subheadWrapRef.current;
    if (wrap2) {
      const ctx2 = gsap.context(() => {
        const xTo = gsap.quickTo(wrap2, 'x', {
          duration: 0.6,
          ease: 'power3.out',
        });
        const yTo = gsap.quickTo(wrap2, 'y', {
          duration: 0.7,
          ease: 'power3.out',
        });
        const rotTo = gsap.quickTo(wrap2, 'rotate', {
          duration: 0.7,
          ease: 'power3.out',
        });

        const onMove = (e: MouseEvent) => {
          const nx = (e.clientX / window.innerWidth - 0.5) * 2;
          const ny = (e.clientY / window.innerHeight - 0.5) * 2;
          xTo(nx * 15);
          yTo(ny * 7);
          rotTo(nx * 0.5);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
      }, subheadWrapRef);

      cleanups.push(() => ctx2.revert());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative min-h-svh flex flex-col justify-center overflow-hidden pt-28 pb-16 container-pad"
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full opacity-70 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {LINES.map((l) => (
          <line
            key={l.id}
            data-line
            ref={(el) => {
              if (el) lineElsRef.current.set(l.id, el);
            }}
            stroke="#6B4A32"
            strokeWidth="0.08"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {POINTS.map((p) => (
          <circle
            key={p.id}
            data-point
            ref={(el) => {
              if (el) pointElsRef.current.set(p.id, el);
            }}
            cx={p.baseX}
            cy={p.baseY}
            r={p.r * 0.22}
            fill={p.id % 7 === 0 ? '#C08A4E' : '#2E2118'}
            fillOpacity={p.id % 7 === 0 ? 0.9 : 0.28}
          />
        ))}
      </svg>

      <div className="relative z-10">
        <p
          data-hero-eyebrow
          className="font-mono text-xs md:text-sm uppercase tracking-widest2 text-coffee mb-6 md:mb-8"
        >
          {HERO.eyebrow}
        </p>

        <div ref={headlineWrapRef} className="will-change-transform">
          <h1 className="font-display italic font-medium text-[16vw] leading-[0.92] md:text-[8.5vw] lg:text-[7.5rem] text-espresso -ml-1">
            {HERO.headlineLines.map((line) => (
              <AnimatedText
                key={line}
                text={line}
                as="span"
                className="block"
                delay={0.9}
                stagger={0.04}
              />
            ))}
          </h1>
        </div>

        <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest2 text-espresso/35 mt-4 hidden md:block">
          {HERO.interactionHint}
        </p>

        <div
          ref={subheadWrapRef}
          className="mt-8 md:mt-10 max-w-xl will-change-transform"
        >
          <AnimatedText
            text={HERO.subhead}
            as="p"
            className="font-body text-lg md:text-2xl text-espresso/90 leading-snug"
            delay={0.9}
            stagger={0.04}
          />
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
          <div className="max-w-lg">
            <p className="font-body text-sm md:text-base text-espresso/60 leading-relaxed">
              {HERO.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton
                href={HERO.ctaPrimary.href}
                cursorLabel="Go"
                data-hero-cta
                className="inline-flex items-center gap-2 bg-espresso text-cream font-mono text-xs uppercase tracking-widest2 px-7 py-4 rounded-full"
              >
                {HERO.ctaPrimary.label}
              </MagneticButton>
              <MagneticButton
                href={HERO.ctaSecondary.href}
                cursorLabel="Go"
                data-hero-cta
                className="inline-flex items-center gap-2 border border-espresso/30 text-espresso font-mono text-xs uppercase tracking-widest2 px-7 py-4 rounded-full"
              >
                {HERO.ctaSecondary.label}
              </MagneticButton>
            </div>
          </div>

          <div
            data-hero-terminal
            className="w-full max-w-xs md:max-w-70 md:mt-1"
          >
            <TerminalPanel lines={HERO.terminalLines} />
          </div>
        </div>

        <div
          ref={metricsRef}
          className="mt-16 md:mt-20 grid grid-cols-3 gap-6 max-w-xl border-t border-espresso/15 pt-6"
        >
          {HERO.metrics.map((m) => (
            <div
              key={m.label}
              className="hover-target group relative"
              data-cursor-label={m.detail}
            >
              <p
                className="font-display text-2xl md:text-4xl text-coffee transition-colors duration-300 group-hover:text-caramel"
                data-metric-value={m.value}
              >
                0
              </p>
              <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest2 text-espresso/50 mt-1">
                {m.label}
              </p>
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-caramel transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>

      <div
        data-hero-scroll
        className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-16 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest2 text-espresso/50"
      >
        <span className="hidden md:inline">{HERO.scrollHint}</span>
        <span className="w-px h-8 bg-espresso/30 relative overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-caramel animate-[scrollLine_1.8s_ease-in-out_infinite]" />
        </span>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
      `}</style>
    </section>
  );
}
