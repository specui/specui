import { IProcessor } from '@zappjs/core';
import { Options, format } from 'prettier';

export const PrettierProcessor: IProcessor<Options> = (options) => {
  return async (input: string) => {
    const output = format(input, {
      parser: 'babel-ts',
      printWidth: 100,
      singleQuote: true,
      tabWidth: 2,
      useTabs: false,
      ...options,
    });
    return output;
  };
};
