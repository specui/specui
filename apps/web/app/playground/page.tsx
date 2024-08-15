import type { Metadata } from 'next';
import { Playground } from '@/components/Playground/Playground';

export const metadata: Metadata = {
  title: 'Playground - SpecUI',
  description: 'Build UIs with Specs',
  openGraph: {
    images: ['https://specui.org/api/og?path=/playground'],
    title: 'Playground - SpecUI',
    url: 'https://specui.org/playground',
  },
};

export default function PlaygroundPage() {
  return (
    <main
      className="flex flex-col align-middle justify-center mx-auto"
      style={{ height: 'calc(100vh - 65px)' }}
    >
      <Playground generator="vanilla" />
    </main>
  );
}
