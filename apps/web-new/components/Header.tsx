import { clsx } from 'clsx';

export default function Header() {
  return (
    <>
      <header className="flex justify-between p-2">
        <h1>SpecUI</h1>
        <nav>
          <ul className="flex gap-2">
            <li>Home</li>
            <li>Docs</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
    </>
  );
}
