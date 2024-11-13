import { clsx } from 'clsx';
import { SignedIn, UserButton, SignedOut, SignInButton } from '@clerk/nextjs';

export default function IndexPage() {
  return (
    <>
      <SignedIn>
        <div>
          <header className="flex justify-between p-2">
            <h1>MyProtectedApp</h1>
            <UserButton />
          </header>
          <section className="flex flex-col gap-2 h-[calc(100dvh-44px)] items-center justify-center">
            <h1 className="text-2xl">Welcome to MyProtectedApp</h1>
          </section>
        </div>
      </SignedIn>
      <SignedOut>
        <section className="flex flex-col gap-2 h-dvh items-center justify-center">
          <h1 className="text-2xl">Sign In to MyProtectedApp</h1>
          <SignInButton />
        </section>
      </SignedOut>
    </>
  );
}
