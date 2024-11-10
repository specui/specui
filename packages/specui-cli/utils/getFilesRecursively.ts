import { readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';

export function getFilesRecursively(dir: string, baseDir: string): string[] {
  let files: string[] = [];

  const items = readdirSync(dir);
  for (const item of items) {
    const itemPath = join(dir, item);
    if (statSync(itemPath).isDirectory()) {
      files = files.concat(getFilesRecursively(itemPath, baseDir));
    } else if (extname(itemPath) === '.ts') {
      files.push(relative(baseDir, itemPath));
    }
  }

  return files;
}
