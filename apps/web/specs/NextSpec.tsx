export const NextSpec = {
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
  auth: {
    providers: ['facebook', 'github', 'google'],
  },
  calls: {
    createPost: {
      request: {
        title: {
          required: true,
          type: 'string',
        },
        summary: {
          type: 'string',
        },
        content: {
          required: true,
          type: 'string',
        },
      },
      response: {
        id: {
          required: true,
          type: 'number',
        },
      },
    },
    getPost: {
      request: {
        id: {
          type: 'number',
        },
      },
      response: {
        id: {
          required: true,
          type: 'number',
        },
        title: {
          required: true,
          type: 'string',
        },
        summary: {
          type: 'string',
        },
        content: {
          required: true,
          type: 'string',
        },
      },
    },
  },
  models: {
    comment: {
      attributes: {
        content: {
          type: 'string',
        },
        postId: {
          type: 'number',
        },
        userId: {
          unique: true,
          type: 'string',
        },
      },
    },
    post: {
      attributes: {
        id: {
          key: 'primary',
          type: 'number',
        },
        title: {
          unique: true,
          type: 'string',
        },
        summary: {
          type: 'string',
        },
        content: {
          type: 'string',
        },
        slug: {
          unique: true,
          type: 'string',
        },
      },
    },
    user: {
      attributes: {
        id: {
          key: 'primary',
          type: 'number',
        },
        username: {
          type: 'string',
          unique: true,
        },
        socialId: {
          type: 'number',
        },
        source: {
          type: 'string',
        },
      },
    },
  },
  pages: {
    index: {
      components: [
        {
          type: 'h1',
          text: 'Spec. Preview. Ship.',
          style: {
            color: 'white',
            fontFamily: 'Georgia, serif',
            fontSize: '2em',
            marginBottom: '.5em',
            textAlign: 'center',
          },
        },
        {
          type: 'h2',
          text: 'Build at lightning-speed',
          style: {
            color: 'gray',
            fontFamily: 'Verdana, sans-serif',
            fontSize: '1em',
            textAlign: 'center',
          },
        },
      ],
    },
  },
};