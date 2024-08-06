'use client';

import { WebContainer } from '@webcontainer/api';
import Editor from '@monaco-editor/react';
import nextZapp from '@specui/next-zapp/dist/generator-browser';
import NextSchema from '@specui/next-zapp/.specui/schema.json';
import vanillaZapp from '@specui/vanilla-zapp/dist/generator-browser';
import VanillaSchema from '@specui/vanilla-zapp/.specui/schema.json';
import axios from 'axios';
import clsx from 'clsx';
import { safeDump, safeLoad } from 'js-yaml';
import { configureMonacoYaml } from 'monaco-yaml';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { EditorTreeView } from '@/components/EditorTreeView';
import { SpecEditor } from '@/components/SpecEditor/SpecEditor';
import { useEditorStore } from '@/stores/editor';
// import { useSpecStore } from '@/stores/spec';
import { buildFileSystemTree } from '@/utils/buildFileSystemTree';
import { VanillaSpec } from '@/specs/VanillaSpec';
import { NextSpec } from '@/specs/NextSpec';
import { getEditorLanguage } from '@/utils/getEditorLanguage';
import { transform } from '@/utils/transform';

export interface PlaygroundProps {
  generator: 'vanilla' | 'next';
}

export const Playground: FC<PlaygroundProps> = ({ generator }) => {
  // const spec = useSpecStore((state) => state.spec);
  // const setSpec = useSpecStore((state) => state.setSpec);

  const code = useEditorStore((state) => state.code);
  const setCode = useEditorStore((state) => state.setCode);

  const setData = useEditorStore((state) => state.setData);

  const selected = useEditorStore((state) => state.selected);
  const setSelected = useEditorStore((state) => state.setSelected);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // const value = useMemo(() => {
  //   return '# yaml-language-server: $schema=/schemas/next-zapp-schema.json\n' + safeDump(spec);
  // }, [spec]);

  const editorLanguage = useMemo(() => getEditorLanguage(selected), [selected]);

  const emulator = useRef<any>();
  const [editor, setEditor] = useState<'visual' | 'yaml'>('yaml');
  const [output, setOutput] = useState<'preview' | 'code'>('preview');
  const [value, setValue] = useState('');

  const handleGenerate = useCallback(async () => {
    const result =
      generator === 'next'
        ? await nextZapp(safeLoad(value || '') as any)
        : await vanillaZapp(safeLoad(value || '') as any);
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
  }, [generator, setCode, setData, setSelected, selected, value]);

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
      setValue(
        '# yaml-language-server: $schema=/schemas/vanilla-zapp-schema.json\n' +
          safeDump(VanillaSpec),
      );
    } else {
      setValue(
        '# yaml-language-server: $schema=/schemas/next-zapp-schema.json\n' + safeDump(NextSpec),
      );
    }
  }, [generator]);

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
            onChange={(value) => setValue(value || '')}
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
                    schema: (generator === 'next'
                      ? NextSchema.definitions.ISpec
                      : VanillaSchema) as any,
                    uri:
                      generator === 'next'
                        ? '/schemas/next-zapp-schema.json'
                        : '/schemas/vanilla-zapp-schema.json',
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
                  language={editorLanguage}
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
