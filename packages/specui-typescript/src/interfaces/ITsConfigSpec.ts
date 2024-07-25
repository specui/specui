export interface ITsConfigSpec {
  compilerOptions: {
    jsx?: string;
    outDir?: string;
    lib?: string[];
    module?: string;
    declaration?: boolean;
    forceConsistentCasingInFileNames?: boolean;
    noImplicitAny: boolean;
    noUnusedLocals: boolean;
    target: string;
    typeRoots?: string[];
  };
  include?: string[];
  exclude?: string[];
}
