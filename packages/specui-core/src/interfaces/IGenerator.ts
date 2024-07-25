export interface IGenerator<P = {}> {
  (spec: P): Promise<Buffer | string>;
}
