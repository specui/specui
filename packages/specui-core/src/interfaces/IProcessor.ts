export interface IProcessor<T = any> {
  (options?: T): (output: string) => Promise<string>;
}
