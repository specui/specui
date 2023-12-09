import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

const pages = [
  {
    text: 'Create',
    url: '/create',
  },
  {
    text: 'Explore',
    url: '/explore',
  },
  {
    text: 'Learn',
    url: '/docs',
  },
];

export const Menu: FC = () => {
  const pathname = usePathname();

  return (
    <ul className="flex gap-4">
      {pages.map((page) => (
        <li
          className={
            pathname === page.url
              ? 'text-yellow-300'
              : 'text-gray-200 hover:text-white'
          }
          key={page.url}
        >
          <Link href={page.url}>{page.text}</Link>
        </li>
      ))}
    </ul>
  );
};
