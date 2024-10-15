import { StateCreator, create } from 'zustand';

type AppState = EditorState;

export interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}

type Code = {
  [file: string]: Buffer | string;
};

export interface EditorState {
  code: Code;
  setCode: (code: Code) => void;

  data: RenderTree[];
  setData: (data: RenderTree[]) => void;

  expanded: string[];
  setExpanded: (expanded: string[]) => void;

  selected: string;
  setSelected: (selected: string) => void;

  init: () => Promise<void>;
  reset: () => void;
}

export const createEditorSlice: StateCreator<EditorState> = (set) => ({
  code: {},
  setCode: (code) => set(() => ({ code })),

  data: [],
  setData: (data) => set(() => ({ data })),

  expanded: [],
  setExpanded: (expanded) => set(() => ({ expanded })),

  selected: '',
  setSelected: (selected) => set(() => ({ selected })),

  init: async () => {},

  reset: () => {
    set({ code: {}, data: [], selected: '' });
  },
});

export const useEditorStore = create<AppState>()((...args) => ({
  ...createEditorSlice(...args),
}));
