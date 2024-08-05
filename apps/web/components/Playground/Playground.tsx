'use client';

import { WebContainer } from '@webcontainer/api';
import Editor from '@monaco-editor/react';
import nextZapp from '@specui/next-zapp/dist/generator-browser';
import vanillaZapp from '@specui/vanilla-zapp/dist/generator-browser';
import axios from 'axios';
import clsx from 'clsx';
import { safeDump, safeLoad } from 'js-yaml';
import { configureMonacoYaml } from 'monaco-yaml';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { EditorTreeView } from '@/components/EditorTreeView';
import { SpecEditor } from '@/components/SpecEditor/SpecEditor';
import { useEditorStore } from '@/stores/editor';
import { useSpecStore } from '@/stores/spec';
import { buildFileSystemTree } from '@/utils/buildFileSystemTree';

type InputObject = { [key: string]: Buffer | string };
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

export interface PlaygroundProps {
  generator: 'vanilla' | 'next';
}

export const Playground: FC<PlaygroundProps> = ({ generator }) => {
  const spec = useSpecStore((state) => state.spec);
  const setSpec = useSpecStore((state) => state.setSpec);

  const code = useEditorStore((state) => state.code);
  const setCode = useEditorStore((state) => state.setCode);

  const setData = useEditorStore((state) => state.setData);

  const selected = useEditorStore((state) => state.selected);
  const setSelected = useEditorStore((state) => state.setSelected);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const value = useMemo(() => {
    return '# yaml-language-server: $schema=/schemas/next-zapp-schema.json\n' + safeDump(spec);
  }, [spec]);

  const emulator = useRef<any>();
  const [editor, setEditor] = useState<'visual' | 'yaml'>('visual');
  const [output, setOutput] = useState<'preview' | 'code'>('preview');

  const handleGenerate = useCallback(async () => {
    const result =
      generator === 'next' ? await nextZapp(spec as any) : await vanillaZapp(spec as any);
    const data = transform(result);

    if (process.env.NEXT_PUBLIC_ZAPP_LIVE_API) {
      axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_ZAPP_LIVE_API}/update`,
        data: {
          files: result,
        },
      });
    }

    setCode(result);
    setData(data);
    if (!selected) {
      if (generator === 'vanilla') {
        setSelected('index.html');
      } else {
        setSelected('README.md');
      }
    }
  }, [generator, setCode, setData, setSelected, selected, spec]);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  async function init(code: any) {
    if (!iframeRef.current || !Object.keys(code).length || emulator.current) {
      return;
    }

    emulator.current = true;

    const webcontainerInstance = await WebContainer.boot();
    await webcontainerInstance.mount(buildFileSystemTree(code));

    const installProcess = await webcontainerInstance.spawn('npm', ['install']);
    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data);
        },
      }),
    );

    const installExitCode = await installProcess.exit;

    if (installExitCode !== 0) {
      throw new Error('Unable to run npm install');
    }

    const devProcess = await webcontainerInstance.spawn('npm', ['run', 'dev'], {
      env: {
        NEXT_DISABLE_SWC_WASM: 'true',
      },
    });
    devProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data);
        },
      }),
    );

    webcontainerInstance.on('server-ready', (port, url) => {
      console.log(port);
      console.log(url);
      iframeRef.current!.src = url;
    });
  }

  useEffect(() => {
    if (!iframeRef.current) {
      return;
    }

    if (generator === 'vanilla') {
      iframeRef.current.contentWindow?.document.open();
      iframeRef.current.contentWindow?.document.write(code['index.html'] as string);
      iframeRef.current.contentWindow?.document.close();
    } else {
      init(code);
    }
  }, [generator, iframeRef, output, code]);

  useMemo(() => {
    if (generator === 'vanilla') {
      setSpec({
        app: {
          title: 'Zapp',
          name: 'my-app',
          version: '1.0.0',
          description: 'this is my cool app',
          author: {
            name: 'Super Coder',
            email: 'info@example.org',
            url: 'https://example.org/',
          },
          license: 'MIT' as 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT',
        },
        components: {
          header: {
            type: 'header',
            style: {
              backgroundColor: 'darkgray',
            },
          },
        },
        pages: {
          index: {
            elements: [
              {
                type: 'component',
                component: 'header',
              },
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
        styles: {
          body: {
            alignItems: 'center',
            backgroundColor: 'black',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'sans-serif',
            height: '100%',
            justifyContent: 'center',
          },
          html: {
            height: '100%',
          },
        },
      });
    } else {
      setSpec({
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
      });
    }
  }, [generator, setSpec]);

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
    <div className="bg-gray-900 flex flex-col md:flex-row" style={{ height: '100%' }}>
      <div className="border-r border-r-gray-950 h-1/2 relative w-full md:h-full md:w-1/2">
        {editor === 'yaml' && (
          <Editor
            language="yaml"
            onChange={(value) => setSpec(safeLoad(value || '') as any)}
            beforeMount={(monaco) => {
              monaco.editor.defineTheme('my-theme', {
                base: 'vs-dark',
                inherit: true,
                rules: [],
                colors: {
                  'editor.background': '#111827',
                },
              });
            }}
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
            theme="my-theme"
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
      <div className="h-1/2 w-full md:h-full md:w-1/2">
        <div className="flex h-full">
          {output === 'preview' ? (
            <iframe
              className="w-full"
              ref={iframeRef}
              title="Code preview using Vanilla code generator"
            />
          ) : (
            <>
              <div className="border-r border-r-gray-950 w-1/3">
                <EditorTreeView />
              </div>
              <div className="w-2/3">
                <Editor
                  beforeMount={(monaco) => {
                    monaco.editor.defineTheme('my-theme', {
                      base: 'vs-dark',
                      inherit: true,
                      rules: [],
                      colors: {
                        'editor.background': '#111827',
                      },
                    });
                  }}
                  language={
                    selected.endsWith('.css')
                      ? 'css'
                      : selected.endsWith('.gitignore')
                      ? 'shell'
                      : selected.endsWith('.html')
                      ? 'html'
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
                  theme="my-theme"
                  value={code[selected] as string}
                />
              </div>
            </>
          )}
        </div>
        <div className="absolute bg-slate-800 p-1 bottom-4 rounded-lg right-6">
          <button
            className={clsx('px-2 rounded-lg', { 'bg-slate-700': output === 'preview' })}
            onClick={() => setOutput('preview')}
          >
            Preview
          </button>
          <button
            className={clsx('px-2 rounded-lg', { 'bg-slate-700': output === 'code' })}
            onClick={() => setOutput('code')}
          >
            Code
          </button>
        </div>
      </div>
    </div>
  );
};
