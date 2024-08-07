import { Playground } from '@/components/Playground/Playground';

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
