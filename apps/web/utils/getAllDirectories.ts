import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

export function getAllDirectories(dirPath: string, arrayOfDirectories: string[] = []): string[] {
  const files = readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = join(dirPath, file);
    if (statSync(filePath).isDirectory()) {
      arrayOfDirectories.push(filePath);
      getAllDirectories(filePath, arrayOfDirectories);
    }
  });

  return arrayOfDirectories;
}
