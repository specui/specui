'use client';

import Editor from '@monaco-editor/react';
import nextZapp, { ISpec } from '@zappjs/next-zapp/dist/zapp-browser';
import { safeDump, safeLoad } from 'js-yaml';
import { configureMonacoYaml } from 'monaco-yaml';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { EditorTreeView } from '../EditorTreeView';
import { useEditorStore } from '@/stores/editor';
import { SpecEditor } from '../SpecEditor/SpecEditor';
import { useSpecStore } from '@/stores/spec';
import clsx from 'clsx';

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

export const ZappEditor: FC = () => {
  const spec = useSpecStore((state) => state.spec);
  const setSpec = useSpecStore((state) => state.setSpec);

  const code = useEditorStore((state) => state.code);
  const setCode = useEditorStore((state) => state.setCode);

  const setData = useEditorStore((state) => state.setData);

  const selected = useEditorStore((state) => state.selected);
  const setSelected = useEditorStore((state) => state.setSelected);

  const value = useMemo(() => {
    return '# yaml-language-server: $schema=/schemas/next-zapp-schema.json\n' + safeDump(spec);
  }, [spec]);

  const [editor, setEditor] = useState<'visual' | 'yaml'>('visual');

  const handleGenerate = useCallback(async () => {
    const result = await nextZapp(spec as any);
    const data = transform(result);

    setCode(result);
    setData(data);
    if (!selected) {
      setSelected('README.md');
    }
  }, [setCode, setData, setSelected, selected, spec]);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  useEffect(() => {
    window.MonacoEnvironment = {
      getWorker(_, label) {
        switch (label) {
          case 'editorWorkerService':
            return new Worker(
              new URL('monaco-editor/esm/vs/editor/editor.worker', import.meta.url),
            );
          case 'css':
          case 'less':
          case 'scss':
            return new Worker(
              new URL('monaco-editor/esm/vs/language/css/css.worker', import.meta.url),
            );
          case 'handlebars':
          case 'html':
          case 'razor':
            return new Worker(
              new URL('monaco-editor/esm/vs/language/html/html.worker', import.meta.url),
            );
          case 'json':
            return new Worker(
              new URL('monaco-editor/esm/vs/language/json/json.worker', import.meta.url),
            );
          case 'javascript':
          case 'typescript':
            return new Worker(
              new URL('monaco-editor/esm/vs/language/typescript/ts.worker', import.meta.url),
            );
          case 'yaml':
            return new Worker(new URL('monaco-yaml/yaml.worker', import.meta.url));
          default:
            throw new Error(`Unknown label ${label}`);
        }
      },
    };
  }, []);

  return (
    <div className="flex" style={{ height: '100%' }}>
      <div className="relative w-1/2">
        {editor === 'yaml' && (
          <Editor
            language="yaml"
            onChange={(value) => setSpec(safeLoad(value || '') as any)}
            onMount={(_, monaco) => {
              configureMonacoYaml(monaco, {
                enableSchemaRequest: true,
                schemas: [
                  {
                    fileMatch: [],
                    schema: {
                      type: 'object',
                      additionalProperties: false,
                      properties: {
                        name: {
                          description: 'the name of the api',
                          type: 'string',
                        },
                        version: {
                          description: 'the api version',
                          type: 'string',
                        },
                        description: {
                          description: 'a description of the api',
                          type: 'string',
                        },
                        license: {
                          description: 'the license type',
                          enum: ['Apache-2.0', 'GPL-2.0-only', 'GPL-3.0-only', 'ISC', 'MIT'],
                          type: 'string',
                        },
                        author: {
                          description: 'the author',
                          type: 'object',
                          properties: {
                            name: {
                              type: 'string',
                            },
                            email: {
                              type: 'string',
                            },
                            url: {
                              type: 'string',
                            },
                          },
                        },
                        ignore: {
                          type: 'array',
                          items: {
                            type: 'string',
                          },
                        },
                        auth: {
                          type: 'object',
                          properties: {
                            providers: {
                              type: 'array',
                              items: {
                                enum: ['facebook', 'github', 'google'],
                                type: 'string',
                              },
                            },
                          },
                        },
                        calls: {
                          type: 'object',
                          additionalProperties: {
                            type: 'object',
                            additionalProperties: false,
                            properties: {
                              request: {
                                type: 'object',
                                additionalProperties: {
                                  type: 'object',
                                  additionalProperties: false,
                                  properties: {
                                    required: {
                                      type: 'boolean',
                                    },
                                    type: {
                                      enum: ['number', 'string'],
                                    },
                                  },
                                },
                              },
                              response: {
                                type: 'object',
                                additionalProperties: {
                                  type: 'object',
                                  additionalProperties: false,
                                  properties: {
                                    required: {
                                      type: 'boolean',
                                    },
                                    type: {
                                      enum: ['number', 'string'],
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                        models: {
                          type: 'object',
                          additionalProperties: {
                            type: 'object',
                            properties: {
                              attributes: {
                                type: 'object',
                                additionalProperties: {
                                  type: 'object',
                                  properties: {
                                    key: {
                                      enum: ['primary'],
                                      type: 'string',
                                    },
                                    type: {
                                      enum: ['boolean', 'number', 'string'],
                                      type: 'string',
                                    },
                                    unique: {
                                      type: 'boolean',
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    uri: '/schemas/next-zapp-schema.json',
                  },
                ],
              });
            }}
            options={{
              minimap: {
                enabled: false,
              },
            }}
            theme="vs-dark"
            value={value}
          />
        )}
        {editor === 'visual' && <SpecEditor />}
        <div className="absolute bg-slate-800 p-1 bottom-4 rounded-lg right-6">
          <button
            className={clsx('px-2 rounded-lg', { 'bg-slate-700': editor === 'visual' })}
            onClick={() => setEditor('visual')}
          >
            Visual
          </button>
          <button
            className={clsx('px-2 rounded-lg', { 'bg-slate-700': editor === 'yaml' })}
            onClick={() => setEditor('yaml')}
          >
            YAML
          </button>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex h-full">
          <div className="w-1/3">
            <EditorTreeView />
          </div>
          <div className="w-2/3">
            <Editor
              language={
                selected.endsWith('.css')
                  ? 'css'
                  : selected.endsWith('.gitignore')
                  ? 'shell'
                  : selected.endsWith('.js')
                  ? 'javascript'
                  : selected.endsWith('.json')
                  ? 'json'
                  : selected.endsWith('.md')
                  ? 'markdown'
                  : selected.endsWith('.sass')
                  ? 'sass'
                  : selected.endsWith('.scss')
                  ? 'scss'
                  : selected.endsWith('.svg')
                  ? 'xml'
                  : selected.endsWith('.ts') || selected.endsWith('.tsx')
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
