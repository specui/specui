export function deleteKey(obj: any, path: (number | string)[]): void {
  if (path.length === 0) {
    throw new Error('Path cannot be empty');
  }

  let current = obj;

  // Traverse to the parent of the key to be deleted
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];

    // If the key does not exist or is not an object, the operation cannot be completed
    if (!(key in current) || typeof current[key] !== 'object') {
      throw new Error(`Path not found: ${path.slice(0, i + 1).join('.')}`);
    }

    current = current[key];
  }

  const keyToDelete = path[path.length - 1];
  if (keyToDelete in current) {
    delete current[keyToDelete];
  } else {
    throw new Error(`Key not found: ${keyToDelete}`);
  }
}
