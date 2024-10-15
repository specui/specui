export function setNested(obj: any, path: (number | string)[], value: any): void {
  if (path.length === 0) {
    throw new Error('Path cannot be empty');
  }

  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];

    // If the key does not exist or is not an object, create an empty object
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }

    current = current[key];
  }

  // Set the value at the final key
  if (value === undefined) {
    if (Array.isArray(current)) {
      current.splice(Number(path[path.length - 1]), 1);
    } else {
      delete current[path[path.length - 1]];
    }
  } else {
    current[path[path.length - 1]] = value;
  }
}
