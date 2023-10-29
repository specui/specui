'use client';

import Editor from '@monaco-editor/react';
import { generate } from '@zappjs/core';
import { GitignoreGenerator } from '@zappjs/git';
import { LicenseGenerator } from '@zappjs/license';
import { safeDump, safeLoad } from 'js-yaml';
import { FC, useCallback, useEffect, useState } from 'react';

import { EditorTreeView } from '../EditorTreeView';
import { useEditorStore } from '@/stores/editor';

const initialSpec = {
  name: 'my-app',
  version: '1.0.0',
  description: 'this is my cool app',
  license: 'MIT' as 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT',
  auth: {
    provider: {
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

  const [value, setValue] = useState(safeDump(initialSpec));

  const handleGenerate = useCallback(async () => {
    const spec =
      (safeLoad(value) as {
        name: string;
        description: string;
        license: 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT';
      }) || {};

    const output = await generate({
      engine: async () => {
        return `# ${spec.name}\n\n>${spec.description}`;
      },
    });

    const gitignore = await GitignoreGenerator(['node_modules/']);
    const license = await LicenseGenerator(spec);

    setCode({
      '.gitignore': gitignore,
      LICENSE: license,
      'README.md': output,
    });
    setData([
      {
        id: '.gitignore',
        name: '.gitignore',
      },
      {
        id: 'LICENSE',
        name: 'LICENSE',
      },
      {
        id: 'README.md',
        name: 'README.md',
      },
    ]);
  }, [value]);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  return (
    <div className="flex">
      <div className="h-80 w-1/2">
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
      <div className="h-80 w-1/2">
        <div className="flex h-full">
          <div className="w-1/4">
            <EditorTreeView />
          </div>
          <div className="w-3/4">
            <Editor
              language="yaml"
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
