import { GitHub } from '@mui/icons-material';
import { Metadata } from 'next';

import { ExternalLink } from '@/components/ExternalLink';
import { JsIcon } from '@/icons/JsIcon';
import { NextIcon } from '@/icons/NextIcon';
import { NpmIcon } from '@/icons/NpmIcon';
import { RemotionIcon } from '@/icons/RemotionIcon';

export const metadata: Metadata = {
  title: 'Generators - SpecUI',
  description: 'Build UIs with Specs',
  openGraph: {
    images: ['https://specui.org/api/og?path=/generators'],
    title: 'Generators - SpecUI',
    url: 'https://specui.org/generators',
  },
};

const generators = [
  {
    text: '@specui/next-generator',
    playgroundUrl: '/playground/next',
    githubUrl: 'https://github.com/specui/specui/tree/main/generators/next',
    npmUrl: 'https://npmjs.com/@specui/next-generator',
    icon: NextIcon,
  },
  {
    text: '@specui/remotion-generator',
    playgroundUrl: '/playground',
    githubUrl: 'https://github.com/specui/specui/tree/main/generators/remotion',
    npmUrl: 'https://npmjs.com/@specui/remotion-generator',
    icon: RemotionIcon,
  },
  {
    text: '@specui/vanilla-generator',
    playgroundUrl: '/playground',
    githubUrl: 'https://github.com/specui/specui/tree/main/generators/vanilla',
    npmUrl: 'https://npmjs.com/@specui/vanilla-generator',
    icon: JsIcon,
  },
];

export default function GeneratorsPage() {
  return (
    <div className="flex flex-col gap-8 py-8" style={{ minHeight: 'calc(100vh - 97px)' }}>
      <h1 className="flex flex-col font-bold gap-2 text-center text-4xl md:text-7xl sm:text-6xl">
        <div>Generators</div>
      </h1>
      <ul className="gap-4 grid grid-cols-2 items-center justify-center max-w-4xl mx-auto">
        {generators.map((generator) => (
          <li
            className="border border-gray-200 flex flex-col gap-4 py-4 items-center justify-center rounded-xl dark:border-gray-900"
            key={generator.text}
          >
            <h3>{generator.text}</h3>
            <generator.icon size={96} />
            <div className="flex gap-2 items-center">
              {/* <a
                className="bg-black px-4 py-2 text-xs text-white rounded-xl dark:bg-white dark:text-black"
                href={generator.playgroundUrl}
              >
                Try It Online
              </a> */}
              <ExternalLink href={generator.githubUrl}>
                <GitHub />
              </ExternalLink>
              <ExternalLink className="mt-1" href={generator.npmUrl}>
                <NpmIcon size={24} />
              </ExternalLink>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
