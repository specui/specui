type ItemType = 'file' | 'folder';

type NodeItem = {
  name: string;
  type: ItemType;
  children?: NodeItem[];
};

type TreeItem = {
  type: ItemType;
  children?: Record<string, TreeItem>;
};

export const pathListToNodeList = (paths: string[]) => {
  const root: Record<string, TreeItem> = {};

  paths.forEach((path) => {
    let current = root;

    const parts = path.split('/');
    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] =
          index === parts.length - 1 ? { type: 'file' } : { type: 'folder', children: {} };
      }
      if (current[part].children) {
        current = current[part].children as Record<string, TreeItem>;
      }
    });
  });

  function convertToNestedArray(nodeMap: Record<string, TreeItem>): NodeItem[] {
    const folders: NodeItem[] = [];
    const files: NodeItem[] = [];

    Object.entries(nodeMap).forEach(([name, node]) => {
      if (node.type === 'file') {
        files.push({
          name,
          type: 'file',
        });
      } else {
        folders.push({
          name,
          type: 'folder',
          children: convertToNestedArray(node.children as Record<string, TreeItem>),
        });
      }
    });

    folders.sort((a, b) => a.name.localeCompare(b.name));
    files.sort((a, b) => a.name.localeCompare(b.name));

    return [...folders, ...files];
  }

  return convertToNestedArray(root);
};
