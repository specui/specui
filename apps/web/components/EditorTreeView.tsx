import {
  ChevronRight as ChevronRightIcon,
  Code,
  ExpandMore as ExpandMoreIcon,
  FileCopy,
  Info,
  KeySharp,
} from '@mui/icons-material';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import { FC, SyntheticEvent } from 'react';

import { TsIcon } from '@/icons/TsIcon';
import { JsIcon } from '@/icons/JsIcon';
import { HtmlIcon } from '@/icons/HtmlIcon';
import { GitIcon } from '@/icons/GitIcon';
import { CssIcon } from '@/icons/CssIcon';
import { SvgIcon } from '@/icons/SvgIcon';
import { RenderTree, useEditorStore } from '@/stores/editor';

export const EditorTreeView: FC = () => {
  const data = useEditorStore((state) => state.data);

  const expanded = useEditorStore((state) => state.expanded);
  const setExpanded = useEditorStore((state) => state.setExpanded);

  const selected = useEditorStore((state) => state.selected);
  const setSelected = useEditorStore((state) => state.setSelected);

  const handleToggle = (_: SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (_: SyntheticEvent, nodeId: string) => {
    setSelected(nodeId);
  };

  const renderTree = (nodes: RenderTree[]) => {
    return (
      <>
        {nodes.map((node) => (
          <TreeItem
            key={node.id}
            endIcon={
              node.name.startsWith('LICENSE') ? (
                <KeySharp />
              ) : node.name.endsWith('.css') ? (
                <CssIcon />
              ) : node.name.endsWith('.gitignore') ? (
                <GitIcon />
              ) : node.name.endsWith('.htm') || node.name.endsWith('.html') ? (
                <HtmlIcon />
              ) : node.name.endsWith('.js') || node.name.endsWith('.jsx') ? (
                <JsIcon />
              ) : node.name.endsWith('.json') ? (
                <Code />
              ) : node.name.endsWith('.md') ? (
                <Info />
              ) : node.name.endsWith('.svg') ? (
                <SvgIcon />
              ) : node.name.endsWith('.ts') || node.name.endsWith('.tsx') ? (
                <TsIcon />
              ) : (
                <FileCopy />
              )
            }
            nodeId={node.id}
            label={
              <div
                style={{
                  fontFamily: 'var(--font-geist-sans)',
                  fontSize: '1rem',
                  fontWeight: '200',
                }}
              >
                {node.name}
              </div>
            }
          >
            {Array.isArray(node.children) ? renderTree(node.children) : null}
          </TreeItem>
        ))}
      </>
    );
  };

  return (
    <TreeView
      aria-label="controlled"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      {renderTree(data)}
    </TreeView>
  );
};
