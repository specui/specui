import { ZappEditor } from '@/components/ZappEditor/ZappEditor';

export default function Home() {
  return (
    <main className="flex flex-col align-middle justify-center mx-auto h-screen w-1/2">
      <h1 className="text-center mb-12 text-3xl font-bold uppercase">Continuous code generation</h1>
      <div className="flex">
        <div className="w-1/2">
          <ZappEditor />
        </div>
        <div className="w-1/2">
          <ZappEditor />
        </div>
      </div>
    </main>
  );
}
