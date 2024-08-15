import { Metadata } from 'next';
import { Playground } from '@/components/Playground/Playground';

export const metadata: Metadata = {
  openGraph: {
    title: 'Next.js Playground - SpecUI',
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
