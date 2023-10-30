import Link from 'next/link';
import { FC } from 'react';

const pages = [
  {
    text: 'Docs',
    url: '/docs',
  },
  {
    text: 'Playground',
    url: '/playground',
  },
];

export const Menu: FC = () => {
  return (
    <ul className="flex gap-4">
      {pages.map((page) => (
        <li key={page.url}>
          <Link href={page.url}>{page.text}</Link>
        </li>
      ))}
    </ul>
  );
};
