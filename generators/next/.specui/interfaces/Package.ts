type PackageManagerName = 'bun' | 'npm' | 'pnpm' | 'yarn';

export interface Package {
  manager?: {
    name?: PackageManagerName;
    version?: string;
  };
}
