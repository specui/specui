import { ZappEditor } from '@/components/ZappEditor/ZappEditor';

export default function Home() {
  return (
    <main className="flex flex-col align-middle justify-center mx-auto h-screen">
      <h1 className="text-center mb-12 text-3xl">ZappJS</h1>
      <h2 className="text-center mb-12 text-2xl">Continuous code generation</h2>
      <ZappEditor />
    </main>
  );
}
