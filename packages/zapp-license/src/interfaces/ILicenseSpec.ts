export interface ILicenseSpec {
  author?: {
    name?: string;
    email?: string;
    url?: string;
  };
  license: 'Apache-2.0' | 'GPL-2.0-only' | 'GPL-3.0-only' | 'ISC' | 'MIT';
}
