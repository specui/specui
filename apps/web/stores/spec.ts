import { renameKey } from '@/utils/renameKey';
import { setNested } from '@/utils/setNested';
import { StateCreator, create } from 'zustand';

type AppState = SpecState;

export interface SpecState {
  focused: string;
  setFocused: (focused: string) => void;

  selected: string;
  setSelected: (selected: string) => void;

  spec: object;
  setSpec: (spec: object) => void;

  init: () => Promise<void>;
  reset: () => void;
  updateKey: (oldPath: (number | string)[], newKey: string) => object;
  updateValue: (path: (number | string)[], value?: string) => object;
}

export const createSpecSlice: StateCreator<SpecState> = (set, get) => ({
  focused: '',
  setFocused: (focused) => set({ focused }),

  selected: '/',
  setSelected: (selected) => set({ selected }),

  spec: {
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
  },
  setSpec: (spec) => set(() => ({ spec })),

  init: async () => {},

  reset: () => {
    set({ spec: {} });
  },

  updateKey: (oldPath, newKey) => {
    const spec = JSON.parse(JSON.stringify(get().spec));

    renameKey(spec, oldPath, newKey);

    set({ spec });

    return spec;
  },

  updateValue: (path, value) => {
    const spec = JSON.parse(JSON.stringify(get().spec));

    setNested(spec, path, value);

    set({ spec });

    return spec;
  },
});

export const useSpecStore = create<AppState>()((...args) => ({
  ...createSpecSlice(...args),
}));
