import { FC, ReactNode, useMemo, useState } from 'react';

import { useSpecStore } from '@/stores/spec';
import clsx from 'clsx';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';

interface SpecItem {
  name: string;
  path: string;
  items: SpecItem[];
}

export const SpecEditorNav: FC = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const spec = useSpecStore((state) => state.spec);

  const selected = useSpecStore((state) => state.selected);
  const setSelected = useSpecStore((state) => state.setSelected);

  const specItems = useMemo<SpecItem[]>(() => {
    const parse = (spec: object, parent = '/'): SpecItem[] => {
      return Object.entries(spec)
        .filter(([_, s]) => typeof s === 'object')
        .map(([specName, s]) => ({
          path: `${parent}${specName}`,
          name: specName,
          items: parse(s, `${parent}${specName}/`),
        }));
    };

    return parse(spec);
  }, [spec]);

  const render = (items: SpecItem[], indent = 1) => {
    return items.map((specItem) => (
      <li key={specItem.name}>
        <div
          className={clsx('flex', {
            'bg-slate-800': selected === specItem.path,
          })}
          style={{ paddingLeft: `${indent}rem` }}
        >
          {specItem.items.length > 0 ? (
            <button
              onClick={() =>
                setExpanded({ ...expanded, [specItem.name]: !expanded[specItem.name] })
              }
            >
              {expanded[specItem.name] ? <ArrowDropDown /> : <ArrowRight />}
            </button>
          ) : (
            <div style={{ width: 24 }} />
          )}
          <button className="flex-grow text-left" onClick={() => setSelected(specItem.path)}>
            {specItem.name}
          </button>
        </div>
        {expanded[specItem.name] && <ul>{render(specItem.items, indent + 1)}</ul>}
      </li>
    ));
  };

  return (
    <ul className="bg-slate-900 border-r border-r-slate-950 h-full">
      <li>
        <button
          className={clsx('pl-2 text-left w-full', {
            'bg-slate-800': selected === '/',
          })}
          onClick={() => setSelected('/')}
        >
          /
        </button>
        <ul>{render(specItems)}</ul>
      </li>
    </ul>
  );
};
