function renameRootKeyPreservingOrder(obj: any, oldKey: string, newKey: string): any {
  const newObject: Record<string, any> = {};

  // Copy properties to the new object, renaming the specified key
  for (const k in obj) {
    if (k === oldKey) {
      newObject[newKey] = obj[k];
    } else {
      newObject[k] = obj[k];
    }
  }

  return newObject;
}

export function renameKey(obj: any, path: string[], newKey: string): void {
  if (path.length === 0) {
    throw new Error('Path cannot be empty');
  }

  if (path.length === 1) {
    // If the key is at the root level
    const newObj = renameRootKeyPreservingOrder(obj, path[0], newKey);
    Object.keys(obj).forEach((k) => delete obj[k]);
    Object.assign(obj, newObj);
  } else {
    let current = obj;
    let parent: any = null;

    // Traverse to the parent of the key to be renamed
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (!(key in current) || typeof current[key] !== 'object') {
        throw new Error(`Path not found: ${path.slice(0, i + 1).join('.')}`);
      }
      parent = current;
      current = current[key];
    }

    const oldKey = path[path.length - 1];
    if (oldKey in current) {
      const newObject: Record<string, any> = {};

      // Copy properties, renaming the specified key
      for (const k in current) {
        if (k === oldKey) {
          newObject[newKey] = current[k];
        } else {
          newObject[k] = current[k];
        }
      }

      parent[path[path.length - 2]] = newObject;
    } else {
      throw new Error(`Key not found: ${oldKey}`);
    }
  }
}
