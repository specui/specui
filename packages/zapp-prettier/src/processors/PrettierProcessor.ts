import { IProcessor } from '@zappjs/core';
import * as babelPlugin from 'prettier/plugins/babel';
import * as estreePlugin from 'prettier/plugins/estree';
import * as markdownPlugin from 'prettier/plugins/markdown';
import * as typescriptPlugin from 'prettier/plugins/typescript';
import { format } from 'prettier/standalone';

export const PrettierProcessor: IProcessor<any> = (options) => {
  return async (input: string) => {
    const output = format(input, {
      parser: 'babel-ts',
      plugins: [babelPlugin, estreePlugin, markdownPlugin, typescriptPlugin],
      printWidth: 100,
      singleQuote: true,
      tabWidth: 2,
      useTabs: false,
      ...options,
    });
    return output;
  };
};
