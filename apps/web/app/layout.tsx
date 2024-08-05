import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'SpecUI',
  description: 'Turn specs into code',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} ${GeistSans.variable} ${GeistMono.variable}`}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
