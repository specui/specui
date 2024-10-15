export function getNested<T>(obj: any, path: string | (number | string)[], defaultValue?: T): T | undefined {
  // Convert the path to an array if it is not already
  const pathArray = Array.isArray(path) ? path : path.split('.').filter((key) => key.length);

  let current = obj;

  // Traverse the path
  for (const key of pathArray) {
    if (current === null || current === undefined) {
      return defaultValue;
    }
    current = current[key];
  }

  return current === undefined ? defaultValue : current;
}
