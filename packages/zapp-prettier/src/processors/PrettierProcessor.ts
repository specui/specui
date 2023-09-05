import { IProcessor } from '@zappjs/core';
import { format, resolveConfig } from 'prettier';

export const PrettierProcessor: IProcessor = async (input: string) => {
  const options = await resolveConfig('./prettier.json');
  const output = format(input, options || undefined);
  return output;
};
