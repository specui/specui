import { PrettierProcessor } from '@specui/prettier';
import { ISpec } from './interfaces/ISpec';
import generator from './generator';

export default async function generatorNode(spec: ISpec) {
  return generator(spec, PrettierProcessor);
}
