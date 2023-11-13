import { IProcessor } from '@zappjs/core';
import * as rustPlugin from 'prettier-plugin-rust';
import { format } from 'prettier/standalone';

export const PrettierRustProcessor: IProcessor<any> = (options) => {
  return async (input: string) => {
    const output = format(input, {
      parser: 'jinx-rust',
      plugins: [rustPlugin],
      printWidth: 100,
      singleQuote: true,
      tabWidth: 2,
      useTabs: false,
      ...options,
    });
    return output;
  };
};
