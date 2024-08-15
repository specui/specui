import { Metadata } from 'next';
import { Playground } from '@/components/Playground/Playground';

export const metadata: Metadata = {
  title: 'Next.js Playground - SpecUI',
  description: 'Build UIs with Specs',
  openGraph: {
    images: ['https://specui.org/api/og?path=/playground/next'],
    title: 'Next.js Playground - SpecUI',
    url: 'https://specui.org/playground/next',
  },
};

export default function PlaygroundNextPage() {
  return (
    <main
      className="flex flex-col align-middle justify-center mx-auto"
      style={{ height: 'calc(100vh - 65px)' }}
    >
      <Playground generator="next" />
    </main>
  );
}
