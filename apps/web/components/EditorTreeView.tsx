import {
    ChevronRight as ChevronRightIcon,
    ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import { FC, SyntheticEvent } from 'react';

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
          <TreeItem key={node.id} nodeId={node.id} label={node.name}>
            {Array.isArray(node.children) ? node.children.map((node) => renderTree(node)) : null}
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
