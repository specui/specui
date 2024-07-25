export interface IPrettierConfigSpec {
  parser?: string;
  printWidth?: number;
  singleQuote?: boolean;
  tabWidth?: number;
  trailingComma?: 'all' | 'es5' | 'none';
  useTabs?: boolean;
}