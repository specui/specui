import { IProcessor } from '@zappjs/core';
import { format } from 'prettier';
import * as rustPlugin from 'prettier-plugin-rust';

export const PrettierRustProcessor: IProcessor<any> = (options) => {
  return async (input: string) => {
    const output = format(input, {
      parser: 'jinx-rust',
      printWidth: 100,
      singleQuote: true,
      tabWidth: 2,
      useTabs: false,
      plugins: [rustPlugin],
      ...options,
    });
    return output;
  };
};
