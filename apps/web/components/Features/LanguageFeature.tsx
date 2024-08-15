'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from '@/components/ExternalLink';
import { AngularIcon } from '@/icons/AngularIcon';
import { AstroIcon } from '@/icons/AstroIcon';
import { FastHtmlIcon } from '@/icons/FastHtmlIcon';
import { NextIcon } from '@/icons/NextIcon';
import { NuxtIcon } from '@/icons/NuxtIcon';
import { ReactIcon } from '@/icons/ReactIcon';
import { SolidIcon } from '@/icons/SolidIcon';
import { SvelteIcon } from '@/icons/SvelteIcon';
import { ViteIcon } from '@/icons/ViteIcon';
import { VueIcon } from '@/icons/VueIcon';
import { FeatureDescription } from './FeatureDescription';
import { FeatureTitle } from './FeatureTitle';

export const LanguageFeature = () => {
  const languages = [
    {
      name: 'Next',
      icon: NextIcon,
      url: 'https://nextjs.org',
    },
    {
      name: 'Svelte',
      icon: SvelteIcon,
      url: 'https://svelte.dev',
    },
    {
      name: 'Astro',
      icon: AstroIcon,
      url: 'https://astro.build',
    },
    {
      name: 'Nuxt',
      icon: NuxtIcon,
      url: 'https://nuxt.com',
    },
    {
      name: 'Vite',
      icon: ViteIcon,
      url: 'https://vitejs.dev',
    },
    {
      name: 'React',
      icon: ReactIcon,
      url: 'https://react.dev',
    },
    {
      name: 'Vue',
      icon: VueIcon,
      url: 'https://vuejs.org',
    },
    {
      name: 'FastHTML',
      icon: FastHtmlIcon,
      url: 'https://fastht.ml',
    },
    {
      name: 'Angular',
      icon: AngularIcon,
      url: 'https://angular.dev',
    },
    {
      name: 'Solid',
      icon: SolidIcon,
      url: 'https://solidjs.com',
    },
  ];

  return (
    <div className="pb-32 px-4 mx-auto max-w-6xl">
      <FeatureTitle>Generate UIs for any framework</FeatureTitle>
      <FeatureDescription>
        SpecUI breaks down the barriers of language-specific limitations, offering you the freedom
        to generate code in the language of your choice. Use or create generators for your favorite
        frameworks.
      </FeatureDescription>
      <ul className="gap-4 gap-y-24 grid grid-cols-5">
        {languages.map((language, index) => (
          <motion.li
            className="col-span-5 flex grayscale items-center justify-center sm:col-span-2 xl:col-span-1"
            key={language.name}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index, duration: 0.15 }}
          >
            <ExternalLink
              className="flex flex-col gap-4 items-center text-gray-400 text-sm dark:text-gray-500 hover:text-black dark:hover:text-white"
              href={language.url}
            >
              <language.icon size={128} />
              <span>{language.name}</span>
            </ExternalLink>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};
