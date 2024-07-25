import { IEngine } from '../interfaces/IEngine';
import { IProcessor } from '../interfaces/IProcessor';

interface Generate {
  (config: GenerateConfig): Promise<Buffer | string>;
}

interface GenerateConfig {
  engine?: IEngine;
  processor?: (output: string) => Promise<string>;
  schema?: object;
  spec?: object;
  template?: string;
}

export const generate: Generate = async ({ engine, processor, spec = {}, template = '' }) => {
  const output = engine ? await engine(spec, template) : template;
  if (processor) {
    return await processor(output);
  }
  return output;
};
