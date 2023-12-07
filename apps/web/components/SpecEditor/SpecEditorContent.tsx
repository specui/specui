import clsx from 'clsx';
import { FC, useMemo, useState } from 'react';

import { useSpecStore } from '@/stores/spec';
import { getNested } from '@/utils/getNested';

type SpecItemPath = (number | string)[];
type SpecItemType = 'array' | 'boolean' | 'object' | 'number' | 'string';

interface SpecItem {
  items?: SpecItem[];
  key: string;
  parent?: {
    path: SpecItemPath;
    type: SpecItemType;
  };
  path: SpecItemPath;
  type: SpecItemType;
  value?: boolean | number | string;
}

export const SpecEditorContent: FC = () => {
  const selected = useSpecStore((state) => state.selected);
  const spec = useSpecStore((state) => state.spec);

  const focused = useSpecStore((state) => state.focused);
  const setFocused = useSpecStore((state) => state.setFocused);

  const updateKey = useSpecStore((state) => state.updateKey);
  const updateValue = useSpecStore((state) => state.updateValue);

  const [value, setValue] = useState('');

  const specItems = useMemo<SpecItem[]>(() => {
    const parse = (
      spec: object,
      parent?: {
        path: SpecItemPath;
        type: SpecItemType;
      },
    ): SpecItem[] => {
      return Object.entries(spec).map(([key, spec]) => {
        const path = (parent?.path || []).concat(key);
        const type = Array.isArray(spec) ? 'array' : (typeof spec as SpecItemType);
        return {
          path,
          key,
          type,
          value: ['boolean', 'number', 'string'].includes(typeof spec) ? spec : undefined,
          items:
            typeof spec === 'object'
              ? parse(spec, {
                  path,
                  type,
                })
              : undefined,
          parent,
        };
      });
    };

    return parse(
      selected === '/' ? spec : (getNested(spec, selected.slice(1).split('/')) as any),
      selected !== '/'
        ? {
            path: selected.slice(1).split('/'),
            type: 'object',
          }
        : undefined,
    );
  }, [selected, spec]);

  const render = (items: SpecItem[], indent = 0) => {
    return items.map((specItem) => (
      <li className="grid grid-cols-2" key={specItem.key} title={`/${specItem.path.join('/')}`}>
        {specItem.parent?.type === 'array' ? (
          <div
            className="bg-gray-900 col-span-1 font-mono outline-none p-1 text-gray-600"
            style={{ paddingLeft: `${indent}rem`, marginRight: `${-indent}rem` }}
          >
            {specItem.key}
          </div>
        ) : (
          <input
            className="bg-gray-900 col-span-1 font-bold outline-none p-1 text-gray-300"
            onBlur={() => {
              updateKey(specItem.path, value);

              setFocused('');
              setValue('');
            }}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => {
              setFocused(`key:${specItem.path}`);
              setValue(specItem.key);
            }}
            onKeyDown={(e) => e.key === 'Enter' && updateKey(specItem.path, value)}
            style={{ paddingLeft: `${indent}rem`, marginRight: `${-indent}rem` }}
            value={focused === `key:${specItem.path}` ? value : specItem.key}
          />
        )}
        {specItem.value === undefined ? (
          <div className="bg-gray-900 col-span-1 p-1" />
        ) : (
          <input
            className={clsx('bg-gray-900 col-span-1 outline-none p-1', {
              'text-blue-600': specItem.type === 'boolean',
              'text-red-600': specItem.type === 'number',
              'text-green-600': specItem.type === 'string',
            })}
            onBlur={() => {
              updateValue(specItem.path, value);

              setFocused('');
              setValue('');
            }}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => {
              setFocused(`value:${specItem.path}`);
              setValue(specItem.value as string);
            }}
            onKeyDown={(e) => e.key === 'Enter' && updateValue(specItem.path, value)}
            value={focused === `value:${specItem.path}` ? value : specItem.value.toString()}
          />
        )}
        {specItem.items && <ul className="col-span-2">{render(specItem.items, indent + 1)}</ul>}
      </li>
    ));
  };

  return <ul className="bg-gray-900 min-h-full px-2 w-full">{render(specItems)}</ul>;
};
