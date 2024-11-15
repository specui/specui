import { existsSync, readFileSync } from 'fs';
import { extname, join } from 'path';
import { parse } from 'yaml';

import { registerTsNode } from './registerTsNode';

export interface LoadedSpec {
  file: string;
  spec: any;
}

export const loadSpec = async (dir = process.cwd()): Promise<LoadedSpec | undefined> => {
  const files = ['spec.yaml', 'spec.yml', 'spec.json', 'spec.js', 'spec.ts'];
  const possibleFiles = files.concat(files.map((file) => `.specui/${file}`));

  for (const file of possibleFiles) {
    const filePath = join(dir, file);

    if (existsSync(filePath)) {
      const extension = extname(filePath);
      switch (extension) {
        case '.yaml':
        case '.yml':
          return {
            file: filePath,
            spec: await parse(readFileSync(filePath, 'utf8')),
          };

        case '.json':
          return {
            file: filePath,
            spec: JSON.parse(readFileSync(filePath, 'utf8')),
          };

        case '.js':
          return {
            file: filePath,
            spec: require(filePath).default,
          };

        case '.ts':
          registerTsNode();

          return {
            file: filePath,
            spec: require(filePath).default,
          };

        default:
          throw new Error(`Unsupported SpecUI format: ${extension}`);
      }
    }
  }
};
