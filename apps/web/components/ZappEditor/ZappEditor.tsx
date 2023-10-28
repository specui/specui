'use client';

import { safeDump, safeLoad } from 'js-yaml';
import { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import {
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import { generate } from '@zappjs/core';

const initialSpec = {
  name: 'my-app',
  version: '1.0.0',
  description: 'this is my cool app',
  license: 'MIT',
};

interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}

export const ZappEditor: FC = () => {
  const [code, setCode] = useState<{
    [file: string]: string;
  }>({});
  const [value, setValue] = useState(safeDump(initialSpec));

  const [data, setData] = useState<RenderTree[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>('');

  const handleGenerate = useCallback(async () => {
    const spec =
      (safeLoad(value) as {
        name: string;
        description: string;
      }) || {};

    const output = await generate({
      engine: async () => {
        return `# ${spec.name}\n\n>${spec.description}`;
      },
    });

    setCode({
      LICENSE: 'Copyright',
      'README.md': output,
    });
    setData([
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

  const handleToggle = (_: SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (_: SyntheticEvent, nodeId: string) => {
    setSelected(nodeId);
  };

  const renderTree = (nodes: RenderTree[]) => {
    return (
      <>
        {nodes.map((node) => (
          <TreeItem key={node.id} nodeId={node.id} label={node.name}>
            {Array.isArray(node.children) ? node.children.map((node) => renderTree(node)) : null}
          </TreeItem>
        ))}
      </>
    );
  };

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
            <TreeView
              aria-label="controlled"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              expanded={expanded}
              selected={selected}
              onNodeToggle={handleToggle}
              onNodeSelect={handleSelect}
            >
              {renderTree(data)}
            </TreeView>
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
