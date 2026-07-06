'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
// This component exists solely to refresh ScrollTrigger after fonts have loaded
// Web fonts (Fraunces / Manrope / JetBrains Mono) load asynchronously and can
// shift section heights after ScrollTrigger has already calculated start/end
// positions. Without a refresh, triggers below the shift can end up
// permanently mis-positioned, leaving their reveal animations stuck. This
// recalculates once fonts are ready and once more on full window load.
export default function ScrollTriggerRefresher() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    }

    window.addEventListener('load', refresh);

    // Belt-and-braces: layout can still settle a frame or two after mount.
    const t = setTimeout(refresh, 500);

    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(t);
    };
  }, []);

  return null;
}
