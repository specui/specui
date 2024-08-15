import { ExternalLink } from '@/components/ExternalLink';

export function Footer() {
  return (
    <footer className="border-t border-t-gray-100 justify-center p-4 text-center text-gray-700 dark:bg-black dark:border-t-gray-900 dark:dark:text-gray-500">
      Made with &hearts; by{' '}
      <ExternalLink className="text-black dark:text-white" href="https://ctate.dev">
        Chris Tate
      </ExternalLink>
    </footer>
  );
}
