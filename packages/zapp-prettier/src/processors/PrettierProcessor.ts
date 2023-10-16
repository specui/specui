import { IProcessor } from '@zappjs/core';
import { format, resolveConfig } from 'prettier';

export const PrettierProcessor: IProcessor = async (input: string) => {
  const options = await resolveConfig('./.prettierrc.json');
  const output = format(input, options ? { parser: 'babel-ts', ...options } : undefined);
  return output;
};
