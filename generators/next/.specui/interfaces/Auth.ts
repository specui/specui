type Integration = 'clerk' | 'next-auth';
type Provider = 'facebook' | 'github' | 'google';

export interface Auth {
  integration?: Integration;
  providers?: Provider[];
}
