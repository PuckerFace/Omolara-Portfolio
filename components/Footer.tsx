'use client';

import { FOOTER } from '@/constants';

export default function Footer() {
  const scrollTop = () => {
    document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative container-pad py-10 border-t border-espresso/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div>
        {/* <p className="font-mono text-[11px] uppercase tracking-widest2 text-espresso/50">
          {FOOTER.availability}
        </p> */}
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-espresso/40 mt-1">
          {FOOTER.location}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <p className="font-mono text-[11px] text-espresso/40">
          {FOOTER.copyright}
        </p>
        <button
          onClick={scrollTop}
          className="hover-target font-mono text-[11px] uppercase tracking-widest2 border border-espresso/20 rounded-full px-4 py-2 text-espresso/60 hover:text-espresso hover:border-espresso/50 transition-colors"
          data-cursor-label="Up"
        >
          {FOOTER.backToTop}
        </button>
      </div>
    </footer>
  );
}
