import { Close as DeleteIcon } from '@mui/icons-material';
import clsx from 'clsx';
import { FC, KeyboardEvent, useMemo, useState } from 'react';

import { useSpecStore } from '@/stores/spec';
import { getNested } from '@/utils/getNested';

type SpecItemParent = {
  path: SpecItemPath;
  pathString: string;
  type: SpecItemType;
};
type SpecItemPath = (number | string)[];
type SpecItemType = 'array' | 'boolean' | 'object' | 'number' | 'string';

interface SpecItem {
  items?: SpecItem[];
  key: string;
  parent?: SpecItemParent;
  path: SpecItemPath;
  pathString: string;
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

  const [hovered, setHovered] = useState('');
  const [value, setValue] = useState('');

  const specItems = useMemo<SpecItem[]>(() => {
    const parse = (spec: object, parent?: SpecItemParent): SpecItem[] => {
      return Object.entries(spec).map(([key, spec]) => {
        const path = (parent?.path || []).concat(key);
        const type = Array.isArray(spec) ? 'array' : (typeof spec as SpecItemType);
        return {
          path,
          pathString: path.join('/'),
          key,
          type,
          value: ['boolean', 'number', 'string'].includes(typeof spec) ? spec : undefined,
          items:
            typeof spec === 'object'
              ? parse(spec, {
                  path,
                  pathString: path.join('/'),
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
            pathString: selected,
            type: 'object',
          }
        : undefined,
    );
  }, [selected, spec]);

  const handleBlur = (type: 'key' | 'value') => {
    const path = focused.split(':')[1]?.split('/');

    if (path?.length > 0) {
      if (type === 'key') {
        updateKey(path, value);
      } else {
        updateValue(path, value);
      }
    }

    setFocused('');
    setValue('');
  };

  const handleFocus = (specItem: SpecItem, type: 'key' | 'value') => {
    setFocused(`${type}:${specItem.pathString}`);
    setValue(specItem[type]?.toString() || '');
  };

  const handleKeyDown = (e: KeyboardEvent, specItem: SpecItem, type: 'key' | 'value') => {
    if (e.key === 'k' && e.metaKey && e.shiftKey) {
      updateValue(specItem.path, undefined);

      setFocused('');
      setValue('');
    } else if (e.key === 'Enter') {
      if (type === 'key') {
        updateKey(specItem.path, value);
      } else {
        updateValue(specItem.path, value);
      }
    }
  };

  const render = (items: SpecItem[], indent = 0) => {
    return items.map((specItem) => (
      <li
        className="grid grid-cols-2 relative"
        key={specItem.key}
        onFocus={(e) => {
          e.stopPropagation();
          setHovered(specItem.pathString);
        }}
        onBlur={(e) => {
          e.stopPropagation();
          setHovered('');
        }}
      >
        {specItem.parent?.type === 'array' ? (
          <div
            className="bg-gray-900 col-span-1 font-mono outline-none p-1 text-gray-600"
            style={{ paddingLeft: `${indent}rem`, marginRight: `${-indent}rem` }}
          >
            {specItem.key}
          </div>
        ) : (
          <input
            className={clsx('bg-gray-900 col-span-1 font-bold outline-none p-1 text-gray-300', {
              'col-span-2': ['array', 'object'].includes(specItem.type),
            })}
            onBlur={() => handleBlur('key')}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => handleFocus(specItem, 'key')}
            onKeyDown={(e) => handleKeyDown(e, specItem, 'key')}
            style={{ paddingLeft: `${indent}rem`, marginRight: `${-indent}rem` }}
            value={focused === `key:${specItem.pathString}` ? value : specItem.key}
          />
        )}
        {!['array', 'object'].includes(specItem.type) && (
          <input
            className={clsx('bg-gray-900 col-span-1 outline-none p-1', {
              'text-blue-600': specItem.type === 'boolean',
              'text-red-600': specItem.type === 'number',
              'text-green-600': specItem.type === 'string',
            })}
            onBlur={() => handleBlur('value')}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => handleFocus(specItem, 'value')}
            onKeyDown={(e) => handleKeyDown(e, specItem, 'value')}
            value={focused === `value:${specItem.pathString}` ? value : specItem.value.toString()}
          />
        )}
        {hovered === specItem.pathString && (
          <button
            className="absolute right-0 text-slate-500 top-[2px] hover:text-white"
            onMouseDown={() => {
              updateValue(specItem.path, undefined);

              setFocused('');
              setValue('');
            }}
            title="Delete (cmd+shift+k)"
          >
            <DeleteIcon />
          </button>
        )}
        {specItem.items && <ul className="col-span-2">{render(specItem.items, indent + 1)}</ul>}
      </li>
    ));
  };

  return <ul className="bg-gray-900 min-h-full px-2 w-full">{render(specItems)}</ul>;
};
