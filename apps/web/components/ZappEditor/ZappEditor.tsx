'use client';

import Editor from '@monaco-editor/react';
import nextZapp, { ISpec } from '@zappjs/next-zapp';
import { safeDump, safeLoad } from 'js-yaml';
import { FC, useCallback, useEffect, useState } from 'react';

import { EditorTreeView } from '../EditorTreeView';
import { useEditorStore } from '@/stores/editor';

type InputObject = { [key: string]: string };
type OutputObject = {
  id: string;
  name: string;
  children?: OutputObject[];
};

function transform(input: InputObject): OutputObject[] {
  const result: OutputObject[] = [];

  for (const path in input) {
    const parts = path.split('/');
    let currentLevel: OutputObject[] = result;

    parts.forEach((part, index) => {
      let existingPart = currentLevel.find((item) => item.name === part);

      if (index === parts.length - 1) {
        currentLevel.push({
          id: parts.slice(0, index + 1).join('/'),
          name: part,
        });
        return;
      }

      if (!existingPart) {
        existingPart = {
          id: parts.slice(0, index + 1).join('/'),
          name: part,
          children: [],
        };
        currentLevel.push(existingPart);
      }

      currentLevel = existingPart.children!;
    });
  }

  return result;
}

const initialSpec = {
  name: 'my-app',
  version: '1.0.0',
  description: 'this is my cool app',
  license: 'MIT' as 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT',
  auth: {
    providers: {
      github: {},
    },
  },
  calls: {
    createPost: {},
    getPost: {},
  },
  models: {
    post: {
      attributes: {
        id: {
          key: 'primary',
          type: 'number',
        },
        name: {
          unique: true,
          type: 'string',
        },
        slug: {
          unique: true,
          type: 'string',
        },
      },
    },
  },
};

export const ZappEditor: FC = () => {
  const code = useEditorStore((state) => state.code);
  const setCode = useEditorStore((state) => state.setCode);

  const setData = useEditorStore((state) => state.setData);

  const selected = useEditorStore((state) => state.selected);
  const setSelected = useEditorStore((state) => state.setSelected);

  const [value, setValue] = useState(safeDump(initialSpec));

  const handleGenerate = useCallback(async () => {
    const spec = (safeLoad(value) as ISpec) || {};

    const result = await nextZapp(spec);
    const data = transform(result);

    setCode(result);
    setData(data);
    if (!selected) {
      setSelected('README.md');
    }
  }, [setCode, setData, setSelected, selected, value]);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  return (
    <div className="flex" style={{ height: '80vh' }}>
      <div className="w-1/2">
        <Editor
          language="yaml"
          onChange={(value) => setValue(value || '')}
          options={{
            minimap: {
              enabled: false,
            },
          }}
          theme="vs-dark"
          value={value}
        />
      </div>
      <div className="w-1/2">
        <div className="flex h-full">
          <div className="w-1/3">
            <EditorTreeView />
          </div>
          <div className="w-2/3">
            <Editor
              language={
                selected.endsWith('.js')
                  ? 'javascript'
                  : selected.endsWith('.json')
                  ? 'json'
                  : selected.endsWith('.md')
                  ? 'markdown'
                  : selected.endsWith('.ts')
                  ? 'typescript'
                  : selected.endsWith('.yaml') || selected.endsWith('.yml')
                  ? 'yaml'
                  : 'text'
              }
              options={{
                minimap: {
                  enabled: false,
                },
                readOnly: true,
              }}
              theme="vs-dark"
              value={code[selected]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
