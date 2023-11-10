import { pathListToNodeList } from '../utils/pathListToNodeList';
import { getNodeListOutput } from '../utils/getNodeListOutput';
import { readFileSync } from 'fs';

describe('pathListToNodeList', () => {
  it('should convert an array of paths to a nested array of nodes', () => {
    const nodeList = pathListToNodeList([
      'bin/cli',
      'bin/cmd/run',
      'src/components/Header.tsx',
      'src/components/Footer.tsx',
      'src/App.ts',
      'LICENSE',
      'README.md',
    ]);

    expect(nodeList).toStrictEqual([
      {
        name: 'bin',
        type: 'folder',
        children: [
          {
            name: 'cmd',
            type: 'folder',
            children: [
              {
                name: 'run',
                type: 'file',
              },
            ],
          },
          {
            name: 'cli',
            type: 'file',
          },
        ],
      },
      {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'components',
            type: 'folder',
            children: [
              {
                name: 'Footer.tsx',
                type: 'file',
              },
              {
                name: 'Header.tsx',
                type: 'file',
              },
            ],
          },
          {
            name: 'App.ts',
            type: 'file',
          },
        ],
      },
      {
        name: 'LICENSE',
        type: 'file',
      },
      {
        name: 'README.md',
        type: 'file',
      },
    ]);

    const nodeListOutput = getNodeListOutput(nodeList);

    expect(nodeListOutput).toStrictEqual(readFileSync('./tests/data/nodeListOutput.txt', 'utf8'));
  });
});
