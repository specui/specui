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

  spec: {},
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
