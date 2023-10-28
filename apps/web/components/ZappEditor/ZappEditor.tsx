'use client';

import { FC } from 'react';
import Editor from '@monaco-editor/react';
import generate from '@zappjs/next-zapp';

export const ZappEditor: FC = () => {
  console.log(
    generate({
      name: 'test',
      calls: {},
      description: 'this is a test',
      license: 'MIT',
      models: {},
      version: '1.0.0',
    }),
  );

  return (
    <div style={{ height: '400px' }}>
      <Editor
        language="yaml"
        options={{
          minimap: {
            enabled: false,
          },
        }}
        value="name: test"
      />
    </div>
  );
};
