export const NextSpec = {
  title: 'My App',
  name: 'my-app',
  version: '1.0.0',
  description: 'this is my cool app',
  license: 'MIT' as 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT',
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
            },
            {
              tag: 'h2',
              text: 'Build at lightning-speed',
              class: ['font-sans-serif', 'font-lg', 'text-center', 'text-gray-400'],
            },
          ],
        },
      ],
    },
  },
};
