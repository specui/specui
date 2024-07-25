import { IProcessor } from '@specui/core';
import { format } from 'prettier';

export const PrettierProcessor: IProcessor<any> = (options) => {
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
