import type { License } from '@specui/next-generator/dist/interfaces/ISpec';

export const NextSpec = {
  title: 'My App',
  name: 'my-app',
  version: '1.0.0',
  description: 'this is my cool app',
  license: 'MIT' as License,
  pages: {
    index: {
      elements: [
        {
          tag: 'section',
          class: ['flex', 'flex-col', 'h-dvh', 'items-center', 'justify-center'],
          elements: [
            {
              tag: 'h1',
              text: 'Spec. Preview. Ship.',
              class: ['font-sans', 'mb-2', 'text-2xl', 'text-center'],
              initial: {
                opacity: 0,
                translateY: 200,
              },
              animate: {
                opacity: 1,
                translateY: 0,
              },
              transition: {
                duration: 0.2,
              },
            },
            {
              tag: 'h2',
              text: 'Build at lightning-speed',
              class: ['font-sans-serif', 'font-lg', 'text-center', 'text-gray-400'],
              initial: {
                opacity: 0,
              },
              animate: {
                opacity: 1,
              },
              transition: {
                delay: 0.25,
                duration: 0.5,
              },
            },
          ],
        },
      ],
    },
  },
};
