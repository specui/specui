import { Add as AddIcon, Close as DeleteIcon } from '@mui/icons-material';
import clsx from 'clsx';
import { FC, KeyboardEvent, useMemo, useState } from 'react';

import { useSpecStore } from '@/stores/spec';
import { getNested } from '@/utils/getNested';

type SpecItemParent = {
  itemCount: number;
  path: SpecItemPath;
  pathString: string;
  parent?: SpecItemParent;
  type: SpecItemType;
};
type SpecItemPath = (number | string)[];
type SpecItemType = 'array' | 'boolean' | 'object' | 'number' | 'string';

interface SpecItem {
  index: number;
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

  const [newSpecItem, setNewSpecItem] = useState<SpecItem | null>(null);
  const [hovered, setHovered] = useState('');
  const [value, setValue] = useState('');

  const specItems = useMemo<SpecItem[]>(() => {
    const parse = (spec: object, parent?: SpecItemParent): SpecItem[] => {
      return Object.entries(spec).map(([key, spec], index) => {
        const path = (parent?.path || []).concat(key);
        const type = Array.isArray(spec) ? 'array' : (typeof spec as SpecItemType);
        return {
          index,
          path,
          pathString: path.join('/'),
          key,
          type,
          value: ['boolean', 'number', 'string'].includes(typeof spec) ? spec : undefined,
          items:
            typeof spec === 'object'
              ? parse(spec, {
                  itemCount: Object.keys(spec).length,
                  parent,
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
            itemCount: Object.keys(getNested(spec, selected.slice(1).split('/')) as any).length,
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
        if (path.slice(-1)[0] === '') {
          if (value === '') {
            setNewSpecItem(null);
          } else {
            updateValue(path.slice(0, -1).concat(value), '');
            setNewSpecItem(null);

            setTimeout(() => {
              document.getElementById(`value-${path.slice(0, -1).concat(value).join('/')}`)!.focus();
            });
          }
        } else {
          updateKey(path, value);
        }
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
      const updatedSpec = updateValue(specItem.path, undefined);
      setValue(getNested(updatedSpec, specItem.path) || '');
    } else if (e.key === 'Enter') {
      if (type === 'key') {
        if (specItem.key === '') {
          updateValue(specItem.path, '');
        } else {
          updateKey(specItem.path, value);
        }
      } else {
        updateValue(specItem.path, value);
      }
    } else if (
      e.key === 'Tab' &&
      type === 'value' &&
      specItem.parent &&
      specItem.parent.itemCount - 1 === specItem.index
    ) {
      updateValue(specItem.path, value);
      setFocused(`${specItem.parent.pathString}/`);
      setNewSpecItem({
        ...specItem,
        key: '',
        path: specItem.parent.path.concat(''),
        pathString: `${specItem.parent.pathString}/`,
        value: '',
      });
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
            id={`key-${specItem.pathString}`}
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
            id={`value-${specItem.pathString}`}
            onBlur={() => handleBlur('value')}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => handleFocus(specItem, 'value')}
            onKeyDown={(e) => handleKeyDown(e, specItem, 'value')}
            value={focused === `value:${specItem.pathString}` ? value : specItem.value?.toString()}
          />
        )}
        {specItem.items && <ul className="col-span-2">{render(specItem.items, indent + 1)}</ul>}
        {newSpecItem?.parent?.pathString === specItem.pathString && (
          <>
            {specItem.parent?.type === 'array' ? (
              <div
                className="bg-gray-900 col-span-1 font-mono outline-none p-1 text-gray-600"
                style={{ paddingLeft: `${indent + 1}rem`, marginRight: `${-indent + 1}rem` }}
              >
                {specItem.key}
              </div>
            ) : (
              <input
                className={clsx('bg-gray-900 col-span-1 font-bold outline-none p-1 text-gray-300', {
                  'col-span-2': ['array', 'object'].includes(specItem.type),
                })}
                id={`key-${specItem.pathString}/`}
                onBlur={(e) => handleBlur('key')}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => handleFocus(newSpecItem, 'key')}
                onKeyDown={(e) => handleKeyDown(e, newSpecItem, 'key')}
                style={{ paddingLeft: `${indent + 1}rem`, marginRight: `${-indent + 1}rem` }}
                value={focused === `key:${newSpecItem?.pathString}` ? value : ''}
              />
            )}
            {!['array', 'object'].includes(specItem.type) && (
              <input
                className={clsx('bg-gray-900 col-span-1 outline-none p-1', {
                  'text-blue-600': specItem.type === 'boolean',
                  'text-red-600': specItem.type === 'number',
                  'text-green-600': specItem.type === 'string',
                })}
                id={`value-${specItem.pathString}/`}
                onBlur={() => handleBlur('value')}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => handleFocus(specItem, 'value')}
                onKeyDown={(e) => handleKeyDown(e, specItem, 'value')}
                value={focused === `value:${newSpecItem?.pathString}` ? value : ''}
              />
            )}
          </>
        )}
        {hovered === specItem.pathString && (
          <div className="absolute right-0 text-slate-500 top-[2px] hover:text-white">
            <button
              onMouseDown={() => {
                const newPath =
                  specItem.type === 'object'
                    ? specItem.path.concat('')
                    : specItem.parent!.path.concat('');
                updateValue(newPath, '');

                setTimeout(() => {
                  document.getElementById(`key-${newPath.join('/')}`)!.focus();
                });
              }}
              title="Delete (cmd+shift+k)"
            >
              <AddIcon />
            </button>
            <button
              onMouseDown={() => {
                updateValue(specItem.path, undefined);

                setFocused('');
                setValue('');
              }}
              title="Delete (cmd+shift+k)"
            >
              <DeleteIcon />
            </button>
          </div>
        )}
      </li>
    ));
  };

  return <ul className="bg-gray-900 min-h-full pb-96 px-2 w-full">{render(specItems)}</ul>;
};
