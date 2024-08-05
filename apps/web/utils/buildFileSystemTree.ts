import { FileSystemTree, DirectoryNode, FileNode } from '@webcontainer/api';

export const buildFileSystemTree = (record: Record<string, string>): FileSystemTree => {
  const files: FileSystemTree = {};

  Object.entries(record).forEach(([path, contents]) => {
    const parts = path.split('/');
    let current: FileSystemTree = files;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        current[part] = { file: { contents } } as FileNode;
      } else {
        current[part] = current[part] || ({ directory: {} } as DirectoryNode);
        current = (current[part] as DirectoryNode).directory;
      }
    });
  });

  return files;
};
