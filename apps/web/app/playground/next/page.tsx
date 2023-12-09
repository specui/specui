import { ZappEditor } from '@/components/ZappEditor/ZappEditor';

export default function Home() {
  return (
    <main
      className="flex flex-col align-middle justify-center mx-auto"
      style={{ height: 'calc(100vh - 65px)' }}
    >
      <ZappEditor generator="next" />
    </main>
  );
}
