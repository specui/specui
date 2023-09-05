export interface INpmPackageSpec {
  name?: string;
  version?: string;
  main?: string;
  dependencies?: {
    [name: string]: string;
  };
  devDependencies?: {
    [name: string]: string;
  };
  husky?: {
    hooks?: {
      'pre-commit'?: string;
      'pre-push'?: string;
    }
  };
  links?: string[];
  scripts?: {
    [name: string]: string;
  };
}