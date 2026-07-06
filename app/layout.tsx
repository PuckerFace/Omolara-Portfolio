import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Fraunces, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SITE } from '@/constants';
import CustomCursor from '@/components/CustomCursor';
import ScrollTriggerRefresher from '@/components/ScrollTriggerRefresher';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased bg-cream text-espresso">
        <div className="grain-overlay bg-grain" aria-hidden="true" />
        <CustomCursor />
        <ScrollTriggerRefresher />
        {children}
      </body>
    </html>
  );
}
