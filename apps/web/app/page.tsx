import { Metadata } from 'next';
import { Hero } from '@/components/Hero';

export const metadata: Metadata = {
  title: 'Home - SpecUI',
  description: 'Build UIs with Specs',
  openGraph: {
    images: ['https://specui.org/api/og'],
    siteName: 'SpecUI',
    title: 'Home - SpecUI',
    description: 'Build UIs with Specs',
    url: 'https://specui.org/',
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
