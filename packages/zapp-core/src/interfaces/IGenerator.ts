export interface IGenerator<P = {}> {
  (spec: P): Promise<string>;
}
