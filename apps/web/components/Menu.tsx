import Link from 'next/link';
import { FC } from 'react';

const pages = [
  {
    text: 'Playground',
    url: '/playground',
  },
  {
    text: 'Docs',
    url: '/docs',
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
