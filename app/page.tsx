'use client';

import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Teaching from '@/components/Teaching';
import LinkedInPosts from '@/components/LinkedInPosts';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Teaching />
        <LinkedInPosts />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
