import { clsx } from 'clsx';

export default function Header() {
  return (
    <>
      <header className="flex justify-between p-2">
        <h1>SpecUI</h1>
        <nav>
          <ul className="flex gap-2">
            <li>
              <div>Home</div>
            </li>
            <li>
              <div>Docs</div>
            </li>
            <li>
              <div>Features</div>
            </li>
            <li>
              <div>Specs</div>
            </li>
            <li>
              <div>Generators</div>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
