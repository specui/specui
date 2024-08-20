interface PackageManagerNpm {
  npm: string;
  pnpm?: never;
  yarn?: never;
}

interface PackageManagerPnpm {
  npm?: never;
  pnpm: string;
  yarn?: never;
}

interface PackageManagerYarn {
  npm?: never;
  pnpm?: never;
  yarn: string;
}

type PackageManager = PackageManagerNpm | PackageManagerPnpm | PackageManagerYarn;

export interface Package {
  manager?: PackageManager;
}
