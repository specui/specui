interface PackageManagerBun {
  bun: string;
  npm?: never;
  pnpm?: never;
  yarn?: never;
}

interface PackageManagerNpm {
  bun?: never;
  npm: string;
  pnpm?: never;
  yarn?: never;
}

interface PackageManagerPnpm {
  bun?: never;
  npm?: never;
  pnpm: string;
  yarn?: never;
}

interface PackageManagerYarn {
  bun?: never;
  npm?: never;
  pnpm?: never;
  yarn: string;
}

type PackageManager =
  | PackageManagerBun
  | PackageManagerNpm
  | PackageManagerPnpm
  | PackageManagerYarn;

export interface Package {
  manager?: PackageManager;
}
