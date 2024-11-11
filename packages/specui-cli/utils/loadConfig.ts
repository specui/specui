import { existsSync, readFileSync } from 'fs';
import { extname, join } from 'path';
import { parse } from 'yaml';

interface Config {
  generator?:
    | '@specui/drizzle-generator'
    | '@specui/next-generator'
    | '@specui/remotion-generator'
    | '@specui/vanilla-generator';
  output?: ConfigOutput;
  ignore?: string[];
}

interface ConfigOutput {
  path?: string;
}

export interface LoadedConfig {
  file: string;
  config: Config;
}

export const loadConfig = async (dir = process.cwd()): Promise<LoadedConfig | undefined> => {
  const files = ['config.yaml', 'config.yml', 'config.json', 'config.js', 'config.ts'];
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
            config: await parse(readFileSync(filePath, 'utf8')),
          };

        case '.json':
          return {
            file: filePath,
            config: JSON.parse(readFileSync(filePath, 'utf8')),
          };

        case '.js':
        case '.ts':
          return {
            file: filePath,
            config: require(filePath).default,
          };

        default:
          throw new Error(`Unsupported SpecUI config format: ${extension}`);
      }
    }
  }
};
