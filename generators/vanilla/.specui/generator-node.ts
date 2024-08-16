import { PrettierProcessor } from '@specui/prettier';
import { Spec } from './interfaces/Spec';
import generator from './generator';

export default async function generatorNode(spec: Spec) {
  return generator(spec, PrettierProcessor);
}
