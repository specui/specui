export interface IProcessor {
  (output: string): Promise<string>;
}
