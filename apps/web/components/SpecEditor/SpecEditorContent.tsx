import { FC, ReactNode, useMemo, useState } from 'react';

import { useSpecStore } from '@/stores/spec';
import clsx from 'clsx';
import { getNested } from '@/utils/getNested';

interface SpecItem {
  key: string;
  value: string | undefined;
  path: string;
  items: SpecItem[];
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
    const parse = (spec: object, parent = '/'): SpecItem[] => {
      return Object.entries(spec).map(([specKey, s]) => ({
        path: `${parent}${specKey}`,
        key: specKey,
        value: typeof s === 'string' ? s : undefined,
        items: typeof s === 'object' ? parse(s, `${parent}${specKey}/`) : [],
      }));
    };

    return parse(selected === '/' ? spec : (getNested(spec, selected.slice(1).split('/')) as any));
  }, [selected, spec]);

  const render = (items: SpecItem[], indent = 0) => {
    return items.map((specItem) => (
      <li className="grid grid-cols-2" key={specItem.key}>
        <input
          className="bg-gray-900 col-span-1 outline-none"
          onBlur={() => {
            updateKey(`${selected !== '/' ? selected : ''}${specItem.path}`, value);

            setFocused('');
            setValue('');
          }}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => {
            setFocused(`key:${specItem.path}`);
            setValue(specItem.key);
          }}
          onKeyDown={(e) =>
            e.key === 'Enter' &&
            updateKey(`${selected !== '/' ? selected : ''}${specItem.path}`, value)
          }
          style={{ paddingLeft: `${indent}rem`, marginRight: `${-indent}rem` }}
          value={focused === `key:${specItem.path}` ? value : specItem.key}
        />
        {specItem.value === undefined ? (
          <div className="bg-gray-900 col-span-1" />
        ) : (
          <input
            className="bg-gray-900 col-span-1 outline-none"
            onBlur={() => {
              updateValue(`${selected !== '/' ? selected : ''}${specItem.path}`, value);

              setFocused('');
              setValue('');
            }}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => {
              setFocused(`value:${specItem.path}`);
              setValue(specItem.value as string);
            }}
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              updateValue(`${selected !== '/' ? selected : ''}${specItem.path}`, value)
            }
            value={focused === `value:${specItem.path}` ? value : specItem.value}
          />
        )}
        <div className="col-span-2">{render(specItem.items, indent + 1)}</div>
      </li>
    ));
  };

  return <ul className="bg-gray-900 list-none min-h-full p-2 w-full">{render(specItems)}</ul>;
};
