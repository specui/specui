export const VanillaSpec = {
  app: {
    title: 'My App',
    name: 'my-app',
    version: '1.0.0',
    description: 'this is my cool app',
    author: {
      name: 'Super Coder',
      email: 'info@example.org',
      url: 'https://example.org/',
    },
    license: 'MIT' as 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT',
  },
  components: {
    header: {
      tag: 'header',
      style: {
        backgroundColor: 'darkgray',
      },
    },
  },
  pages: {
    index: {
      elements: [
        {
          tag: 'header',
          elements: [
            {
              tag: 'h1',
              text: 'Spec. Preview. Ship.',
              style: {
                color: 'white',
                fontFamily: 'Geist, sans-serif',
                fontSize: '2em',
                marginBottom: '.5em',
                textAlign: 'center',
              },
            },
            {
              tag: 'h2',
              text: 'Build at lightning-speed',
              style: {
                color: 'lightgray',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: 'normal',
                fontSize: '1em',
                textAlign: 'center',
              },
            },
          ],
        },
      ],
    },
  },
  styles: {
    body: {
      alignItems: 'center',
      backgroundImage: 'linear-gradient(to bottom right, orange, purple)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'sans-serif',
      height: '100%',
      justifyContent: 'center',
    },
    html: {
      height: '100%',
    },
  },
};
