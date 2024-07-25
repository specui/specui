export interface IEngine<P = {}> {
  (spec: P, template?: string): Promise<string> | string;
}
