'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { NAV_LINKS, SITE, UI } from '@/constants';

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -40,
        opacity: 0,
        duration: 1,
        delay: 1.6,
        ease: 'power4.out',
      });

      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const current = window.scrollY;
          if (current > lastScroll.current && current > 120) {
            gsap.to(navRef.current, { yPercent: -140, duration: 0.5, ease: 'power3.out' });
          } else {
            gsap.to(navRef.current, { yPercent: 0, duration: 0.5, ease: 'power3.out' });
          }
          lastScroll.current = current;
          ticking = false;
        });
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(el, { display: 'flex' });
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power4.inOut' }
        );
        gsap.fromTo(
          el.querySelectorAll('[data-menu-item]'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.25, ease: 'power3.out' }
        );
      } else {
        gsap.to(el, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.5,
          ease: 'power3.inOut',
          onComplete: () => gsap.set(el, { display: 'none' }),
        });
      }
    }, menuRef);

    return () => ctx.revert();
  }, [open]);

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between container-pad py-5 md:py-6 bg-cream/80 backdrop-blur-sm border-b border-espresso/10"
      >
        <a
          href="#top"
          className="hover-target font-display italic text-lg md:text-xl tracking-tight"
          data-cursor-label="Home"
        >
          {SITE.name}
        </a>

        <nav className="hidden md:flex items-center gap-10 font-mono text-xs uppercase tracking-widest2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover-target relative group text-espresso/80 hover:text-espresso transition-colors"
              data-cursor-label="View"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-caramel transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="hover-target md:hidden font-mono text-xs uppercase tracking-widest2 border border-espresso/30 rounded-full px-4 py-2"
          aria-expanded={open}
          aria-label={open ? UI.menuClose : UI.menuOpen}
        >
          {open ? UI.menuClose : UI.menuOpen}
        </button>
      </header>

      <div
        ref={menuRef}
        className="fixed inset-0 z-40 hidden flex-col justify-center gap-6 bg-cream container-pad md:hidden"
        style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            data-menu-item
            href={link.href}
            onClick={() => setOpen(false)}
            className="font-display text-4xl italic text-espresso"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
