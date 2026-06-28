import { ChevronDown, ChevronRight, Code2, File, FileText, Info, KeyRound } from 'lucide-react';
import { FC, useMemo } from 'react';

import { TsIcon } from '@/icons/TsIcon';
import { JsIcon } from '@/icons/JsIcon';
import { HtmlIcon } from '@/icons/HtmlIcon';
import { GitIcon } from '@/icons/GitIcon';
import { CssIcon } from '@/icons/CssIcon';
import { SvgIcon } from '@/icons/SvgIcon';
import { RenderTree, useEditorStore } from '@/stores/editor';
import cn from '@/utils/cn';

function sortRenderTree(tree: RenderTree[]): RenderTree[] {
  return tree
    .map((node) => ({
      ...node,
      children: node.children ? sortRenderTree([...node.children]) : undefined,
    }))
    .sort((a, b) => {
      if ((a.children && b.children) || (!a.children && !b.children)) {
        return a.name.localeCompare(b.name);
      }
      if (a.children && !b.children) {
        return -1;
      }
      if (!a.children && b.children) {
        return 1;
      }
      return 0;
    });
}

export const EditorTreeView: FC = () => {
  const data = useEditorStore((state) => state.data);

  const expanded = useEditorStore((state) => state.expanded);
  const setExpanded = useEditorStore((state) => state.setExpanded);

  const selected = useEditorStore((state) => state.selected);
  const setSelected = useEditorStore((state) => state.setSelected);

  const sortedTree = useMemo(() => sortRenderTree(data), [data]);

  const toggleNode = (nodeId: string) => {
    setExpanded(
      expanded.includes(nodeId)
        ? expanded.filter((expandedId) => expandedId !== nodeId)
        : [...expanded, nodeId],
    );
  };

  const iconClassName = 'h-4 w-4 shrink-0';

  const getFileIcon = (name: string) => {
    if (name.startsWith('LICENSE')) {
      return <KeyRound className={iconClassName} />;
    }
    if (name.endsWith('.css')) {
      return <CssIcon />;
    }
    if (name.endsWith('.gitignore')) {
      return <GitIcon />;
    }
    if (name.endsWith('.htm') || name.endsWith('.html')) {
      return <HtmlIcon />;
    }
    if (name.endsWith('.js') || name.endsWith('.jsx')) {
      return <JsIcon />;
    }
    if (name.endsWith('.json')) {
      return <Code2 className={iconClassName} />;
    }
    if (name.endsWith('.md')) {
      return <Info className={iconClassName} />;
    }
    if (name.endsWith('.svg')) {
      return <SvgIcon />;
    }
    if (name.endsWith('.ts') || name.endsWith('.tsx')) {
      return <TsIcon />;
    }
    if (name.endsWith('.txt')) {
      return <FileText className={iconClassName} />;
    }
    return <File className={iconClassName} />;
  };

  const renderTree = (nodes: readonly RenderTree[], depth = 0) => {
    return (
      <>
        {nodes.map((node) => {
          const isExpanded = expanded.includes(node.id);
          const isDirectory = Array.isArray(node.children);

          return (
            <li key={node.id}>
              <div
                className={cn(
                  'flex h-8 min-w-0 items-center gap-1 rounded-sm pr-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-black dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-white',
                  {
                    'bg-gray-100 text-black dark:bg-gray-900 dark:text-white': selected === node.id,
                  },
                )}
                style={{ paddingLeft: `${depth * 0.75}rem` }}
              >
                {isDirectory ? (
                  <button
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${node.name}`}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={() => toggleNode(node.id)}
                    type="button"
                  >
                    {isExpanded ? (
                      <ChevronDown className={iconClassName} />
                    ) : (
                      <ChevronRight className={iconClassName} />
                    )}
                  </button>
                ) : (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                    {getFileIcon(node.name)}
                  </span>
                )}
                <button
                  className="min-w-0 flex-1 truncate text-left"
                  onClick={() => setSelected(node.id)}
                  type="button"
                >
                  {node.name}
                </button>
              </div>
              {isDirectory && isExpanded ? <ul>{renderTree(node.children!, depth + 1)}</ul> : null}
            </li>
          );
        })}
      </>
    );
  };

  return <ul aria-label="Generated files">{renderTree(sortedTree)}</ul>;
};
