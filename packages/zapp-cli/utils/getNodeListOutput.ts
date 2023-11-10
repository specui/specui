type NodeItem = {
  name: string;
  type: 'file' | 'folder';
  children?: NodeItem[];
};

export const getNodeListOutput = (nodes: NodeItem[]) => {
  const generateOutput = (nodes: NodeItem[], level = 0) => {
    let outputArray: string[] = [];

    nodes.forEach((node) => {
      if (node.type === 'file') {
        outputArray.push(`${' '.repeat(level * 2)}${node.name}`);
      } else {
        outputArray.push(`${' '.repeat(level * 2)}${node.name}/`);
        outputArray = outputArray.concat(generateOutput(node.children as NodeItem[], level + 1));
      }
    });

    return outputArray;
  };

  const output = generateOutput(nodes);

  return output.join('\n');
};
