'use client';

import { WebContainer } from '@webcontainer/api';
import Editor from '@monaco-editor/react';
import nextGenerator from '@specui/next-generator/dist/generator-browser';
import NextSchema from '@specui/next-generator/.specui/schema.json';
import vanillaGenerator from '@specui/vanilla-generator/dist/generator-browser';
import VanillaSchema from '@specui/vanilla-generator/.specui/schema.json';
import axios from 'axios';
import clsx from 'clsx';
import { safeDump, safeLoad } from 'js-yaml';
import { configureMonacoYaml } from 'monaco-yaml';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Convert from 'ansi-to-html';

import { EditorTreeView } from '@/components/EditorTreeView';
import { SpecEditor } from '@/components/SpecEditor/SpecEditor';
import { useEditorStore } from '@/stores/editor';
// import { useSpecStore } from '@/stores/spec';
import { buildFileSystemTree } from '@/utils/buildFileSystemTree';
import cn from '@/utils/cn';
import { VanillaSpec } from '@/specs/VanillaSpec';
import { NextSpec } from '@/specs/NextSpec';
import { getEditorLanguage } from '@/utils/getEditorLanguage';
import { transform } from '@/utils/transform';

export interface PlaygroundProps {
  generator: 'vanilla' | 'next';
}

const ansi = new Convert({
  fg: 'rgb(var(--foreground-rgb))',
});

export const Playground: FC<PlaygroundProps> = ({ generator }) => {
  // const spec = useSpecStore((state) => state.spec);
  // const setSpec = useSpecStore((state) => state.setSpec);

  const code = useEditorStore((state) => state.code);
  const setCode = useEditorStore((state) => state.setCode);

  const setData = useEditorStore((state) => state.setData);

  const selected = useEditorStore((state) => state.selected);
  const setSelected = useEditorStore((state) => state.setSelected);

  const bootRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // const value = useMemo(() => {
  //   return '# yaml-language-server: $schema=/schemas/next-generator-schema.json\n' + safeDump(spec);
  // }, [spec]);

  const editorLanguage = useMemo(() => getEditorLanguage(selected), [selected]);

  const emulator = useRef<any>();
  const [editor, setEditor] = useState<'visual' | 'yaml'>('yaml');
  const [isBootingUp, setIsBootingUp] = useState(false);
  const [log, setLog] = useState('');
  const [output, setOutput] = useState<'preview' | 'code'>('preview');
  const [theme, setTheme] = useState('');
  const [webcontainerInstance, setWebcontainerInstance] = useState<WebContainer>();
  const [value, setValue] = useState('');

  const handleGenerate = useCallback(async () => {
    try {
      const spec = safeLoad(value || '') as any;

      const result =
        generator === 'next' ? await nextGenerator(spec) : await vanillaGenerator(spec);
      const data = transform(result);

      if (process.env.NEXT_PUBLIC_SPECUI_LIVE_API) {
        axios({
          method: 'POST',
          url: `${process.env.NEXT_PUBLIC_SPECUI_LIVE_API}/update`,
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
    } catch (error) {
      console.error(error);
    }
  }, [generator, setCode, setData, setSelected, selected, value]);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  async function init(code: any) {
    if (!iframeRef.current || !Object.keys(code).length || emulator.current) {
      return;
    }

    emulator.current = true;

    setIsBootingUp(true);

    const webcontainerInstance = await WebContainer.boot();
    await webcontainerInstance.mount(buildFileSystemTree(code));

    const installProcess = await webcontainerInstance.spawn('npm', ['install', '--no-progress']);
    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          setLog((current) => current.concat(ansi.toHtml(data)));
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
          setLog((current) => {
            if (data.includes('Compiled ')) {
              setIsBootingUp(false);
              setWebcontainerInstance(webcontainerInstance);
            }
            return current.concat(ansi.toHtml(data));
          });
        },
      }),
    );

    webcontainerInstance.on('server-ready', (port, url) => {
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
      iframeRef.current.contentWindow?.document.write(
        `<style type="text/css">${code['style.css'] as string}</style>`,
      );
      iframeRef.current.contentWindow?.document.close();
    } else {
      init(code);
    }
  }, [generator, iframeRef, output, code]);

  useMemo(() => {
    if (generator === 'vanilla') {
      setValue(
        '# yaml-language-server: $schema=/schemas/vanilla-generator-schema.json\n' +
          safeDump(VanillaSpec),
      );
    } else {
      setValue(
        '# yaml-language-server: $schema=/schemas/next-generator-schema.json\n' +
          safeDump(NextSpec),
      );
    }
  }, [generator]);

  useEffect(() => {
    if (!bootRef.current) {
      return;
    }
    bootRef.current.scrollTo(0, bootRef.current.scrollHeight);
  }, [log]);

  useEffect(() => {
    if (!webcontainerInstance) {
      return;
    }

    async function update() {
      await webcontainerInstance!.mount(buildFileSystemTree(code as any));
    }

    update();
  }, [code, webcontainerInstance]);

  useEffect(() => {
    const updateTheme = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'my-dark-theme' : 'my-light-theme');
    };

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(prefersDarkScheme.matches ? 'my-dark-theme' : 'my-light-theme');

    prefersDarkScheme.addEventListener('change', updateTheme);

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

    return () => {
      prefersDarkScheme.removeEventListener('change', updateTheme);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row" style={{ height: '100%' }}>
      <div className="border-r border-r-gray-200 divide-red-200 h-1/2 relative w-full md:h-full md:w-1/2 dark:border-r-gray-900">
        {editor === 'yaml' && theme && (
          <Editor
            language="yaml"
            onChange={(value) => setValue(value || '')}
            beforeMount={(monaco) => {
              monaco.editor.defineTheme('my-light-theme', {
                base: 'vs',
                inherit: true,
                rules: [],
                colors: {
                  'editor.background': '#FFFFFF',
                },
              });

              monaco.editor.defineTheme('my-dark-theme', {
                base: 'vs-dark',
                inherit: true,
                rules: [],
                colors: {
                  'editor.background': '#000000',
                },
              });
            }}
            onMount={(_, monaco) => {
              configureMonacoYaml(monaco, {
                enableSchemaRequest: true,
                schemas: [
                  {
                    fileMatch: [],
                    schema: (generator === 'next'
                      ? NextSchema.definitions.ISpec
                      : VanillaSchema) as any,
                    uri:
                      generator === 'next'
                        ? '/schemas/next-generator-schema.json'
                        : '/schemas/vanilla-generator-schema.json',
                  },
                ],
              });
            }}
            options={{
              fontFamily: 'var(--font-geist-mono)',
              fontWeight: '200',
              minimap: {
                enabled: false,
              },
            }}
            theme={theme}
            value={value}
          />
        )}
        {editor === 'visual' && <SpecEditor />}
        {/* <div className="absolute bg-slate-800 p-1 bottom-4 rounded-lg right-6">
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
        </div> */}
      </div>
      <div className="h-1/2 w-full md:h-full md:w-1/2">
        <div className="flex h-full">
          {output === 'preview' && (
            <>
              {isBootingUp && (
                <div className="h-full overflow-scroll w-full" ref={bootRef}>
                  <div className="font-mono text-xs">
                    <div>Booting...</div>
                    <pre dangerouslySetInnerHTML={{ __html: log }} />
                  </div>
                </div>
              )}

              <iframe
                className={cn('hidden w-full', {
                  block: !isBootingUp,
                })}
                ref={iframeRef}
                title="Code preview using Vanilla code generator"
              />
            </>
          )}
          {output === 'code' && (
            <>
              <div className="border-r border-r-gray-200 w-1/3 dark:border-r-gray-900">
                <EditorTreeView />
              </div>
              <div className="w-2/3">
                <Editor
                  beforeMount={(monaco) => {
                    monaco.editor.defineTheme('my-light-theme', {
                      base: 'vs',
                      inherit: true,
                      rules: [],
                      colors: {
                        'editor.background': '#FFFFFF',
                      },
                    });

                    monaco.editor.defineTheme('my-dark-theme', {
                      base: 'vs-dark',
                      inherit: true,
                      rules: [],
                      colors: {
                        'editor.background': '#000000',
                      },
                    });

                    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                      jsx: monaco.languages.typescript.JsxEmit.React,
                      addExtraLib: true,
                      noSemanticValidation: false,
                      noSyntaxValidation: false,
                    });
                  }}
                  language={editorLanguage}
                  options={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontWeight: '200',
                    minimap: {
                      enabled: false,
                    },
                    readOnly: true,
                  }}
                  theme={theme}
                  value={code[selected] as string}
                />
              </div>
            </>
          )}
        </div>
        <div className="absolute bg-slate-800 p-1 bottom-4 rounded-lg right-6">
          <button
            className={clsx('px-2 rounded-lg text-white', { 'bg-slate-700': output === 'preview' })}
            onClick={() => setOutput('preview')}
          >
            Preview
          </button>
          <button
            className={clsx('px-2 rounded-lg text-white', { 'bg-slate-700': output === 'code' })}
            onClick={() => setOutput('code')}
          >
            Code
          </button>
        </div>
      </div>
    </div>
  );
};
